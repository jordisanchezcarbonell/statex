#!/usr/bin/env python3
"""Full-lifetime bounded observation and Docker export rejection controls. NO models."""
import argparse
import datetime
import hashlib
import importlib.util
import json
from pathlib import Path
import re
import time
import uuid
ROOT=Path(__file__).resolve().parents[1]
def load(name):
    spec=importlib.util.spec_from_file_location(name,ROOT/'controls'/(name+'.py'))
    m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m
lab=load('lab');analyzer=load('lifecycle_analyze');exporter=load('export_patch')

class Suite:
    def __init__(self,image,runtime):
        self.image=image;self.runtime=runtime;self.names=[];self.volumes=[]
        self.run=ROOT/'.runs'/('lifecycle-'+uuid.uuid4().hex);self.run.mkdir(parents=True,mode=0o700)
        self.report={'created_utc':datetime.datetime.now(datetime.timezone.utc).isoformat(),'model_connected':False,
                     'models_blocked':True,'coverage':'static fork-only payloads, immutable fixtures, openat/read/close, seccomp+Landlock before exec','controls':{},'exports':{},'resources':[],'cleanup':[]}
    def create(self,image,cmd,extra=()):
        name='statexlab-'+uuid.uuid4().hex;self.names.append(name)
        lab.docker('create','--name',name,'--label','statex.lab.run='+self.run.name,*lab.flags(),*extra,image,*cmd)
        data=json.loads(lab.docker('inspect',name).stdout)[0];hc=data['HostConfig']
        self.report['resources'].append({'name':name,'image':data['Image'],'user':data['Config']['User'],
            'network':hc['NetworkMode'],'readonly':hc['ReadonlyRootfs'],'cap_drop':hc['CapDrop'],'cap_add':hc['CapAdd'],
            'privileged':hc['Privileged'],'security_opt':hc['SecurityOpt'],'pid_mode':hc['PidMode'],
            'tmpfs':hc['Tmpfs'],'mounts':[{'type':m['Type'],'name':m.get('Name'),'destination':m['Destination'],'rw':m['RW']} for m in data['Mounts']]})
        return name
    def execute(self,image,cmd,extra=()):
        name=self.create(image,cmd,extra);r=lab.docker('start','-a',name,check=False,timeout=20)
        state=json.loads(lab.docker('inspect',name).stdout)[0]['State']
        if state['Running']:raise RuntimeError('Unexpected running task')
        return state['ExitCode'],r.stdout,r.stderr
    def remove(self,name):
        result=lab.docker('rm','-f',name,check=False)
        self.report['cleanup'].append({'kind':'container','name':name,'exit':result.returncode});self.names.remove(name)
    def collect(self,observer,trace=False):
        js="""const fs=require('fs');const state=JSON.parse(fs.readFileSync('/evidence/status.json'));
let target=null,tracer=0;try{target=JSON.parse(fs.readFileSync('/proc/1/root/control/state.json'));tracer=+fs.readFileSync('/proc/'+target.child_pid+'/status','utf8').match(/TracerPid:\\s*(\\d+)/)[1]}catch(e){}
let untraced=[];for(const n of fs.readdirSync('/proc'))if(/^\d+$/.test(n)&&n!=='1'){try{const s=fs.readFileSync('/proc/'+n+'/status','utf8');if(+s.match(/Uid:\s*(\d+)/)[1]===1000&&+s.match(/TracerPid:\s*(\d+)/)[1]===0)untraced.push(+n)}catch(e){}}
let fixture={};for(const n of ['allowed','denied','symlink','hardlink']){const s=fs.statSync('/proc/1/root/fixtures/'+n);fixture['/fixtures/'+n]={dev:s.dev,ino:s.ino,size:s.size,mode:s.mode,nlink:s.nlink,is_file:s.isFile()};}
let traces={};if(process.argv[1]==='trace')for(const n of fs.readdirSync('/evidence'))if(/^trace\\.\\d+$/.test(n))traces[n]=fs.readFileSync('/evidence/'+n,'utf8');
process.stdout.write(JSON.stringify({state,target,tracer,untraced,fixture,traces,stderr:fs.readFileSync('/evidence/strace.stderr','utf8')}));"""
        data=json.loads(lab.docker('exec',observer,'node','-e',js,'trace' if trace else 'status',timeout=10).stdout)
        inspected=json.loads(lab.docker('inspect',observer).stdout)[0]['State']
        data['observer_running']=inspected['Running'];return data
    def lifecycle(self,mode,identities):
        entry={'expected':'inconclusive' if mode=='interrupted' else 'conclusive_bounded','health':[],'control_passed':False,'analysis':{'status':'inconclusive','reasons':['not_completed']}}
        self.report['controls'][mode]=entry
        target=self.create(self.image,['/lab/bootstrap',mode],['--tmpfs','/control:rw,noexec,nosuid,size=1m,uid=1000,gid=1000,mode=0755'])
        lab.docker('start',target)
        # Wait for the trusted child to stop before observer starts. No payload yet.
        deadline=time.monotonic()+10
        while time.monotonic()<deadline:
            ready=lab.docker('exec',target,'test','-f','/control/state.json',check=False)
            if ready.returncode==0:break
            time.sleep(0.05)
        else:raise RuntimeError('Trusted gate unavailable')
        observer=self.create(self.image,['node','/lab/supervisor.cjs'],['--user=0:0','--cap-add=SYS_PTRACE','--pid=container:'+target,'--tmpfs','/evidence:rw,noexec,nosuid,size=8m,mode=0700'])
        lab.docker('start',observer)
        deadline=time.monotonic()+15;first=None
        while time.monotonic()<deadline:
            try:
                candidate=self.collect(observer)
                if candidate['tracer']>0 and candidate['target'] and candidate['target']['phase']=='waiting' and not candidate['state']['exit']:
                    first=candidate;break
            except (RuntimeError,ValueError):pass
            time.sleep(0.05)
        if first is None:raise RuntimeError('Pre-exec observer unavailable')
        entry['attached_before_first_untrusted_exec']=True
        entry['pre_release_status']=first['state']
        entry['fixture_identity']=first['fixture']
        identities={p:str(s['dev'])+':'+str(s['ino']) for p,s in first['fixture'].items()}
        if (not all(s['is_file'] and s['size']==32 for s in first['fixture'].values()) or
            len({identities[p] for p in ['/fixtures/allowed','/fixtures/symlink','/fixtures/hardlink']})!=1 or
            identities['/fixtures/denied']==identities['/fixtures/allowed']):
            raise RuntimeError('Immutable fixture identity mismatch')
        # No untrusted process is created until this point. Root trusted supervisor
        # owns its evidence; target seccomp cannot write the control channel later.
        lab.docker('exec',target,'touch','/control/go')
        failure=None;interrupted=False;deadline=time.monotonic()+15;last=first
        while time.monotonic()<deadline:
            try:last=self.collect(observer,trace=(mode=='interrupted' and not interrupted))
            except Exception:failure='observer_unavailable';break
            state=last['state'];age=int(time.time()*1000)-state['updated_ms']
            entry['health'].append({'ticks':state['ticks'],'age_ms':age,'running':last['observer_running'],'tracer':last['tracer'],'exit':state['exit'],'untraced':last['untraced'],'phase':last['target']['phase'] if last['target'] else None})
            if not last['observer_running'] or state['error'] or age<0 or age>2000:
                failure='observer_interrupted_or_stale';break
            if state['exit']:
                if state['exit']['code']==0 and state['exit']['signal'] is None:
                    # Natural tracer completion must be corroborated by complete tree
                    # exit records and trusted reaping, never by exit code alone.
                    if last['target'] and last['target']['phase']=='complete':break
                    time.sleep(0.05);continue
                failure='observer_interrupted_or_stale';break
            if last['untraced']:
                failure='observer_interrupted_or_stale';break
            if mode=='interrupted' and not interrupted and any('clock_nanosleep(CLOCK_MONOTONIC' in t for t in last['traces'].values()):
                # Deliberately kill only this run's tracer; supervisor records premature exit.
                lab.docker('exec',observer,'node','-e',"process.kill(+process.argv[1],'SIGKILL')",str(state['tracer_pid']))
                interrupted=True;entry['fault_injected']='SIGKILL_tracer';entry['fault_before_completion']=last['target']['phase']!='complete';continue
            if last['target'] and last['target']['phase']=='complete':break
            time.sleep(0.05)
        else:failure='lifecycle_timeout'
        if not failure:
            entry['bootstrap_completion']=last['target']
            if last['target']['bad_exits']:failure='payload_failed'
            deadline=time.monotonic()+5
            while not last['state']['exit'] and time.monotonic()<deadline:
                time.sleep(0.05);last=self.collect(observer)
            ex=last['state']['exit']
            if not ex or ex['code']!=0 or ex['signal'] is not None:failure='observer_shutdown_failed'
        collected=self.collect(observer,trace=True)
        (self.run/(mode+'-trace.json')).write_text(json.dumps(collected['traces'],indent=2)+'\n')
        (self.run/(mode+'-observer.json')).write_text(json.dumps(collected,indent=2)+'\n')
        analysis=analyzer.analyze(collected['traces'],identities,last['target']['reaped'] if last['target'] and last['target']['phase']=='complete' else None)
        stderr_lines=collected['stderr'].splitlines()
        if any(not re.fullmatch(r'strace: Process \d+ (attached|detached)',line) for line in stderr_lines):failure=failure or 'observer_diagnostics'
        if failure:
            analysis['status']='inconclusive';analysis.setdefault('reasons',[]).append(failure)
        entry['analysis']=analysis;entry['final_observer_status']=collected['state']
        if mode=='interrupted':
            passed=bool(interrupted and entry.get('fault_before_completion') and analysis['status']=='inconclusive' and 'observer_interrupted_or_stale' in analysis['reasons'])
        else:
            passed=analysis['status']=='conclusive_bounded' and entry['bootstrap_completion']['bad_exits']==0
            count=3 if mode=='children' else 1
            passed=passed and len(analysis.get('processes',[]))==count
            if mode in ['allowed','symlink','hardlink','children']:
                passed=passed and analysis['read_bytes']==32 and len(analysis['reads'])==1 and analysis['reads'][0]['identity']==identities['/fixtures/allowed']
                if mode=='children':passed=passed and analysis['reads'][0]['pid']!=analysis['root_pid'] and len(analysis['parents'])==2
            elif mode=='denied':passed=passed and analysis['read_bytes']==0 and len(analysis['attempts'])==1 and analysis['attempts'][0]['denied']
            elif mode=='none':passed=passed and not analysis['attempts'] and not analysis['reads']
            elif mode=='blocked':passed=passed and analysis['read_bytes']==0 and len(analysis['blocked'])==13
        entry['control_passed']=bool(passed)
        if not failure:
            lab.docker('exec',target,'touch','/control/finish')
            result=lab.docker('wait',target)
            entry['bootstrap_exit']=int(result.stdout)
            if entry['bootstrap_exit']!=0:
                entry['control_passed']=False;entry['analysis']['status']='inconclusive';entry['analysis']['reasons'].append('bootstrap_exit_failed')
        # Preserve supervisor until traces are flushed and collected, then kill only ours.
        self.remove(observer);self.remove(target)
    def exports(self):
        documents={'package.json':{'name':'fictional-export','private':True},'package-lock.json':{'lockfileVersion':3}}
        for kind in ['regular','symlink','hardlink','fifo','directory','socket']:
            for attacked in (['package.json'] if kind=='regular' else list(documents)):
                key=kind+'-'+attacked;vol='statexlab-'+uuid.uuid4().hex;self.volumes.append(vol)
                lab.docker('volume','create','--label','statex.lab.run='+self.run.name,vol)
                mount=['--mount','type=volume,src='+vol+',dst=/work']
                init="const fs=require('fs');const docs="+json.dumps(documents)+";for(const [n,v] of Object.entries(docs))fs.writeFileSync('/work/'+n,JSON.stringify(v));"
                init+="const name="+json.dumps(attacked)+";const kind="+json.dumps(kind)+";const p='/work/'+name;"
                init+="""if(kind!=='regular')fs.unlinkSync(p);
if(kind==='symlink')fs.symlinkSync('/etc/hostname',p);
if(kind==='hardlink'){fs.writeFileSync('/work/source','{}');fs.linkSync('/work/source',p)}
if(kind==='fifo')require('child_process').execFileSync('mkfifo',[p]);
if(kind==='directory')fs.mkdirSync(p);
if(kind==='socket'){require('net').createServer().listen(p,()=>process.exit(0));}
"""
                code,_,_=self.execute(self.runtime,['node','-e',init],mount+['--user=0:0'])
                if code:raise RuntimeError('Export fixture initialization failed')
                start=time.monotonic()
                code,out,err=self.execute(self.runtime,['node','-e',exporter.SNAPSHOT_JS],['--mount','type=volume,src='+vol+',dst=/work,readonly'])
                entry={'exit':code,'seconds':round(time.monotonic()-start,3),'stdout_bytes':len(out)}
                if kind=='regular':
                    metadata=exporter.export_patch(self.run/('export-'+key),json.loads(out),documents,documents,b'fictional-not-a-production-secret')
                    entry.update({'control_passed':code==0,'export':metadata})
                else:
                    expected='symlink' if kind=='symlink' else 'hardlink' if kind=='hardlink' else 'non_regular'
                    entry['rejection']=json.loads(err) if err else None
                    entry['control_passed']=code==64 and out==b'' and entry['rejection']=={'export_rejected':expected}
                self.report['exports'][key]=entry
    def finish(self):
        for name in list(reversed(self.names)):
            try:self.remove(name)
            except Exception:self.report['cleanup'].append({'kind':'container','name':name,'exit':'exception'})
        for vol in self.volumes:
            try:self.report['cleanup'].append({'kind':'volume','name':vol,'exit':lab.docker('volume','rm','-f',vol,check=False).returncode})
            except Exception:self.report['cleanup'].append({'kind':'volume','name':vol,'exit':'exception'})
        for item in self.report['cleanup']:
            args=('inspect',item['name']) if item['kind']=='container' else ('volume','inspect',item['name'])
            try:item['absent_after_cleanup']=lab.docker(*args,check=False).returncode==1
            except Exception:item['absent_after_cleanup']=False
        try:lab.docker('info','--format','{{.ServerVersion}}');self.report['daemon_alive_after_cleanup']=True
        except Exception:self.report['daemon_alive_after_cleanup']=False
        self.report['suite_passed']=bool(not self.report.get('error') and len(self.report['controls'])==8 and len(self.report['exports'])==11 and all(x['control_passed'] for x in self.report['controls'].values()) and all(x['control_passed'] for x in self.report['exports'].values()) and self.report['daemon_alive_after_cleanup'] and all(x['exit']==0 and x['absent_after_cleanup'] for x in self.report['cleanup']))
        (self.run/'report.json').write_text(json.dumps(self.report,indent=2)+'\n')
        hashes={str(p.relative_to(self.run)):hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted(self.run.rglob('*')) if p.is_file()}
        (self.run/'SHA256SUMS.json').write_text(json.dumps(hashes,indent=2)+'\n');print('Report:',self.run/'report.json')

