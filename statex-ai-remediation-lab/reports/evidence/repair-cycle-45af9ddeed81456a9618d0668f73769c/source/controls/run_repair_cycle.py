#!/usr/bin/env python3
"""One real cycle only, using retained images and weights; never downloads or builds."""
import copy
import importlib.util
import json
import shutil
import uuid
from types import SimpleNamespace
import repair_cycle as c
import local_model_bench as b
from single_local_pilot import RetainedRun, IMAGE

PREVIOUS = b.ROOT / 'reports/evidence/local-model-9f2372e1b77448169ac43baca9b75744'


def hashes(root):
    return {str(p.relative_to(root)): b.sha(p) for p in sorted(root.rglob('*'))
            if p.is_file() and '__pycache__' not in p.parts}


class Backend:
    def __init__(self, root, weights):
        self.root = root
        self.weights = weights
        self.run = None
        self.trusted = hashes(b.ROOT / 'controls')
        self.tests = hashes(b.ROOT / 'tests')

    def reset(self, number):
        self.run = RetainedRun(self.root, 'attempt-' + str(number), 41 + number)
        r = self.run
        volume = 'statexlab-' + uuid.uuid4().hex
        r.volumes.append(volume)
        b.lab.docker('volume', 'create', '--label', 'statex.lab.run=' + self.root.name, volume)
        code, _, _ = r.execute(b.EXECUTOR, ['sh', '-c', 'cp /baseline/* /work/ && chown -R 1000:1000 /work'],
                               ['--user=0:0', '--cap-add=CHOWN', '--mount', 'type=volume,src=' + volume + ',dst=/work'])
        if code:
            raise RuntimeError()
        self.volume = volume
        self.baseline = r.snapshot(volume)
        r.report['workspace'] = volume
        r.report['baseline_hashes'] = {k: v['sha256'] for k, v in self.baseline.items()}
        self.metadata = self.file_metadata()
        baseline = r.job({'op': 'validate'}, volume, 'baseline', 'controller_baseline')
        if not b.functional(baseline) or not all(baseline['persistent_source_unchanged'].values()):
            raise RuntimeError()
        return {'documents': {k: {'document': v['document'], 'sha256': v['sha256']}
                              for k, v in self.baseline.items()},
                'task': {'advisory': 'CVE-2024-21538', 'target': 'cross-spawn@7.0.5'}}

    def generate(self, context):
        # The historical runner's inference transport and resource assertions stay unchanged.
        # Only the prompt adapter differs; the model no longer generates operations.
        original = b.adapter
        b.adapter = SimpleNamespace(prompt=c.prompt, PARAMETERS=original.PARAMETERS)
        try:
            raw = self.run.inference(IMAGE, self.weights, context)
        finally:
            b.adapter = original
        try:
            content, frame = b.framing.generated_content(raw)
        except ValueError:
            raise c.Rejected('contract_rejected') from None
        self.run.report['stdout_framing'] = frame
        return content

    def apply(self, change):
        r = self.run
        result = r.action(dict(change, op='write_document'), self.volume, 'manifest', 'local_model_proposal')
        if not result.get('ok'):
            return False
        locked = r.job({'op': 'regenerate_lock'}, self.volume, 'lock', 'controller')
        if (not all(x['exit'] == 0 for x in locked['commands'])
                or not locked['persistent_source_unchanged']['app.cjs']
                or locked['documents']['package.json'] != change['document']):
            return False
        current = r.snapshot(self.volume)
        committed = r.action({'op': 'write_document', 'path': 'package-lock.json',
                              'expected_sha256': current['package-lock.json']['sha256'],
                              'document': locked['documents']['package-lock.json']},
                             self.volume, 'commit-lock', 'controller_npm_output')
        if not committed.get('ok'):
            return False
        installed = r.job({'op': 'install'}, self.volume, 'install', 'controller')
        return (all(x['exit'] == 0 for x in installed['commands'])
                and all(installed['persistent_source_unchanged'].values()))

    def test(self):
        result = self.run.job({'op': 'validate'}, self.volume, 'acceptance', 'controller_independent_acceptance')
        return b.functional(result) and all(result['persistent_source_unchanged'].values())

    def file_metadata(self):
        code, out, _ = self.run.execute(b.EXECUTOR, ['node', '-e',
            "const f=require('fs');let o={};for(const n of f.readdirSync('/work').sort()){let s=f.lstatSync('/work/'+n);o[n]={mode:s.mode,uid:s.uid,gid:s.gid,nlink:s.nlink,file:s.isFile()}}process.stdout.write(JSON.stringify(o))"],
            ['--mount', 'type=volume,src=' + self.volume + ',dst=/work,readonly'])
        if code:
            raise RuntimeError()
        return json.loads(out)

    def review(self):
        final = self.run.snapshot(self.volume)
        expected = copy.deepcopy(self.baseline['package.json']['document'])
        expected['dependencies'] = {'cross-spawn': '7.0.5'}
        code, out, _ = self.run.execute(b.EXECUTOR, ['node', '-e',
            "const f=require('fs');process.stdout.write(JSON.stringify({lock:JSON.parse(f.readFileSync('/reference/package-lock.json')),app:f.readFileSync('/work/app.cjs').equals(f.readFileSync('/baseline/app.cjs'))}))"],
            ['--mount', 'type=volume,src=' + self.volume + ',dst=/work,readonly'])
        reference = json.loads(out) if code == 0 else {}
        return {'only_allowed_manifest_change': final['package.json']['document'] == expected,
                'expected_dependency_and_exact_graph': reference.get('lock') == final['package-lock.json']['document']
                    and b.old.accept.repaired(final['package.json']['document'], final['package-lock.json']['document']),
                'application_unchanged': reference.get('app') is True,
                'only_allowed_files_and_modes': self.file_metadata() == self.metadata,
                'acceptance_tests_unchanged': hashes(b.ROOT / 'tests') == self.tests,
                'policy_permissions_execution_configuration_unchanged': hashes(b.ROOT / 'controls') == self.trusted}

    def export(self):
        self.run.accept_and_export(self.volume, self.baseline)
        self.run.report['functional_remediation'] = True
        return {'path': str((self.run.run / 'patch').relative_to(self.root)),
                'hashes': json.loads((self.run.run / 'patch/hashes.json').read_text()),
                'scope': 'functional_candidate_only; security inconclusive; promotion blocked'}

    def finish(self, entry):
        if self.run:
            self.run.report['cycle_attempt'] = entry
            self.run.finish()
            self.run = None


