#!/usr/bin/env python3
"""Explicitly one generation, frozen first-pilot inputs, no cleanup or fallback."""
import json
import shutil
import subprocess
import uuid
import local_model_bench as b

PREVIOUS=b.ROOT/'reports/evidence/local-model-2c45b7b6fccf4ea7b5e0ebbd4565ffcc'
IMAGE='sha256:daf72e2fc9e22c4a259b5183af1a0515256d0a3a1b564dd0e9bbe07aff3e4a40'

class RetainedRun(b.ModelRun):
    def remove(self,name):
        result=b.lab.docker('stop','--time','5',name,check=False,timeout=20)
        state=json.loads(b.lab.docker('inspect',name).stdout)[0]['State']
        self.report.setdefault('retained_containers',[]).append({'name':name,'stop_exit':result.returncode,'running':state['Running']})
        if state['Running']:raise RuntimeError('container_failed_to_stop')
        if name in self.names:self.names.remove(name)
    def finish(self):
        for name in list(self.names):self.remove(name)
        self.report['retained_volumes']=self.volumes
        self.report['retention']='Stopped containers and volumes retained by user instruction; no removal'
        (self.run/'report.json').write_text(json.dumps(self.report,indent=2)+'\n')

def main():
    previous=json.loads((PREVIOUS/'report.json').read_text())
    original={str(p.relative_to(PREVIOUS)):b.sha(p) for p in PREVIOUS.rglob('*') if p.is_file()}
    a=b.adapter
    assert a.MODEL==previous['model'] and a.RUNTIME==previous['runtime_source'] and a.PARAMETERS==previous['parameters']
    assert b.sha(b.ROOT/'controls/local_inference.py')==previous['adapter_sha256']
    assert b.sha(b.ROOT/'controls/inference/policy.json')==previous['policy_sha256']
    for name,digest in previous['source_sha256'].items():
        if name!='controls/local_model_bench.py' and not name.startswith('tests/'):assert b.sha(b.ROOT/name)==digest, name
    assert b.sha(b.ROOT/'controls/llama_stdout_frame.py')==b.sha(PREVIOUS/'postmortem-code/llama_stdout_frame.py')
    weights=b.ROOT/'.runs/model-cache'/a.MODEL['file']
    assert weights.stat().st_size==a.MODEL['bytes'] and b.sha(weights)==a.MODEL['sha256']
    b.lab.DOCKER_SOCKET='/Users/jsanchez/.docker/run/docker.sock'
    b.lab.CLIENT_CONFIG.mkdir(parents=True,exist_ok=True)
    (b.lab.CLIENT_CONFIG/'config.json').write_text('{}\n')
    root=b.ROOT/'.runs'/('local-model-'+uuid.uuid4().hex);root.mkdir(mode=0o700)
    meta={'previous_pilot':str(PREVIOUS.relative_to(b.ROOT)),'model':a.MODEL,'runtime_source':a.RUNTIME,'parameters':a.PARAMETERS,
          'seed':42,'generation_budget':1,'security_observation':'inconclusive','retained_preparation':[],
          'deterministic_comparison':str(b.COMPARISON.relative_to(b.ROOT)),'comparison_report_sha256':b.sha(b.COMPARISON/'report.json')}
    run=None
    try:
        meta['docker_version']=b.lab.docker('version','--format','{{.Server.Version}}').stdout.decode().strip()
        meta['images']={im:json.loads(b.lab.docker('image','inspect',im).stdout)[0]['Id'] for im in [IMAGE,b.EXECUTOR,b.OBSERVER]}
        volume='statexlab-'+uuid.uuid4().hex
        b.lab.docker('volume','create','--label','statex.lab.run='+root.name,volume)
        meta['weights_volume']=volume
        helper='statexlab-'+uuid.uuid4().hex;meta['retained_preparation'].append(helper)
        b.lab.docker('create','--name',helper,'--network=none','--cap-drop=ALL','--security-opt=no-new-privileges','--memory=512m','--log-driver=none',
                     '--mount','type=volume,src='+volume+',dst=/weights',b.OBSERVER,'node','-e','setInterval(()=>{},1000)')
        b.lab.docker('start',helper)
        command=['docker','--host','unix://'+b.lab.DOCKER_SOCKET,'--config',str(b.lab.CLIENT_CONFIG),'exec','-i',helper,'node','-e',
                 "const f=require('fs'),w=f.createWriteStream('/weights/model.gguf',{mode:0o444});process.stdin.pipe(w);w.on('finish',()=>process.stdout.write('ok'));w.on('error',()=>process.exit(1))"]
        with weights.open('rb') as source:copied=subprocess.run(command,stdin=source,capture_output=True,timeout=240)
        if copied.returncode or copied.stdout!=b'ok':raise RuntimeError('weights_stream_failed')
        digest=b.lab.docker('exec',helper,'node','-e',"const c=require('crypto'),f=require('fs'),h=c.createHash('sha256');f.createReadStream('/weights/model.gguf').on('data',b=>h.update(b)).on('end',()=>process.stdout.write(h.digest('hex')))",timeout=120).stdout.decode()
        assert digest==a.MODEL['sha256'];meta['guest_weights_sha256']=digest
        b.lab.docker('stop',helper)
        run=RetainedRun(root,'pilot',42)
        work,baseline,context=b.setup_trial(run)
        assert context==json.loads((PREVIOUS/'pilot/authorized-context.json').read_text())
        assert a.prompt(context).encode()==(PREVIOUS/'pilot/prompt.txt').read_bytes()
        assert (b.ROOT/'controls/inference/json.gbnf').read_bytes()==(PREVIOUS/'pilot/json.gbnf').read_bytes()
        meta['frozen_inputs_verified']=True
        # Exactly one call site, no loop, no retry, no synthesized proposal.
        raw=run.inference(IMAGE,volume,context)
        content,frame=b.framing.generated_content(raw)
        (run.run/'response.generated.txt').write_bytes(content);run.report['stdout_framing']=frame
        try:plan=a.parse_proposal(content)
        except a.InvalidProposal as e:
            run.report['tests']['model_json_valid']=False;run.report['proposal_rejection']=str(e)
        else:
            run.report['tests']['model_json_valid']=True
            (run.run/'proposal.validated.json').write_text(json.dumps(plan,indent=2)+'\n')
            run.execute_plan(plan,work,baseline)
        final=run.snapshot(work)
        run.report['final_hashes']={k:v['sha256'] for k,v in final.items()}
        run.report['workspace_unchanged']=run.report['final_hashes']==run.report['baseline_hashes']
    except Exception as e:
        meta['error']=str(e) or type(e).__name__
    finally:
        if run:run.finish()
        for helper in meta['retained_preparation']:b.lab.docker('stop',helper,check=False)
        meta['previous_pilot_unchanged']=original=={str(p.relative_to(PREVIOUS)):b.sha(p) for p in PREVIOUS.rglob('*') if p.is_file()}
        assert meta['previous_pilot_unchanged']
        (root/'report.json').write_text(json.dumps(meta,indent=2)+'\n')
        for p in (b.ROOT/'controls').rglob('*'):
            if p.is_file() and '__pycache__' not in p.parts:
                dst=root/'source'/p.relative_to(b.ROOT);dst.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(p,dst)
        sums={str(p.relative_to(root)):b.sha(p) for p in root.rglob('*') if p.is_file()}
        (root/'SHA256SUMS.json').write_text(json.dumps(sums,indent=2)+'\n')
        dest=b.ROOT/'reports/evidence'/root.name;shutil.copytree(root,dest)
        print(dest,flush=True)
    return 0

if __name__=='__main__':raise SystemExit(main())
