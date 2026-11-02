#!/usr/bin/env python3
"""Offline build-context preparation. Never downloads or executes a model."""
import hashlib
import importlib.util
from pathlib import Path
import shutil
import tarfile
ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('local_adapter',ROOT/'controls/local_inference.py')
a=importlib.util.module_from_spec(spec);spec.loader.exec_module(a)
def digest(p):
    h=hashlib.sha256()
    with p.open('rb') as f:
        for block in iter(lambda:f.read(4194304),b''):h.update(block)
    return h.hexdigest()
def main():
    weights=ROOT/'.runs/model-cache'/a.MODEL['file'];archive=ROOT/'.runs/inference-build/llama.cpp.tar.gz'
    if weights.stat().st_size!=a.MODEL['bytes'] or digest(weights)!=a.MODEL['sha256']:raise RuntimeError('Approved weights differ')
    if digest(archive)!=a.RUNTIME['source_tar_sha256']:raise RuntimeError('Pinned source archive differs')
    base=ROOT/'.runs/inference-build';source=base/'source';source.mkdir(exist_ok=True)
    with tarfile.open(archive,'r:gz') as tar:
        for item in tar.getmembers():
            if item.name.startswith('/') or '..' in Path(item.name).parts:raise RuntimeError('Unsafe source path')
        tar.extractall(source)
    tree=source/('llama.cpp-'+a.RUNTIME['commit']);context=base/'context';context.mkdir(exist_ok=True)
    shutil.copytree(tree,context/'llama.cpp',dirs_exist_ok=True)
    for name in ['bootstrap.c','probe.c','supervisor.cjs']:shutil.copyfile(ROOT/'controls/inference'/name,context/name)
    shutil.copyfile(ROOT/'controls/Inference.Dockerfile',context/'Dockerfile')
    if digest(tree/'grammars/json.gbnf')!=digest(ROOT/'controls/inference/json.gbnf'):raise RuntimeError('Generic grammar changed')
    print(context)
if __name__=='__main__':main()
