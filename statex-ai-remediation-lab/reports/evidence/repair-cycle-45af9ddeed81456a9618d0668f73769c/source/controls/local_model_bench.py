#!/usr/bin/env python3
"""One pilot; only if accepted, three clean local-inference repetitions. No fallback."""
import argparse
import base64
import copy
import datetime
import gzip
import hashlib
import importlib.util
import json
from pathlib import Path
import re
import shutil
import subprocess
import time
import uuid
ROOT=Path(__file__).resolve().parents[1]
def load(name):
    spec=importlib.util.spec_from_file_location(name,ROOT/'controls'/(name+'.py'))
    m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m
old=load('remediation_suite');adapter=load('local_inference');framing=load('llama_stdout_frame');lab=old.lab
EXECUTOR='sha256:95db10a7539668d814e207e170279cda32b89576ce6cc1675e183796f29b48c3'
OBSERVER='sha256:6e793a80b20b789b357f60125f535009927337cb8d0e6b4423e4ab3e3196dc75'
COMPARISON=ROOT/'reports/evidence/remediation-70d73e46a7e44e2e8d110498f021b166'
def sha(path):
    h=hashlib.sha256()
    with Path(path).open('rb') as f:
        for block in iter(lambda:f.read(4*1024*1024),b''):h.update(block)
    return h.hexdigest()
def functional(result):
    return result['commands'][0]['exit']==0 and result['build']['exit']==0 and all(x['exit']==0 and old.accept.behavior(x['stdout'],value) for value,x in result['cases'].items())

