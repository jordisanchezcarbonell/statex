"""Fixed disposable worker. No user-supplied executable, argv, cwd or environment."""
import hashlib
import json
import os
from pathlib import Path
import shutil
import subprocess

job=json.load(open('/run/request.json'))
if set(job)!={'op'} or job['op'] not in ('regenerate_lock','install','validate'):raise ValueError('job rejected')
for name in ('package.json','package-lock.json','app.cjs'):
    shutil.copyfile('/input/'+name,'/work/'+name)
before={n:hashlib.sha256(Path('/work/'+n).read_bytes()).hexdigest() for n in ('package.json','package-lock.json','app.cjs')}
os.chdir('/work')
shutil.copytree('/cache','/tmp/npm-cache')
env={'PATH':'/usr/local/bin:/usr/bin:/bin','HOME':'/tmp','LANG':'C.UTF-8',
     'npm_config_cache':'/tmp/npm-cache','npm_config_logs_dir':'/tmp/npm-logs','npm_config_userconfig':'/dev/null',
     'OPENSSL_CONF':'/dev/null','npm_config_audit':'false','npm_config_fund':'false','npm_config_update_notifier':'false'}
def run(args):
    r=subprocess.run(args,env=env,capture_output=True,timeout=45)
    if len(r.stdout)+len(r.stderr)>262144:raise ValueError('output limit')
    return {'exit':r.returncode,'stdout':r.stdout.decode('utf8',errors='replace'),'stderr_sha256':hashlib.sha256(r.stderr).hexdigest(),'stderr':r.stderr.decode('utf8',errors='replace')}
npm=['/usr/local/bin/node','/usr/local/lib/node_modules/npm/bin/npm-cli.js']
result={'actor':'npm_worker' if job['op']!='validate' else 'validation_worker','job':job['op'],'commands':[]}
if job['op']=='regenerate_lock':
    r=run(npm+['install','--package-lock-only','--offline','--ignore-scripts','--no-audit','--no-fund']);result['commands'].append(r)
    result['documents']={n:json.loads(Path('/work/'+n).read_bytes()) for n in ('package.json','package-lock.json')}
else:
    result['commands'].append(run(npm+['ci','--offline','--ignore-scripts','--no-audit','--no-fund']))
    if job['op']=='validate' and result['commands'][-1]['exit']==0:
        result['build']=run(['/usr/local/bin/node','--check','app.cjs'])
        result['cases']={value:run(['/usr/local/bin/node','app.cjs',value]) for value in ['hello','StateX ficticio','spaces & quotes "','áé雪']}
result['persistent_source_unchanged']={n:hashlib.sha256(Path('/work/'+n).read_bytes()).hexdigest()==digest for n,digest in before.items()}
print(json.dumps(result,ensure_ascii=True))
