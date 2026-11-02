#!/usr/bin/env python3
"""Archive functional evidence WITHOUT promoting inconclusive security coverage."""
import argparse
import hashlib
import json
from pathlib import Path
import re
import shutil
ROOT=Path(__file__).resolve().parents[1]
def main():
    ap=argparse.ArgumentParser();ap.add_argument('run');args=ap.parse_args()
    if not re.fullmatch(r'remediation-[0-9a-f]{32}',args.run):ap.error('Local remediation run required')
    source=ROOT/'.runs'/args.run;report=json.loads((source/'report.json').read_text())
    if not report.get('suite_passed') or not report.get('functional_remediation'):raise RuntimeError('Functional suite did not pass')
    for name,h in report['source_sha256'].items():
        p=(ROOT/name).resolve()
        if ROOT not in p.parents or hashlib.sha256(p.read_bytes()).hexdigest()!=h:raise RuntimeError('Runtime source differs')
    for name,h in json.loads((source/'SHA256SUMS.json').read_text()).items():
        p=(source/name).resolve()
        if source.resolve() not in p.parents or hashlib.sha256(p.read_bytes()).hexdigest()!=h:raise RuntimeError('Evidence changed')
    regression=ROOT/'.runs'/report['static_regression']['run']
    if hashlib.sha256((regression/'report.json').read_bytes()).hexdigest()!=report['static_regression']['report_sha256']:raise RuntimeError('Regression report changed')
    dest=ROOT/'reports/evidence'/source.name;shutil.copytree(source,dest)
    for name in report['source_sha256']:
        target=dest/'source'/name;target.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(ROOT/name,target)
    shutil.copyfile(__file__,dest/'archive-tool.py')
    shutil.copytree(regression,dest/'static-regression')
    if (ROOT/'reports/remediation-unit-tests.txt').exists():shutil.copyfile(ROOT/'reports/remediation-unit-tests.txt',dest/'unit-tests.txt')
    sums={str(p.relative_to(dest)):hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted(dest.rglob('*')) if p.is_file() and p!=dest/'SHA256SUMS.json'}
    (dest/'SHA256SUMS.json').write_text(json.dumps(sums,indent=2)+'\n')
    # This inventory is for executed source; archive-tool.py has a separate hash
    # in evidence because it is used only after the run, never as agent tooling.
    (ROOT/'reports/artifact-sha256.json').write_text(json.dumps(report['source_sha256'],indent=2)+'\n')
    print(dest)
    print('Security observation:',report['security_observation'])
if __name__=='__main__':main()
