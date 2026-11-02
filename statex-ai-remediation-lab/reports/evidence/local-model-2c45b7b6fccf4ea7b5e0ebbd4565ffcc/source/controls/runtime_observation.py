"""Separate dynamic-runtime profile. No conclusions imported from static analyzer.

Python handler is synchronous, has no children and does bounded read/write calls.
Node/npm workers intentionally remain inconclusive for semantic file-I/O coverage.
"""
import re
# Metadata/runtime calls admitted for the fixed Python 3.11 interpreter, not a
# blanket permission grant. Kernel Landlock/seccomp additionally restrict resources.
METADATA={'brk','mremap','epoll_create1','mprotect','munmap','madvise','set_tid_address','set_robust_list','rseq',
 'rt_sigaction','rt_sigprocmask','rt_sigreturn','arch_prctl','prlimit64','getrandom',
 'futex','newfstatat','fstat','statx','lseek','access','faccessat','faccessat2','readlink','readlinkat',
 'getcwd','getdents64','fcntl','ioctl','getuid','geteuid','getgid','getegid','getpid','getppid',
 'uname','sysinfo','sched_getaffinity','clock_gettime','gettid','close_range','prctl',
 'landlock_create_ruleset','landlock_add_rule','landlock_restrict_self','fsync','ftruncate',
 'execve','exit_group','exit','socket','clone','clone3','vfork','wait4','waitid','pipe2','dup2'}

def decode(traces):
    rows=[];issues=[]
    for filename,text in traces.items():
        if not re.fullmatch(r'trace\.\d+',filename):issues.append('unknown_trace_file');continue
        if not text.endswith('\n') or len(text.encode())>=16000000:issues.append('truncated_trace')
        pid=int(filename.split('.')[1]);pending=None
        for index,line in enumerate(text.splitlines()):
            m=re.match(r'(\d+\.\d+)\s+(.*)',line)
            if not m:issues.append('unparsed_line');continue
            ts,body=float(m[1]),m[2]
            resumed=re.match(r'<\.\.\. (\w+) resumed>(.*)',body)
            if resumed:
                if pending is None or not pending[1].startswith(resumed[1]+'('):issues.append('unpaired_resume');continue
                ts,stem=pending;body=stem+resumed[2];pending=None
            elif '<unfinished ...>' in body:
                if pending:issues.append('nested_pending')
                pending=(ts,body.replace('<unfinished ...>',''));continue
            rows.append((ts,pid,index,body))
        if pending:issues.append('incomplete_syscall')
    return sorted(rows),issues