class ModelRun(old.Run):
    def __init__(self,root,label,seed):
        self.image=EXECUTOR;self.runtime=old.RUNTIME;self.names=[];self.volumes=[];self.counter=0
        self.run=root/label;self.run.mkdir(mode=0o700)
        self.report={'label':label,'seed':seed,'model_connected':False,'resources':[],'cleanup':[],'tests':{},'observations':{},'ledger':[],
                     'proposal_origin':'local_model','functional_remediation':False,'security_observation':'inconclusive','created_utc':datetime.datetime.now(datetime.timezone.utc).isoformat()}
    def finish(self):
        entry=self.report.get('inference',{})
        target=entry.get('target')
        if target in self.names and not (self.run/'response.raw.txt').exists():
            try:
                js="const f=require('fs');let o={};for(const [k,p] of Object.entries({response:'/control/response.txt',stderr:'/control/runtime.stderr'})){try{o[k]=f.readFileSync(p,'base64')}catch(e){o[k]=null}}process.stdout.write(JSON.stringify(o))"
                result=lab.docker('exec',target,'node','-e',js,check=False,timeout=10)
                if result.returncode==0:
                    data=json.loads(result.stdout)
                    if data['response'] is not None:(self.run/'response.raw.txt').write_bytes(base64.b64decode(data['response']))
                    if data['stderr'] is not None:(self.run/'inference.stderr.txt').write_bytes(base64.b64decode(data['stderr']))
                    entry['failure_capture']='controller_read_only_recovery; observation remains inconclusive'
                else:entry['failure_capture']='unavailable; target not accessible'
            except Exception:entry['failure_capture']='unavailable; capture failed'
        super().finish()
    def native_info(self,observer,traces=False):
        js=r"""const f=require('fs'),z=require('zlib');let state=JSON.parse(f.readFileSync('/evidence/status.json')),target=JSON.parse(f.readFileSync('/proc/1/root/control/state.json'));
let tracer=0;try{tracer=+f.readFileSync('/proc/'+target.child_pid+'/status','utf8').match(/TracerPid:\s*(\d+)/)[1]}catch(e){}
let raw='',stderr='';try{raw=f.readFileSync('/proc/1/root/control/response.txt','base64')}catch(e){}try{stderr=f.readFileSync('/proc/1/root/control/runtime.stderr','base64')}catch(e){}
let files={};if(process.argv[1]==='traces')for(const n of f.readdirSync('/evidence'))if(/^trace\.\d+$/.test(n))files[n]=f.readFileSync('/evidence/'+n,'utf8');
process.stdout.write(z.gzipSync(JSON.stringify({state,target,tracer,raw,stderr,traces:files,tracer_stderr:f.readFileSync('/evidence/strace.stderr','utf8')})));"""
        data=json.loads(gzip.decompress(lab.docker('exec',observer,'node','-e',js,'traces' if traces else 'status',timeout=20).stdout))
        data['observer_running']=json.loads(lab.docker('inspect',observer).stdout)[0]['State']['Running'];return data
    def inference(self,image,weights,context,mode='generate'):
        entry={'mode':mode,'observation':'inconclusive_native_threaded_profile','health':[],'started':False}
        self.report['inference']=entry
        prompt=adapter.prompt(context);(self.run/'authorized-context.json').write_text(json.dumps(context,indent=2)+'\n');(self.run/'prompt.txt').write_text(prompt)
        grammar=(ROOT/'controls/inference/json.gbnf').read_text();(self.run/'json.gbnf').write_text(grammar)
        entry['prompt_sha256']=hashlib.sha256(prompt.encode()).hexdigest();entry['grammar_sha256']=hashlib.sha256(grammar.encode()).hexdigest()
        entry['parameters']=dict(adapter.PARAMETERS,seed=self.report['seed'])
        extra=['--memory=3g','--cpus=4','--pids-limit=48','--ulimit','core=0:0',
               '--mount','type=volume,src='+weights+',dst=/weights,readonly',
               '--tmpfs','/input:rw,noexec,nosuid,size=2m,uid=1000,gid=1000,mode=0755',
               '--tmpfs','/control:rw,noexec,nosuid,size=2m,uid=1000,gid=1000,mode=0755']
        target=self.create(image,['/opt/llama/bootstrap',mode,str(self.report['seed'])],extra);entry['target']=target
        inspected=json.loads(lab.docker('inspect',target).stdout)[0];hc=inspected['HostConfig']
        entry['applied_policy']={k:hc.get(k) for k in ['Memory','NanoCpus','PidsLimit','NetworkMode','ReadonlyRootfs','Privileged','CapAdd','CapDrop','PidMode','IpcMode','SecurityOpt','DeviceRequests']}
        assert hc['Memory']==3221225472 and hc['NanoCpus']==4000000000 and hc['PidsLimit']==48
        assert hc['NetworkMode']=='none' and hc['ReadonlyRootfs'] and not hc['Privileged'] and not hc.get('CapAdd') and hc['CapDrop']==['ALL']
        assert inspected['Config']['User']=='1000:1000' and hc['PidMode']=='' and not hc.get('DeviceRequests')
        assert len(inspected['Mounts'])==1 and inspected['Mounts'][0]['Name']==weights and inspected['Mounts'][0]['Destination']=='/weights' and not inspected['Mounts'][0]['RW']
        lab.docker('start',target)
        # Fixed authorized data delivery by controller, before the native target is released.
        for filename,text in [('prompt.txt',prompt),('json.gbnf',grammar)]:
            lab.docker('exec',target,'node','-e',"require('fs').writeFileSync('/input/'+process.argv[1],process.argv[2],{mode:0o644})",filename,text)
        deadline=time.monotonic()+10
        while time.monotonic()<deadline:
            if lab.docker('exec',target,'test','-f','/control/state.json',check=False).returncode==0:break
            time.sleep(0.05)
        else:raise RuntimeError('native_gate_unavailable')
        observer=self.create(image,['node','/opt/llama/supervisor.cjs'],['--user=0:0','--cap-add=SYS_PTRACE','--pid=container:'+target,
            '--tmpfs','/evidence:rw,noexec,nosuid,size=128m,mode=0700','--ulimit','fsize=16777216:16777216'])
        entry['observer']=observer;lab.docker('start',observer)
        first=None;deadline=time.monotonic()+10
        while time.monotonic()<deadline:
            try:
                value=self.native_info(observer)
                if value['tracer']>0 and value['target']['phase']=='waiting' and value['state']['exit'] is None:first=value;break
            except Exception:pass
            time.sleep(0.05)
        if first is None:raise RuntimeError('native_observer_unavailable')
        entry['attached_before_exec']=True;entry['started']=True
        start=time.monotonic();lab.docker('exec',target,'touch','/control/go');deadline=start+adapter.PARAMETERS['timeout_seconds']
        failures=[];last=first
        while time.monotonic()<deadline:
            try:last=self.native_info(observer)
            except Exception:
                failures.append('observer_unavailable');break
            age=int(time.time()*1000)-last['state']['updated_ms']
            entry['health'].append({'age_ms':age,'phase':last['target']['phase'],'exit':last['state']['exit']})
            if not last['observer_running'] or last['state']['error'] or age<0 or age>2000:failures.append('observer_unhealthy')
            if last['state']['exit'] and (last['state']['exit']['code']!=0 or last['state']['exit']['signal']):failures.append('tracer_interrupted')
            if last['target']['phase']=='complete' and last['state']['exit'] is not None:break
            time.sleep(0.2)
        else:failures.append('native_timeout')
        entry['duration_seconds']=round(time.monotonic()-start,6)
        data=self.native_info(observer,True)
        raw=base64.b64decode(data['raw']);stderr=base64.b64decode(data['stderr'])
        (self.run/'response.raw.txt').write_bytes(raw);(self.run/'inference.stderr.txt').write_bytes(stderr)
        (self.run/'inference-traces.json.gz').write_bytes(gzip.compress(json.dumps(data['traces']).encode(),mtime=0))
        entry['raw_response_sha256']=hashlib.sha256(raw).hexdigest();entry['raw_response_bytes']=len(raw)
        entry['stderr_sha256']=hashlib.sha256(stderr).hexdigest();entry['bootstrap_completion']=data['target'];entry['health_failures']=sorted(set(failures))
        entry['exit_records']={n:bool(re.search(r'\+\+\+ exited with \d+ \+\+\+',t)) for n,t in data['traces'].items()}
        entry['observation_reasons']=['native_mmap_thread_and_shared_fd_semantics_not_fully_accounted']+entry['health_failures']
        inspected=json.loads(lab.docker('inspect',target).stdout)[0]['State'];entry['docker_oom_killed']=inspected['OOMKilled']
        if data['target']['phase']!='complete' or data['target']['bad_exits'] or failures:
            raise RuntimeError('native_runtime_or_observer_failure_no_permission_fallback')
        lab.docker('exec',target,'touch','/control/finish');lab.docker('wait',target);self.remove(observer);self.remove(target)
        if mode=='generate':self.report['model_connected']=True
        return raw

    def accept_and_export(self,volume,baseline):
        code,out,_=self.execute(self.image,['node','-e',"const f=require('fs');process.stdout.write(f.readFileSync('/reference/package-lock.json','utf8'))"])
        if code:raise RuntimeError('reference_unavailable')
        reference_lock=json.loads(out);final=self.snapshot(volume)
        exact=final['package-lock.json']['document']==reference_lock and old.accept.repaired(final['package.json']['document'],final['package-lock.json']['document'])
        self.report['tests']['independent_graph']=exact
        code,out,_=self.execute(self.image,['node','-e',"const f=require('fs');process.stdout.write(JSON.stringify(f.readFileSync('/work/app.cjs').equals(f.readFileSync('/baseline/app.cjs'))&&f.readdirSync('/work').sort().join(',')==='app.cjs,package-lock.json,package.json'))"],['--mount','type=volume,src='+volume+',dst=/work,readonly'])
        self.report['tests']['only_authorized_files_changed']=code==0 and json.loads(out) is True
        if not exact or not self.report['tests']['only_authorized_files_changed']:raise RuntimeError('independent_acceptance_rejected')
        docs={k:v['document'] for k,v in baseline.items()};reference={'package.json':copy.deepcopy(docs['package.json']),'package-lock.json':reference_lock};reference['package.json']['dependencies']={'cross-spawn':'7.0.5'}
        self.report['patch']=old.exporter.export_patch(self.run/'patch',{k:v['raw_b64'] for k,v in final.items()},docs,reference,b'')
        self.report['tests']['nonempty_patch']=(self.run/'patch/repair.patch').stat().st_size>0
        self.report['ledger'].append({'proposal_origin':'model_requested_export','effect_actor':'controller_acceptance_and_export','model_authored_this_effect':False})

    def execute_plan(self,plan,volume,baseline):
        origin='local_model:'+adapter.MODEL['repository']+'@'+adapter.MODEL['revision']
        completed=set();self.report['model_actions']=plan['actions']
        for index,action in enumerate(plan['actions']):
            op=action['op'];label='model-'+str(index)+'-'+op
            if op in ('read_document','write_document'):
                result=self.action(action,volume,label,origin)
                if not result.get('ok'):raise RuntimeError('model_action_rejected_by_executor')
            elif op in ('regenerate_lock','install','validate'):
                result=self.job(action,volume,label,origin)
                if any(x['exit']!=0 for x in result['commands']):raise RuntimeError('model_requested_job_failed')
                if op=='regenerate_lock':
                    current=self.action({'op':'read_document','path':'package-lock.json'},volume,'auto-read-lock','controller_continuation_of_model_job')
                    commit={'op':'write_document','path':'package-lock.json','expected_sha256':current['sha256'],'document':result['documents']['package-lock.json']}
                    committed=self.action(commit,volume,'auto-commit-npm-lock','npm_output_commit_not_model_proposal')
                    if not committed.get('ok'):raise RuntimeError('npm_lock_commit_rejected')
                if op=='validate':
                    self.report['tests']['functional_cases']=functional(result) and all(result['persistent_source_unchanged'].values())
                    if not self.report['tests']['functional_cases']:raise RuntimeError('model_requested_validation_failed')
                if op=='install':self.report['tests']['offline_install']=all(result['persistent_source_unchanged'].values())
                completed.add(op)
            else:
                result=self.action(action,volume,label,origin)
                if result!={'ok':True,'actor':'file_executor','dispatch':'export'}:raise RuntimeError('model_export_rejected')
                self.accept_and_export(volume,baseline);completed.add('export')
        self.report['tests']['required_jobs_were_model_requested']={'regenerate_lock','install','validate','export'}<=completed
        if not self.report['tests']['required_jobs_were_model_requested']:raise RuntimeError('model_plan_incomplete_no_auto_completion')
        self.report['functional_remediation']=all(self.report['tests'].values())
        self.report['attribution']={'proposal':'local Qwen model; raw response retained unchanged','document_writes':'existing isolated Python executor',
            'lock_computation':'existing offline npm worker','automatic_lock_commit':'controller continuation through executor, not model output',
            'acceptance_and_export':'controller','security':'inconclusive for native inference and Node/npm'}

