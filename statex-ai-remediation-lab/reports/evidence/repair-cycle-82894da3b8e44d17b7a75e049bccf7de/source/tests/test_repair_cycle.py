"""SIMULATED responses, never evidence of model repair or security coverage."""
import copy
import importlib.util
import json
from pathlib import Path
import unittest

spec = importlib.util.spec_from_file_location('repair_cycle', Path(__file__).resolve().parents[1] / 'controls/repair_cycle.py')
c = importlib.util.module_from_spec(spec)
spec.loader.exec_module(c)


class SimulatedBackend:
    def __init__(self, responses, outcomes=(), review=True):
        self.responses = iter(responses)
        self.outcomes = iter(outcomes)
        self.review_ok = review
        self.applied = []
        self.inputs = []
        self.finished = []
        self.resets = []
        self.exports = 0

    def reset(self, number):
        self.resets.append(number)
        self.state = {'name': 'fictional', 'scripts': {'build': 'node --check app.cjs'},
                      'dependencies': {'cross-spawn': '7.0.3'}}
        return {'documents': {'package.json': {'document': copy.deepcopy(self.state), 'sha256': 'a' * 64}}}

    def generate(self, context):
        self.inputs.append(copy.deepcopy(context))
        kind = next(self.responses)
        document = copy.deepcopy(context['documents']['package.json']['document'])
        document['dependencies']['cross-spawn'] = '7.0.5'
        obj = {'path': 'package.json', 'expected_sha256': 'a' * 64, 'document': document}
        if kind == 'invalid':
            obj['document']['scripts']['build'] = 'malicious raw error SECRET'
        return json.dumps(obj).encode()

    def apply(self, change):
        self.applied.append(change)
        self.state = change['document']
        return True

    def test(self):
        return next(self.outcomes)

    def review(self):
        return {'immutable_tests_and_policy': self.review_ok, 'exact_graph': True}

    def export(self):
        self.exports += 1
        return {'simulation': True}

    def finish(self, entry):
        self.finished.append(copy.deepcopy(entry))


def scenarios():
    cases = {
        'invalid_proposal_then_success': SimulatedBackend(['invalid', 'valid'], [True]),
        'functional_failure_then_success': SimulatedBackend(['valid', 'valid'], [False, True]),
        'attempt_exhaustion': SimulatedBackend(['invalid'] * 3),
        'success': SimulatedBackend(['valid'], [True]),
    }
    return {name: c.cycle(backend, 'SIMULATED_RESPONSE_NOT_MODEL') for name, backend in cases.items()}


class RepairCycleTests(unittest.TestCase):
    def test_invalid_rejected_before_any_apply(self):
        b = SimulatedBackend(['invalid'] * 3)
        r = c.cycle(b, 'SIMULATED')
        self.assertEqual(b.applied, [])
        self.assertEqual(b.resets, [1, 2, 3])
        self.assertEqual(len(b.finished), 3)
        self.assertEqual(r['result'], 'bloqueado')
        self.assertEqual(b.exports, 0)

    def test_functional_failure_returns_filtered_diagnostic_and_clean_baseline(self):
        b = SimulatedBackend(['valid', 'valid'], [False, True])
        r = c.cycle(b, 'SIMULATED')
        self.assertEqual(b.inputs[1]['diagnostic'], c.diagnostic('functional_failed', 1))
        self.assertEqual(b.inputs[1]['documents'], b.inputs[0]['documents'])
        self.assertEqual(b.exports, 1)
        self.assertTrue(r['functional_remediation'])
        self.assertEqual(r['result'], 'inconcluso')
        self.assertFalse(r['automatic_promotion'])

    def test_exhaustion_even_when_proposals_valid(self):
        b = SimulatedBackend(['valid'] * 4, [False] * 4)
        r = c.cycle(b, 'SIMULATED')
        self.assertEqual(len(r['attempts']), 3)
        self.assertEqual(b.exports, 0)
        self.assertFalse(r['functional_remediation'])

    def test_success_stops_and_has_all_stages(self):
        b = SimulatedBackend(['valid'], [True])
        r = c.cycle(b, 'SIMULATED')
        self.assertEqual(len(r['attempts']), 1)
        self.assertEqual(r['attempts'][0]['stages'], list(c.STAGES))
        self.assertEqual(r['security_observation'], 'inconclusive')

    def test_review_failure_blocks_export(self):
        b = SimulatedBackend(['valid'] * 3, [True] * 3, review=False)
        r = c.cycle(b, 'SIMULATED')
        self.assertEqual(b.exports, 0)
        self.assertFalse(r['functional_remediation'])
        self.assertTrue(all(a['diagnostic']['code'] == 'review_failed' for a in r['attempts']))

    def test_contract_mutations(self):
        b = SimulatedBackend(['valid'])
        ctx = b.reset(1)
        valid = json.loads(b.generate(ctx))
        variants = [dict(valid, path='../package.json'), dict(valid, expected_sha256='b' * 64),
                    dict(valid, operations=[]), dict(valid, document={})]
        for obj in variants:
            with self.assertRaises(c.Rejected):
                c.proposal(json.dumps(obj).encode(), ctx)
        for raw in (b'{"path":1,"path":2}', b'[]', b'x' * 16385, b'null', b'not json'):
            with self.assertRaises(c.Rejected):
                c.proposal(raw, ctx)

    def test_json_type_changes_are_rejected(self):
        b = SimulatedBackend(['valid'])
        ctx = b.reset(1)
        ctx['documents']['package.json']['document']['private'] = True
        obj = json.loads(b.generate(ctx))
        obj['document']['private'] = 1
        with self.assertRaises(c.Rejected):
            c.proposal(json.dumps(obj).encode(), ctx)

    def test_runtime_error_aborts_without_raw_feedback(self):
        b = SimulatedBackend(['valid'])
        def fail(context):
            raise RuntimeError('SECRET /host/raw-trace')
        b.generate = fail
        r = c.cycle(b, 'SIMULATED')
        self.assertEqual(len(r['attempts']), 1)
        self.assertNotIn('SECRET', json.dumps(r))
        self.assertEqual(b.exports, 0)


if __name__ == '__main__':
    unittest.main()
