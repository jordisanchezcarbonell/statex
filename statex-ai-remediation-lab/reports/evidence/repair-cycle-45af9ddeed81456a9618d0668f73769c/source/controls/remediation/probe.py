"""Runtime controls for the actual isolated Python interpreter, not the static ELF."""
import errno
import json
import os
import socket
import subprocess

result={}
for path in ['/work/package.json','/work/package-lock.json','/denied/probe','/secret/canary','/controller/accept.py','/var/run/docker.sock']:
    try:
        fd=os.open(path,os.O_RDONLY|os.O_NOFOLLOW)
        result[path]={'read_bytes':len(os.read(fd,16))};os.close(fd)
    except OSError as e:result[path]={'error':errno.errorcode[e.errno]}
for name,fn in [('spawn',lambda:subprocess.run(['/bin/true'])),('socket',lambda:socket.socket())]:
    try:fn();result[name]='unexpected_success'
    except OSError as e:result[name]=errno.errorcode.get(e.errno,'error')
print(json.dumps({'actor':'python_runtime_probe','checks':result}))