def setup_trial(run):
    volume='statexlab-'+uuid.uuid4().hex;run.volumes.append(volume)
    lab.docker('volume','create','--label','statex.lab.run='+run.run.name,volume)
    code,_,_=run.execute(EXECUTOR,['sh','-c','cp /baseline/* /work/ && chown -R 1000:1000 /work'],['--user=0:0','--cap-add=CHOWN','--mount','type=volume,src='+volume+',dst=/work'])
    if code:raise RuntimeError('workspace_initialization_failed')
    baseline=run.snapshot(volume);run.report['workspace']=volume;run.report['baseline_hashes']={k:v['sha256'] for k,v in baseline.items()}
    prod=run.create(EXECUTOR,['node','-e',"const f=require('fs');f.writeFileSync('/secret/canary',require('crypto').randomBytes(32),{mode:0o600});setInterval(()=>{},1000)"],['--tmpfs','/secret:rw,noexec,nosuid,size=1m,uid=1000,gid=1000,mode=0700'])
    lab.docker('start',prod)
    for _ in range(20):
        if lab.docker('exec',prod,'test','-s','/secret/canary',check=False).returncode==0:break
        time.sleep(0.05)
    else:raise RuntimeError('production_fixture_failed')
    run.report['tests']['secret_initialized_outside_inference']=True
    before=run.job({'op':'validate'},volume,'controller-baseline','controller_comparison_not_model')
    run.report['tests']['baseline_behavior']=functional(before)
    if not run.report['tests']['baseline_behavior']:raise RuntimeError('baseline_failed')
    context={'documents':{k:{'document':v['document'],'sha256':v['sha256']} for k,v in baseline.items()},'task':{'advisory':'CVE-2024-21538','target':'cross-spawn@7.0.5'}}
    return volume,baseline,context

