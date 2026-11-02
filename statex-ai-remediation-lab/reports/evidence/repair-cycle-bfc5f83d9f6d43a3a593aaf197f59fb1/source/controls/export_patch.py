"""Trusted, bounded export. Never extract candidate archives or evaluate its code."""
import base64
import difflib
import hashlib
import json
from pathlib import Path

FILES = ('package.json', 'package-lock.json')
LIMIT = 262144
# Run only using trusted Node in the runtime image, /work mounted read-only.
SNAPSHOT_JS = r"""const fs=require('fs');let out={};
function reject(code){const e=new Error('export rejected');e.reason=code;throw e;}
try{
for(const name of ['package.json','package-lock.json']){
 const path='/work/'+name,pre=fs.lstatSync(path);
 if(pre.isSymbolicLink())reject('symlink');
 if(!pre.isFile())reject('non_regular');
 if(pre.nlink!==1)reject('hardlink');
 if(pre.size>262144)reject('too_large');
 const fd=fs.openSync(path,fs.constants.O_RDONLY|fs.constants.O_NOFOLLOW|fs.constants.O_NONBLOCK);
 try{
  const s=fs.fstatSync(fd);
  if(!s.isFile()||s.nlink!==1||s.dev!==pre.dev||s.ino!==pre.ino||s.size!==pre.size)reject('changed');
  const b=Buffer.alloc(262145);let count=0,n;
  while(count<b.length&&(n=fs.readSync(fd,b,count,b.length-count,null))>0)count+=n;
  const post=fs.fstatSync(fd);
  if(count!==s.size||post.size!==s.size||post.mtimeMs!==s.mtimeMs||post.ctimeMs!==s.ctimeMs||post.nlink!==1)reject('changed');
  out[name]=b.subarray(0,count).toString('base64');
 }finally{fs.closeSync(fd);}
}
process.stdout.write(JSON.stringify(out));
}catch(e){process.stderr.write(JSON.stringify({export_rejected:e.reason||'read_failure'}));process.exitCode=64;}
"""

def export_patch(destination, snapshot, baseline, reference, canary):
    """Accept exact known fixture schemas; canonicalize to eliminate untrusted text.

    Raw candidate bytes never persisted. Hashes identify them, and canonical hashes
    identify the review artifact. A reference fixture is not an AI remediation.
    """
    if set(snapshot) != set(FILES):
        raise ValueError('export names rejected')
    values, original_hashes = {}, {}
    for name in FILES:
        raw=base64.b64decode(snapshot[name], validate=True)
        if len(raw)>LIMIT or (canary and canary in raw):
            raise ValueError('export rejected')
        obj=json.loads(raw)
        if obj != baseline[name] and obj != reference[name]:
            raise ValueError('export outside trusted schema')
        values[name]=obj
        original_hashes[name]=hashlib.sha256(raw).hexdigest()
    # Do not accept mixed manifest / lock graphs.
    if not (values==baseline or values==reference):
        raise ValueError('inconsistent export')
    destination=Path(destination)
    destination.mkdir(mode=0o700)
    metadata={'kind':'baseline_unchanged' if values==baseline else 'candidate_reference_graph',
              'original_sha256':original_hashes, 'canonical_sha256':{}, 'baseline_sha256':{},
              'serialization':'canonical JSON; review patch applies to canonical baseline'}
    (destination/'baseline').mkdir(mode=0o700)
    patch=[]
    for name in FILES:
        content=json.dumps(values[name],indent=2,ensure_ascii=True,sort_keys=True)+'\n'
        original=json.dumps(baseline[name],indent=2,ensure_ascii=True,sort_keys=True)+'\n'
        (destination/name).write_text(content)
        (destination/'baseline'/name).write_text(original)
        metadata['baseline_sha256'][name]=hashlib.sha256(original.encode()).hexdigest()
        metadata['canonical_sha256'][name]=hashlib.sha256(content.encode()).hexdigest()
        patch.extend(difflib.unified_diff(original.splitlines(True),content.splitlines(True),
                                         fromfile='a/'+name,tofile='b/'+name))
    patch_bytes=''.join(patch).encode()
    (destination/'repair.patch').write_bytes(patch_bytes)
    metadata['patch_sha256']=hashlib.sha256(patch_bytes).hexdigest()
    (destination/'hashes.json').write_text(json.dumps(metadata,indent=2)+'\n')
    return metadata
