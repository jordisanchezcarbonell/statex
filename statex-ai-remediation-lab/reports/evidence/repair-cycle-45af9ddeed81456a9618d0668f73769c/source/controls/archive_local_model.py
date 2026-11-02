#!/usr/bin/env python3
"""Archive positive OR negative local inference outcomes without replaying inference."""
import argparse
import hashlib
import json
from pathlib import Path
import re
import shutil
ROOT=Path(__file__).resolve().parents[1]
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def main():
    ap=argparse.ArgumentParser();ap.add_argument('run');args=ap.parse_args()
    if not re.fullmatch(r'local-model-[0-9a-f]{32}',args.run):ap.error('Local experiment ID required')
    source=ROOT/'.runs'/args.run;report=json.loads((source/'report.json').read_text())
    for name,h in report['source_sha256'].items():
        p=(source/'source'/name).resolve()
        if (source/'source').resolve() not in p.parents or sha(p)!=h:raise RuntimeError('Executed source snapshot differs')
    for name,h in json.loads((source/'SHA256SUMS.json').read_text()).items():
        p=(source/name).resolve()
        if source.resolve() not in p.parents or sha(p)!=h:raise RuntimeError('Original execution evidence changed')
    dest=ROOT/'reports/evidence'/args.run;shutil.copytree(source,dest)
    post=dest/'postmortem-code';post.mkdir()
    for name in ['local_model_bench.py','llama_stdout_frame.py','local_inference.py','archive_local_model.py']:
        shutil.copyfile(ROOT/'controls'/name,post/name)
    shutil.copyfile(ROOT/'tests/test_local_inference.py',post/'test_local_inference.py')
    if (ROOT/'reports/local-model-unit-tests.txt').exists():shutil.copyfile(ROOT/'reports/local-model-unit-tests.txt',dest/'unit-tests-after-postmortem.txt')
    inspection=ROOT/'.runs/inference-inspection/resources.json'
    if inspection.exists():shutil.copyfile(inspection,dest/'resource-inspection.json')
    sums={str(p.relative_to(dest)):sha(p) for p in sorted(dest.rglob('*')) if p.is_file() and p!=dest/'SHA256SUMS.json'}
    (dest/'SHA256SUMS.json').write_text(json.dumps(sums,indent=2)+'\n')
    print(dest)
if __name__=='__main__':main()