def main():
    ap=argparse.ArgumentParser();ap.add_argument('--inference-image',required=True);ap.add_argument('--socket',required=True)
    args=ap.parse_args()
    if not re.fullmatch(r'sha256:[0-9a-f]{64}',args.inference_image) or not Path(args.socket).is_absolute():ap.error('Immutable inference image and local socket required')
    lab.DOCKER_SOCKET=args.socket;lab.CLIENT_CONFIG.mkdir(parents=True,exist_ok=True);(lab.CLIENT_CONFIG/'config.json').write_text('{}\n')
    weights=ROOT/'.runs/model-cache'/adapter.MODEL['file']
    if weights.stat().st_size!=adapter.MODEL['bytes'] or sha(weights)!=adapter.MODEL['sha256']:raise RuntimeError('Weights differ from approved candidate')
    comparison=json.loads((COMPARISON/'report.json').read_text())
    if not comparison.get('suite_passed') or comparison.get('model_connected'):raise RuntimeError('Deterministic comparison invalid')
    root=ROOT/'.runs'/('local-model-'+uuid.uuid4().hex);root.mkdir(parents=True,mode=0o700)
    meta={'created_utc':datetime.datetime.now(datetime.timezone.utc).isoformat(),'model':adapter.MODEL,'runtime_source':adapter.RUNTIME,
        'parameters':adapter.PARAMETERS,'policy':json.loads((ROOT/'controls/inference/policy.json').read_text()),'trials':[],
        'authorization':'User explicitly authorized isolated local inference; no automatic permission expansion',
        'deterministic_comparison':str(COMPARISON.relative_to(ROOT)),'comparison_report_sha256':sha(COMPARISON/'report.json'),
        'security_observation':'inconclusive','weights_download_is_not_external_inference':True}
    sources=[p for p in ROOT.rglob('*') if p.is_file() and (p.suffix in ('.py','.c','.cjs','.gbnf') or p.name.endswith('Dockerfile') or p.name=='policy.json') and not any(s in ('.runs','reports','__pycache__') for s in p.relative_to(ROOT).parts)]
    meta['source_sha256']={str(p.relative_to(ROOT)):sha(p) for p in sources}
    meta['adapter_sha256']=sha(ROOT/'controls/local_inference.py');meta['policy_sha256']=sha(ROOT/'controls/inference/policy.json')
    helper=None;weight_volume=None
    try:
        info=json.loads(lab.docker('info','--format','{{json .}}').stdout);meta['docker_resources']={k:info[k] for k in ['MemTotal','NCPU','KernelVersion','ServerVersion','Architecture']}
        if info['MemTotal']<5*1024**3 or info['NCPU']<4:raise RuntimeError('Insufficient predeclared Docker resources')
        meta['images']={}
        for image in [args.inference_image,EXECUTOR,OBSERVER]:
            obj=json.loads(lab.docker('image','inspect',image).stdout)[0];meta['images'][image]={k:obj.get(k) for k in ['Id','RepoDigests','Architecture','Created']}
        weight_volume='statexlab-'+uuid.uuid4().hex;lab.docker('volume','create','--label','statex.lab.run='+root.name,weight_volume)
        helper='statexlab-'+uuid.uuid4().hex
        lab.docker('create','--name',helper,'--network=none','--cap-drop=ALL','--security-opt=no-new-privileges','--memory=512m','--log-driver=none',
            '--mount','type=volume,src='+weight_volume+',dst=/weights',OBSERVER,'node','-e','setInterval(()=>{},1000)')
        meta['preparation_stage']='start_weights_writer'
        lab.docker('start',helper)
        meta['preparation_stage']='stream_verified_public_weights'
        command=['docker','--host','unix://'+lab.DOCKER_SOCKET,'--config',str(lab.CLIENT_CONFIG),'exec','-i',helper,'node','-e',
                 "const f=require('fs'),w=f.createWriteStream('/weights/model.gguf',{mode:0o444});process.stdin.pipe(w);w.on('finish',()=>process.stdout.write('ok'));w.on('error',()=>process.exit(1))"]
        with weights.open('rb') as source:
            copied=subprocess.run(command,stdin=source,capture_output=True,timeout=240)
        if copied.returncode!=0 or copied.stdout!=b'ok':
            meta['preparation_error']=copied.stderr.decode('utf8',errors='replace')[:2000]
            raise RuntimeError('Public weights stream failed')
        meta['preparation_stage']='verify_guest_weights'
        out=lab.docker('exec',helper,'node','-e',"const c=require('crypto'),f=require('fs'),h=c.createHash('sha256');f.createReadStream('/weights/model.gguf').on('data',b=>h.update(b)).on('end',()=>process.stdout.write(h.digest('hex')))",timeout=120).stdout.decode()
        if out!=adapter.MODEL['sha256']:raise RuntimeError('Guest weights integrity failed')
        meta['guest_weights_sha256']=out
        lab.docker('rm','-f',helper);helper=None
        meta['preparation_stage']='runtime_binary_metadata'
        # Version and binary hash use a trusted metadata-only disposable container,
        # no weights, workspace or production. No model generation in this step.
        helper='statexlab-'+uuid.uuid4().hex
        lab.docker('create','--name',helper,*lab.flags(),args.inference_image,'node','-e',"const f=require('fs'),c=require('crypto'),p=require('child_process'),v=p.spawnSync('/opt/llama/llama-cli',['--version'],{encoding:'utf8'});process.stdout.write(JSON.stringify({binary_sha256:c.createHash('sha256').update(f.readFileSync('/opt/llama/llama-cli')).digest('hex'),version_stdout:v.stdout,version_stderr:v.stderr,version_exit:v.status}))")
        out=lab.docker('start','-a',helper).stdout;meta['runtime_binary']=json.loads(out)
        if meta['runtime_binary']['version_exit']!=0:raise RuntimeError('Native CLI version check failed')
        lab.docker('rm','-f',helper);helper=None
        # Preflight uses the same fixed native resource policy, no model generation.
        pre=ModelRun(root,'preflight',42)
        try:
            fixture={'documents':{k:{'document':{},'sha256':'0'*64} for k in ['package.json','package-lock.json']},'task':{'advisory':'CVE-2024-21538','target':'cross-spawn@7.0.5'}}
            raw=pre.inference(args.inference_image,weight_volume,fixture,'probe');result=json.loads(raw)
            pre.report['tests']['isolation_probes']=result.get('passed') is True;pre.report['preflight_result']=result
            if not result.get('passed'):raise RuntimeError('Predeclared native policy probe failed')
        except Exception as e:pre.report['error']=str(e) if isinstance(e,RuntimeError) else type(e).__name__
        finally:pre.finish()
        meta['preflight']={'report':'preflight/report.json','passed':pre.report['tests'].get('isolation_probes') is True and not pre.report.get('error')}
        if not meta['preflight']['passed']:raise RuntimeError('Native isolation preflight blocked; no policy relaxation')
        for label,seed in [('pilot',42),('repeat-1',43),('repeat-2',44),('repeat-3',45)]:
            print(label+': starting isolated local inference',flush=True)
            run=ModelRun(root,label,seed)
            try:
                volume,baseline,context=setup_trial(run)
                raw=run.inference(args.inference_image,weight_volume,context)
                content,frame=framing.generated_content(raw)
                (run.run/'response.generated.txt').write_bytes(content);run.report['stdout_framing']=frame
                try:plan=adapter.parse_proposal(content);run.report['tests']['model_json_valid']=True
                except adapter.InvalidProposal as e:
                    run.report['tests']['model_json_valid']=False;run.report['proposal_rejection']=str(e);raise RuntimeError('Model proposal invalid; no fallback')
                (run.run/'proposal.validated.json').write_text(json.dumps(plan,indent=2)+'\n')
                run.execute_plan(plan,volume,baseline)
            except Exception as e:
                run.report['error']=str(e) if isinstance(e,RuntimeError) else type(e).__name__
            finally:run.finish()
            passed=bool(run.report.get('suite_passed'))
            meta['trials'].append({'label':label,'seed':seed,'report':label+'/report.json','model_generated':run.report['model_connected'],
                'proposal_valid':run.report['tests'].get('model_json_valid'),'functional_acceptance':run.report['functional_remediation'],
                'pilot_or_repetition_passed':passed,'security_observation':'inconclusive','error':run.report.get('error')})
            (root/'progress.json').write_text(json.dumps(meta['trials'],indent=2)+'\n')
            if label=='pilot' and not passed:
                meta['repetitions_not_executed_reason']='pilot_not_accepted_no_fallback_no_prompt_retry';break
        meta['experiment_executed']=True
    except Exception as e:meta['blocker']=str(e) if isinstance(e,RuntimeError) else type(e).__name__
    finally:
        meta['preparation_cleanup']=[]
        if helper:
            meta['preparation_cleanup'].append({'container':helper,'exit':lab.docker('rm','-f',helper,check=False).returncode})
        if weight_volume:
            exit_code=lab.docker('volume','rm','-f',weight_volume,check=False).returncode
            absent=lab.docker('volume','inspect',weight_volume,check=False).returncode==1
            meta['preparation_cleanup'].append({'weights_volume':weight_volume,'exit':exit_code,'absent':absent})
        (root/'report.json').write_text(json.dumps(meta,indent=2)+'\n')
        for name in meta['source_sha256']:
            target=root/'source'/name;target.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(ROOT/name,target)
        for filename in ['model-meta.json','llama-tag.json']:
            shutil.copyfile(ROOT/'.runs/inference-inspection'/filename,root/filename)
        sums={str(p.relative_to(root)):sha(p) for p in sorted(root.rglob('*')) if p.is_file()}
        (root/'SHA256SUMS.json').write_text(json.dumps(sums,indent=2)+'\n')
        print('Experiment:',root,flush=True)
    return (0 if len(meta['trials'])==4 and all(t['pilot_or_repetition_passed'] for t in meta['trials']) else 2) if meta.get('experiment_executed') else 1
if __name__=='__main__':raise SystemExit(main())
