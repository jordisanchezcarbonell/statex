"""Fail-closed analyzer for static, single-threaded, immutable-fixture controls.

This is NOT the parser for arbitrary Node/AI workloads. Unknown calls, truncated
records, unclosed lifetimes and unknown successful reads make a run inconclusive.
"""
import re
DENIED = {'pread64','readv','mmap','io_uring_setup','dup','socket','openat2','sendfile','splice','process_vm_readv'}
ADMITTED = {'openat','read','close','clone','wait4','execve','clock_nanosleep','exit','exit_group'}

def records(traces):
    events=[]; errors=[]
    for name,text in traces.items():
        if not re.fullmatch(r'trace\.\d+',name):errors.append('unknown_trace_name');continue
        if not text.endswith('\n') or len(text.encode())>=1000000:errors.append('truncated_or_oversized_trace')
        pid=int(name.split('.')[1]); pending=None
        for index,line in enumerate(text.splitlines()):
            match=re.match(r'(\d+\.\d+)\s+(.*)',line)
            if not match:errors.append('unknown_trace_line');continue
            timestamp=float(match[1]);body=match[2]
            resumed=re.match(r'<\.\.\. (\w+) resumed>(.*)',body)
            if resumed:
                if not pending or not pending[1].startswith(resumed[1]+'('):errors.append('orphan_resumed');continue
                timestamp,begin=pending;body=begin+resumed[2];pending=None
            elif '<unfinished ...>' in body:
                if pending:errors.append('nested_unfinished')
                pending=(timestamp,body.replace('<unfinished ...>',''));continue
            events.append((timestamp,pid,index,body))
        if pending:errors.append('truncated_syscall')
    return sorted(events),errors

def analyze(traces,identities,expected_reaped=None):
    events,errors=records(traces)
    roots=[]
    for _,pid,_,body in events:
        if body.startswith('execve("/lab/probe",') and re.search(r'= 0$',body):roots.append(pid)
    if len(roots)!=1:
        return {'status':'inconclusive','reasons':['missing_or_multiple_initial_exec']+errors}
    root=roots[0];active=set();children={};fds={root:{}};ended={};reads=[];attempts=[];blocked=[];entered=False
    prefix=[b for _,p,_,b in events if p==root and not b.startswith('execve(')]
    if not any(b.startswith('close_range(3,') and b.endswith('= 0') for b in prefix):errors.append('inherited_fds_not_closed')
    if not any(b.startswith('landlock_restrict_self(') and b.endswith('= 0') for b in prefix):errors.append('missing_landlock')
    if not any(b.startswith('prctl(PR_SET_SECCOMP, SECCOMP_MODE_FILTER,') and b.endswith('= 0') for b in prefix):errors.append('missing_seccomp')
    for _,pid,_,body in events:
        if pid==root and body.startswith('execve("/lab/probe",') and re.search(r'= 0$',body):
            if entered:errors.append('unexpected_reexec')
            entered=True;active.add(pid);continue
        if pid not in active:continue
        exit_match=re.match(r'\+\+\+ exited with (\d+) \+\+\+',body)
        if exit_match:ended[pid]=int(exit_match[1]);continue
        if body.startswith('--- SIGCHLD '):continue
        if body.startswith('+++ killed') or body.startswith('---'):
            errors.append('unexpected_signal');continue
        call=re.match(r'(\w+)\(',body)
        if not call:errors.append('unknown_actor_record');continue
        name=call[1]
        if name in DENIED:
            if '= -1 EPERM ' not in body:errors.append('unblocked_alternative')
            blocked.append(name);continue
        if name not in ADMITTED:errors.append('unknown_actor_syscall');continue
        if name=='clone':
            if '= -1 EPERM ' in body:blocked.append('clone_shared');continue
            result=re.search(r'= (\d+)$',body)
            if not result or not re.search(r'flags=SIGCHLD\)',body):errors.append('unknown_clone');continue
            child=int(result[1]);children[child]=pid;active.add(child);fds[child]=dict(fds.get(pid,{}));continue
        if name=='openat':
            m=re.match(r'openat\([^,]+, "([^"]+)", ([^)]+)\)\s+=\s+(-?\d+)',body)
            if not m:errors.append('unknown_open');continue
            path,flags,returned=m[1],m[2],int(m[3]);identity=identities.get(path)
            attempts.append({'pid':pid,'path':path,'identity':identity,'result':returned,'denied':('EACCES' in body or 'EPERM' in body)})
            if '= -1 EPERM ' in body:blocked.append('openat_write');continue
            if returned>=0:
                if flags!='O_RDONLY' or identity is None:errors.append('unknown_successful_open')
                fds[pid][returned]=identity
            elif 'EACCES' not in body and 'ENOENT' not in body:errors.append('unknown_open_error')
        elif name=='read':
            m=re.match(r'read\((0x[0-9a-f]+|\d+),.*\)\s+=\s+(0x[0-9a-f]+|\d+)$',body)
            if not m:errors.append('unknown_read');continue
            fd=int(m[1],16) if m[1].startswith('0x') else int(m[1]);size=int(m[2],16) if m[2].startswith('0x') else int(m[2])
            identity=fds[pid].get(fd)
            if identity is None:errors.append('unknown_fd_read')
            reads.append({'pid':pid,'identity':identity,'bytes':size})
        elif name=='close':
            m=re.match(r'close\((\d+)(?:<[^>]*>)?\)\s+=\s+0$',body)
            if not m:errors.append('unknown_close')
            else:fds[pid].pop(int(m[1]),None)
        elif name=='execve':
            if body.startswith('execve("/bin/sh",') and '= -1 EACCES ' in body:blocked.append('landlock_exec')
            else:errors.append('unexpected_exec')
    if {int(n.split('.')[1]) for n in traces if re.fullmatch(r'trace\.\d+',n)}!=active:errors.append('unattributed_traced_process')
    if set(ended)!=active:errors.append('unclosed_process_tree')
    if any(x!=0 for x in ended.values()):errors.append('nonzero_actor_exit')
    # Trusted bootstrap reaps all descendants before exposing its completion state.
    if expected_reaped is None or expected_reaped!=len(active):errors.append('missing_reap_closure')
    return {'status':'conclusive_bounded' if not errors else 'inconclusive','reasons':sorted(set(errors)),
            'root_pid':root,'processes':sorted(active),'parents':children,'exits':ended,
            'attempts':attempts,'reads':reads,'read_bytes':sum(r['bytes'] for r in reads),'blocked':blocked}
