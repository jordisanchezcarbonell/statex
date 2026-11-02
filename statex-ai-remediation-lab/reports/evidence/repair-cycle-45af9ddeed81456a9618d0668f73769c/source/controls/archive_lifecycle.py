#!/usr/bin/env python3
"""Offline archive with matching source snapshots; never invokes Docker or models."""
import argparse
import hashlib
import json
from pathlib import Path
import shutil
ROOT=Path(__file__).resolve().parents[1]
def main():
    ap=argparse.ArgumentParser();ap.add_argument('run');args=ap.parse_args()
    source=(ROOT/'.runs'/args.run).resolve()
    if source.parent!=(ROOT/'.runs').resolve() or not source.name.startswith('lifecycle-'):ap.error('Invalid run')
    report=json.loads((source/'report.json').read_text())
    if not report.get('suite_passed'):raise RuntimeError('Not a successful suite')
    for name,digest in report['source_sha256'].items():
        p=(ROOT/name).resolve()
        if ROOT not in p.parents or hashlib.sha256(p.read_bytes()).hexdigest()!=digest:raise RuntimeError('Source differs from execution')
    for name,digest in json.loads((source/'SHA256SUMS.json').read_text()).items():
        p=(source/name).resolve()
        if source not in p.parents or hashlib.sha256(p.read_bytes()).hexdigest()!=digest:raise RuntimeError('Evidence hash differs')
    dest=ROOT/'reports/evidence'/source.name
    shutil.copytree(source,dest)
    for name in report['source_sha256']:
        target=dest/'source'/name;target.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(ROOT/name,target)
    hashes={str(p.relative_to(dest)):hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted(dest.rglob('*')) if p.is_file() and p!=dest/'SHA256SUMS.json'}
    (dest/'SHA256SUMS.json').write_text(json.dumps(hashes,indent=2)+'\n')
    (ROOT/'reports/artifact-sha256.json').write_text(json.dumps(report['source_sha256'],indent=2)+'\n')
    print(dest)
if __name__=='__main__':main()