def main():
    ap=argparse.ArgumentParser();ap.add_argument('--image',required=True);ap.add_argument('--runtime-image',required=True);ap.add_argument('--socket',required=True);args=ap.parse_args()
    if not Path(args.socket).is_absolute():ap.error('Absolute local Unix socket required')
    for image in [args.image,args.runtime_image]:
        if not re.fullmatch(r'sha256:[0-9a-f]{64}',image):ap.error('Immutable local image ID required')
    lab.DOCKER_SOCKET=args.socket;lab.CLIENT_CONFIG.mkdir(parents=True,exist_ok=True);(lab.CLIENT_CONFIG/'config.json').write_text('{}\n')
    suite=Suite(args.image,args.runtime_image)
    source_files=sorted(p for p in ROOT.rglob('*') if p.is_file() and (p.suffix in ('.py','.c','.cjs') or p.name.endswith('Dockerfile') or p.name=='.dockerignore') and not any(part in ('.runs','reports','__pycache__') for part in p.relative_to(ROOT).parts))
    suite.report['source_sha256']={str(p.relative_to(ROOT)):hashlib.sha256(p.read_bytes()).hexdigest() for p in source_files}
    try:
        info=json.loads(lab.docker('info','--format','{{json .}}').stdout)
        suite.report['runtime']={k:info.get(k) for k in ['ServerVersion','KernelVersion','OperatingSystem','Architecture']}
        suite.report['images']={}
        for image in [args.image,args.runtime_image]:
            data=json.loads(lab.docker('image','inspect',image).stdout)[0]
            suite.report['images'][image]={k:data.get(k) for k in ['Id','RepoDigests','Architecture','Created']}
        code,raw,_=suite.execute(args.image,['node','-e',"const f=require('fs');let out={};for(const n of ['allowed','denied','symlink','hardlink']){const s=f.statSync('/fixtures/'+n);out['/fixtures/'+n]={dev:s.dev,ino:s.ino,size:s.size,nlink:s.nlink}}process.stdout.write(JSON.stringify(out))"])
        if code:raise RuntimeError('Fixture identity failed')
        suite.report['fixture_identity']=json.loads(raw)
        identities={p:str(s['dev'])+':'+str(s['ino']) for p,s in suite.report['fixture_identity'].items()}
        for mode in ['allowed','denied','none','children','symlink','hardlink','interrupted','blocked']:
            suite.lifecycle(mode,identities)
        suite.exports()
    except Exception as exc:
        suite.report['error']=type(exc).__name__
    finally:suite.finish()
    return 0 if suite.report.get('suite_passed') else 1
if __name__=='__main__':raise SystemExit(main())
