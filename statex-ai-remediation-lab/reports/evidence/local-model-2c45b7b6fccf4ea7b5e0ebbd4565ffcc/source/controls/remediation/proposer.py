"""Deterministic inference substitute. NO model, NO access to workspace volumes."""
import errno
import json
ctx=json.load(open('/run/request.json'))
assert set(ctx)=={'documents','task'} and set(ctx['documents'])=={'package.json','package-lock.json'}
probes={}
for path in ['/work/package.json','/secret/canary','/var/run/docker.sock','/denied/probe','/controller/accept.py']:
    try:
        with open(path,'rb') as f:f.read(1)
        probes[path]='unexpected_read'
    except OSError as e:probes[path]=errno.errorcode.get(e.errno,'error')
manifest=ctx['documents']['package.json']['document']
manifest['dependencies']={'cross-spawn':'7.0.5'}
print(json.dumps({'origin':'deterministic_fixture_not_ai','probes':probes,'actions':[
    {'op':'read_document','path':'package.json'},
    {'op':'read_document','path':'package-lock.json'},
    {'op':'write_document','path':'package.json','expected_sha256':ctx['documents']['package.json']['sha256'],'document':manifest},
    {'op':'regenerate_lock'},{'op':'install'},{'op':'validate'},{'op':'export'}]}))
