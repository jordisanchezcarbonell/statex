"""Fixed synchronous file executor. Input is data, never Python or shell code."""
import copy
import hashlib
import json
import os
import re
import stat

FILES=('package.json','package-lock.json')
JOBS=('regenerate_lock','install','validate','export')
LIMIT=262144
class Rejected(Exception): pass

def strict_json(raw):
    def pairs(values):
        out={}
        for key,value in values:
            if key in out: raise Rejected('duplicate_key')
            out[key]=value
        return out
    return json.loads(raw,object_pairs_hook=pairs)

def read_doc(path):
    if path not in FILES: raise Rejected('path_not_allowed')
    fd=os.open('/work/'+path,os.O_RDONLY|os.O_NOFOLLOW|os.O_NONBLOCK)
    try:
        s=os.fstat(fd)
        if not stat.S_ISREG(s.st_mode) or s.st_nlink!=1 or s.st_size>LIMIT:raise Rejected('file_type_or_size')
        chunks=[];total=0
        while True:
            b=os.read(fd,min(65536,LIMIT+1-total))
            if not b:break
            chunks.append(b);total+=len(b)
            if total>LIMIT:raise Rejected('file_too_large')
        raw=b''.join(chunks)
        if len(raw)!=s.st_size:raise Rejected('file_changed')
        return strict_json(raw),hashlib.sha256(raw).hexdigest(),s
    finally:os.close(fd)

def validate_document(path,old,new):
    if not isinstance(new,dict):raise Rejected('invalid_document')
    if path=='package.json':
        expected=copy.deepcopy(old);expected['dependencies']={'cross-spawn':'7.0.5'}
        if new!=expected:raise Rejected('manifest_scope')
    else:
        expected=copy.deepcopy(old)
        root=expected['packages'][''];root['dependencies']={'cross-spawn':'7.0.5'}
        entry=new.get('packages',{}).get('node_modules/cross-spawn',{})
        original=expected['packages']['node_modules/cross-spawn']
        # Actual npm generates the new integrity. Independent acceptance compares
        # the whole graph with a trusted reference; it is not supplied by this code.
        if (entry.get('version')!='7.0.5' or entry.get('resolved')!='https://registry.npmjs.org/cross-spawn/-/cross-spawn-7.0.5.tgz'
            or not re.fullmatch(r'sha512-[A-Za-z0-9+/]{86}==',entry.get('integrity',''))):raise Rejected('lock_target')
        for key,value in original.items():
            if key not in ('version','resolved','integrity') and entry.get(key)!=value:raise Rejected('lock_scope')
        if set(entry)!=set(original):raise Rejected('lock_scope')
        expected['packages']['node_modules/cross-spawn']=entry
        if new!=expected:raise Rejected('lock_scope')

def handle(request):
    if not isinstance(request,dict) or not isinstance(request.get('op'),str):raise Rejected('schema')
    op=request['op']
    if op=='read_document':
        if set(request)!={'op','path'}:raise Rejected('schema')
        body,digest,_=read_doc(request['path']);return {'ok':True,'actor':'file_executor','document':body,'sha256':digest}
    if op=='write_document':
        if set(request)!={'op','path','expected_sha256','document'}:raise Rejected('schema')
        path=request['path'];old,digest,before=read_doc(path)
        if digest!=request['expected_sha256']:raise Rejected('stale_document')
        validate_document(path,old,request['document'])
        raw=(json.dumps(request['document'],indent=2,ensure_ascii=True)+'\n').encode()
        if len(raw)>LIMIT:raise Rejected('file_too_large')
        fd=os.open('/work/'+path,os.O_WRONLY|os.O_NOFOLLOW|os.O_NONBLOCK)
        try:
            s=os.fstat(fd)
            if (s.st_dev,s.st_ino,s.st_nlink,s.st_size)!=(before.st_dev,before.st_ino,1,before.st_size):raise Rejected('file_changed')
            os.ftruncate(fd,0)
            pending=memoryview(raw)
            while pending:pending=pending[os.write(fd,pending):]
            os.fsync(fd)
        finally:os.close(fd)
        return {'ok':True,'actor':'file_executor','written':path,'sha256':hashlib.sha256(raw).hexdigest()}
    if op in JOBS:
        if set(request)!={'op'}:raise Rejected('schema')
        return {'ok':True,'actor':'file_executor','dispatch':op}
    raise Rejected('operation_not_allowed')

def main():
    try:
        raw=open('/run/request.json','rb').read(LIMIT*2+1)
        if len(raw)>LIMIT*2:raise Rejected('request_too_large')
        result=handle(strict_json(raw))
    except Rejected as e:result={'ok':False,'actor':'file_executor','rejected':str(e)}
    except Exception:result={'ok':False,'actor':'file_executor','rejected':'invalid_or_inaccessible_document'}
    print(json.dumps(result,separators=(',',':')))
if __name__=='__main__':main()