def observe(traces,role,reaped,healthy):
    rows,issues=decode(traces);census={};execs=[];exits={};denied=[]
    for _,pid,_,body in rows:
        m=re.match(r'(\w+)\(',body)
        if m:census[m[1]]=census.get(m[1],0)+1
        if body.startswith('execve(') and body.endswith('= 0'):execs.append({'pid':pid,'call':body})
        if (m:=re.match(r'\+\+\+ exited with (\d+) \+\+\+',body)):exits[pid]=int(m[1])
        if re.search(r'= -1 (EACCES|EPERM) ',body):denied.append({'pid':pid,'call':body})
    prefix=[]
    for _,_,_,body in rows:
        if body.startswith('execve("/usr/bin/python3.11",') and body.endswith('= 0'):break
        prefix.append(body)
    for syscall in ['close_range','landlock_restrict_self']:
        if not any(b.startswith(syscall+'(') and b.endswith('= 0') for b in prefix):issues.append('missing_pre_exec_'+syscall)
    if not any(b.startswith('prctl(PR_SET_SECCOMP, SECCOMP_MODE_FILTER,') and b.endswith('= 0') for b in prefix):issues.append('missing_pre_exec_seccomp')
    pids={int(n.split('.')[1]) for n in traces if re.fullmatch(r'trace\.\d+',n)}
    if set(exits)!=pids or reaped!=len(pids):issues.append('incomplete_lifetimes')
    if any(x!=0 for x in exits.values()):issues.append('nonzero_runtime_exit')
    if not healthy:issues.append('observer_health_failed')
    initial=[x for x in execs if x['call'].startswith('execve("/usr/bin/python3.11",')]
    if len(initial)!=1:issues.append('initial_python_exec_missing')
    documents=[];file_maps=[];fds={0:'stdio',1:'result_channel',2:'error_channel'};active=False
    if role=='worker':
        # Preserve actual lifecycle/syscall evidence but do not pretend the
        # Python FD model covers Node's CLONE_FILES threads and libuv callbacks.
        issues.append('node_npm_shared_fd_and_async_io_not_semantically_accounted')
    else:
        if len(pids)!=1:issues.append('python_profile_has_unexpected_descendants')
        for _,pid,_,body in rows:
            if body.startswith('execve("/usr/bin/python3.11",') and body.endswith('= 0'):active=True;continue
            if not active or (initial and pid!=initial[0]['pid']):continue
            if body.startswith('+++ exited') or body.startswith('--- SIGCHLD'):continue
            m=re.match(r'(\w+)\(',body)
            if not m:
                if body.startswith('---'):issues.append('unexpected_runtime_signal')
                continue
            name=m[1]
            if name=='openat':
                op=re.match(r'openat\([^,]+, "([^"]+)", .*\)\s+=\s+(-?\d+)',body)
                if not op:issues.append('unknown_open');continue
                path,fd=op[1],int(op[2])
                if fd>=0:
                    known=path.startswith(('/usr/','/lib/','/lib64/','/tooling/')) or path in ['/etc/ld.so.cache','/etc/localtime','/dev/null','/run/request.json','/work/package.json','/work/package-lock.json']
                    if not known:issues.append('unrecognized_successful_open')
                    fds[fd]=path
                if path.startswith('/work/') or path.startswith('/denied/') or path.startswith('/secret/'):
                    documents.append({'kind':'open','path':path,'result':fd,'call':body})
            elif name in ('read','write','pread64','pwrite64'):
                io=re.match(r'\w+\((0x[0-9a-f]+|\d+),.*\)\s+=\s+(0x[0-9a-f]+|\d+)$',body)
                if not io:
                    if '= -1 ' not in body:issues.append('unknown_io_return')
                    continue
                num=lambda s:int(s,16) if s.startswith('0x') else int(s)
                path=fds.get(num(io[1]));size=num(io[2])
                if path is None:issues.append('unattributed_fd_io')
                if path and path.startswith('/work/'):
                    documents.append({'kind':name,'path':path,'bytes':size})
            elif name=='close':
                close=re.match(r'close\((\d+)(?:<[^>]*>)?\)\s+=\s+0$',body)
                if close:fds.pop(int(close[1]),None)
            elif name=='mmap':
                mapping=re.search(r', (-?\d+)(?:<[^>]*>)?, (?:0x[0-9a-f]+|\d+)\)\s+=',body)
                if not mapping:issues.append('unknown_mmap')
                elif int(mapping[1])>=0:
                    path=fds.get(int(mapping[1]))
                    if path is None:issues.append('unattributed_file_mmap')
                    file_maps.append(path)
                    if path and path.startswith('/work/'):issues.append('document_mmap_not_admitted')
            elif name not in METADATA:issues.append('unrecognized_python_runtime_call:'+name)
            elif name in ('clone','clone3','vfork','socket') and '= -1 EPERM ' not in body and '= -1 ENOSYS ' not in body:issues.append('unexpected_runtime_process_or_socket')
            elif name=='fcntl' and 'F_DUPFD' in body:issues.append('fd_duplication_not_admitted')
    return {'status':'inconclusive' if issues else 'conclusive_python_document_profile',
      'reasons':sorted(set(issues)),'profile':'node_npm_capture_only' if role=='worker' else 'python3.11_synchronous_document_io',
      'trace_tasks_closed':set(exits)==pids,'lifetimes_closed':set(exits)==pids and reaped==len(pids),'processes':sorted(pids),'exits':exits,
      'document_path_calls':[{'pid':p,'call':b} for _,p,_,b in rows if 'package.json' in b or 'package-lock.json' in b],'execs':execs,'syscall_census':census,'denials':denied,'document_io':documents,'runtime_file_mmaps':file_maps}
