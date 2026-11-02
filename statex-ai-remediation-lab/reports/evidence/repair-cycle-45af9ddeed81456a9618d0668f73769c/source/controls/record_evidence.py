#!/usr/bin/env python3
"""Archive only controller reports, bounded calibration traces, and approved patches."""
import argparse
import datetime
import hashlib
import importlib.util
import json
from pathlib import Path
import shutil
ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('lab',ROOT/'controls/lab.py')
lab=importlib.util.module_from_spec(spec);spec.loader.exec_module(lab)
BASE='node@sha256:c86ecead9e55a5210ac1727de38a4ca840bf03dcaf34dc9749addbf383b1920c'

def main():
    ap=argparse.ArgumentParser();ap.add_argument('--baseline',required=True);ap.add_argument('--observer',required=True);ap.add_argument('--socket',required=True);args=ap.parse_args()
    if not Path(args.socket).is_absolute():ap.error('Local socket required')
    lab.DOCKER_SOCKET=args.socket
    runs=[]
    for name in [args.baseline,args.observer]:
        source=(ROOT/'.runs'/name).resolve()
        if source.parent!=(ROOT/'.runs').resolve():ap.error('Run must be a direct child of .runs')
        runs.append(source)
    baseline=json.loads((runs[0]/'report.json').read_text());observer=json.loads((runs[1]/'report.json').read_text())
    if baseline.get('error') or not baseline.get('baseline_behavior') or not observer.get('calibration_passed'):raise RuntimeError('Cannot archive as successful')
    dest=ROOT/'reports/evidence'/args.baseline
    dest.mkdir(parents=True,exist_ok=False)
    shutil.copyfile(runs[0]/'report.json',dest/'baseline-report.json')
    shutil.copytree(runs[0]/'patch',dest/'patch')
    shutil.copyfile(runs[1]/'report.json',dest/'observer-report.json')
    (dest/'traces').mkdir()
    for mode in ['allowed','denied','none','missing_production']:
        shutil.copyfile(runs[1]/(mode+'-trace.json'),dest/'traces'/(mode+'-trace.json'))
    images={}
    for image in [BASE,observer['image'],observer['observer_image']]:
        data=json.loads(lab.docker('image','inspect',image).stdout)[0]
        images[image]={k:data.get(k) for k in ['Id','RepoDigests','Created','Architecture','Os']}
    (dest/'images.json').write_text(json.dumps(images,indent=2)+'\n')
    # Verify removal only for the exact resources these controllers created.
    cleanup=[]
    for report in [baseline,observer]:
        for entry in report['cleanup']:
            kind='container' if 'container' in entry else 'volume';name=entry[kind]
            if not name.startswith('statexlab-'):raise RuntimeError('Unexpected resource name')
            cmd=('inspect',name) if kind=='container' else ('volume','inspect',name)
            result=lab.docker(*cmd,check=False)
            cleanup.append({'kind':kind,'name':name,'inspect_exit':result.returncode,'absent':result.returncode==1})
    # Successful daemon round trip disambiguates absence from daemon outage.
    lab.docker('info','--format','{{.ServerVersion}}')
    (dest/'cleanup-verification.json').write_text(json.dumps(cleanup,indent=2)+'\n')
    hashes={str(p.relative_to(dest)):hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted(dest.rglob('*')) if p.is_file()}
    (dest/'SHA256SUMS.json').write_text(json.dumps(hashes,indent=2)+'\n')
    source_files=sorted(list((ROOT/'controls').glob('*.py'))+list((ROOT/'controls').glob('*Dockerfile'))+list((ROOT/'fixture').glob('*'))+list((ROOT/'tests').glob('*.py')))
    (ROOT/'reports/artifact-sha256.json').write_text(json.dumps({str(p.relative_to(ROOT)):hashlib.sha256(p.read_bytes()).hexdigest() for p in source_files},indent=2)+'\n')
    print(dest)
if __name__=='__main__':main()