def main():
    # No outer generation loop, repetitions, downloads, tag resolution or fallback.
    evidence = b.ROOT / 'reports/evidence'
    before = hashes(evidence)
    previous = json.loads((PREVIOUS / 'report.json').read_text())
    comparison = json.loads((b.COMPARISON / 'report.json').read_text())
    if not comparison.get('suite_passed') or comparison.get('model_connected'):
        raise RuntimeError('deterministic_control_invalid')
    b.lab.DOCKER_SOCKET = '/Users/jsanchez/.docker/run/docker.sock'
    weights = previous['weights_volume']
    root = b.ROOT / '.runs' / ('repair-cycle-' + uuid.uuid4().hex)
    root.mkdir(mode=0o700)
    report = {'result': 'bloqueado', 'security_observation': 'inconclusive', 'automatic_promotion': False,
              'attempts': [], 'model_generation_calls': 0, 'functional_remediation': False}
    phase = 'simulations'
    try:
        spec = importlib.util.spec_from_file_location('cycle_simulations', b.ROOT / 'tests/test_repair_cycle.py')
        simulations = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(simulations)
        simulated = simulations.scenarios()
        assert [len(v['attempts']) for v in simulated.values()] == [2, 2, 3, 1]
        assert [v['functional_remediation'] for v in simulated.values()] == [True, True, False, True]
        (root / 'SIMULATED-scenarios.json').write_text(json.dumps(simulated, indent=2) + '\n')
        phase = 'local_images_available'
        for image in (IMAGE, b.EXECUTOR, b.OBSERVER):
            if json.loads(b.lab.docker('image', 'inspect', image).stdout)[0]['Id'] != image:
                raise RuntimeError()
        # Hash the already retained weights via a read-only mount, without starting old containers.
        check = RetainedRun(root, 'preflight', 42)
        try:
            phase = 'retained_weights_integrity'
            code, out, _ = check.execute(b.OBSERVER, ['node', '-e',
                "const f=require('fs'),c=require('crypto'),h=c.createHash('sha256');f.createReadStream('/weights/model.gguf').on('data',b=>h.update(b)).on('end',()=>process.stdout.write(h.digest('hex')))"],
                ['--mount', 'type=volume,src=' + weights + ',dst=/weights,readonly'])
            if code or out.decode() != b.adapter.MODEL['sha256']:
                raise RuntimeError()
        finally:
            check.finish()
        phase = 'single_cycle_claim'
        # Persistent one-cycle guard, intentionally retained even after failure or interruption.
        # A second invocation cannot silently create another model cycle.
        with (b.ROOT / '.runs/phase-two-real-cycle.claim').open('x') as claim:
            claim.write(root.name + '\n')
        phase = 'real_cycle'
        report = c.cycle(Backend(root, weights), 'local_model')
        report['model_generation_calls'] = sum(1 for p in root.glob('attempt-*/report.json')
            if json.loads(p.read_text()).get('inference', {}).get('started'))
    except Exception:
        report['blocker'] = 'preflight_or_controller_failure_no_permission_expansion'
        report['blocked_stage'] = phase
    report.update({'model': b.adapter.MODEL, 'parameters': b.adapter.PARAMETERS,
                   'images': [IMAGE, b.EXECUTOR, b.OBSERVER], 'weights_volume_readonly': weights,
                   'deterministic_control': str(b.COMPARISON.relative_to(b.ROOT)),
                   'deterministic_control_sha256': b.sha(b.COMPARISON / 'report.json'),
                   'previous_evidence_unchanged': before == hashes(evidence),
                   'security_reason': 'native_inference_and_Node_npm_FD_async_coverage_incomplete'})
    (root / 'report.json').write_text(json.dumps(report, indent=2) + '\n')
    for directory in ('controls', 'tests'):
        for p in (b.ROOT / directory).rglob('*'):
            if p.is_file() and '__pycache__' not in p.parts:
                dest = root / 'source' / p.relative_to(b.ROOT)
                dest.parent.mkdir(parents=True, exist_ok=True)
                shutil.copyfile(p, dest)
    (root / 'SHA256SUMS.json').write_text(json.dumps(hashes(root), indent=2) + '\n')
    dest = evidence / root.name
    shutil.copytree(root, dest)
    print(dest)
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
