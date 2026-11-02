#define _GNU_SOURCE
#include <errno.h>
#include <fcntl.h>
#include <linux/audit.h>
#include <linux/filter.h>
#include <linux/landlock.h>
#include <linux/seccomp.h>
#include <stddef.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/prctl.h>
#include <sys/syscall.h>
#include <sys/wait.h>
#include <unistd.h>
#include <signal.h>

static void fail(void) { _exit(120); }
static void rule(int fd, const char *path, unsigned long long access) {
    int parent = open(path, O_PATH | O_CLOEXEC); if (parent < 0) fail();
    struct landlock_path_beneath_attr attr = {.allowed_access=access,.parent_fd=parent};
    if (syscall(SYS_landlock_add_rule, fd, LANDLOCK_RULE_PATH_BENEATH, &attr, 0)) fail();
    close(parent);
}
static void confinement(void) {
    if (prctl(PR_SET_NO_NEW_PRIVS, 1, 0, 0, 0)) fail();
    struct landlock_ruleset_attr attr = {.handled_access_fs=LANDLOCK_ACCESS_FS_READ_FILE|LANDLOCK_ACCESS_FS_READ_DIR|LANDLOCK_ACCESS_FS_EXECUTE};
    int fd=syscall(SYS_landlock_create_ruleset,&attr,sizeof(attr),0); if(fd<0) fail();
    rule(fd,"/fixtures",LANDLOCK_ACCESS_FS_READ_FILE|LANDLOCK_ACCESS_FS_READ_DIR);
    rule(fd,"/lab/probe",LANDLOCK_ACCESS_FS_READ_FILE|LANDLOCK_ACCESS_FS_EXECUTE);
    if(syscall(SYS_landlock_restrict_self,fd,0)) fail();
    close(fd);
#if defined(__aarch64__)
#define LAB_ARCH AUDIT_ARCH_AARCH64
#elif defined(__x86_64__)
#define LAB_ARCH AUDIT_ARCH_X86_64
#else
#error Unsupported architecture
#endif
#define ALLOW(n) BPF_JUMP(BPF_JMP|BPF_JEQ|BPF_K, SYS_##n, 0, 1), BPF_STMT(BPF_RET|BPF_K,SECCOMP_RET_ALLOW)
    struct sock_filter f[]={
        BPF_STMT(BPF_LD|BPF_W|BPF_ABS,offsetof(struct seccomp_data,arch)),
        BPF_JUMP(BPF_JMP|BPF_JEQ|BPF_K,LAB_ARCH,1,0),
        BPF_STMT(BPF_RET|BPF_K,SECCOMP_RET_KILL_PROCESS),
        BPF_STMT(BPF_LD|BPF_W|BPF_ABS,offsetof(struct seccomp_data,nr)),
        ALLOW(read), ALLOW(close), ALLOW(exit), ALLOW(exit_group), ALLOW(wait4),
        ALLOW(execve), ALLOW(clock_nanosleep),
        // Only ordinary fork semantics; no CLONE_VM, CLONE_FILES, threads or namespaces.
        BPF_JUMP(BPF_JMP|BPF_JEQ|BPF_K,SYS_clone,0,4),
        BPF_STMT(BPF_LD|BPF_W|BPF_ABS,offsetof(struct seccomp_data,args[0])),
        BPF_JUMP(BPF_JMP|BPF_JEQ|BPF_K,SIGCHLD,0,1),
        BPF_STMT(BPF_RET|BPF_K,SECCOMP_RET_ALLOW),
        BPF_STMT(BPF_RET|BPF_K,SECCOMP_RET_ERRNO|EPERM),
        BPF_JUMP(BPF_JMP|BPF_JEQ|BPF_K,SYS_openat,0,4),
        BPF_STMT(BPF_LD|BPF_W|BPF_ABS,offsetof(struct seccomp_data,args[2])),
        BPF_JUMP(BPF_JMP|BPF_JEQ|BPF_K,O_RDONLY,0,1),
        BPF_STMT(BPF_RET|BPF_K,SECCOMP_RET_ALLOW),
        BPF_STMT(BPF_RET|BPF_K,SECCOMP_RET_ERRNO|EPERM),
        BPF_JUMP(BPF_JMP|BPF_JEQ|BPF_K,SYS_write,0,4),
        BPF_STMT(BPF_LD|BPF_W|BPF_ABS,offsetof(struct seccomp_data,args[0])),
        BPF_JUMP(BPF_JMP|BPF_JGT|BPF_K,2,1,0),
        BPF_STMT(BPF_RET|BPF_K,SECCOMP_RET_ALLOW),
        BPF_STMT(BPF_RET|BPF_K,SECCOMP_RET_ERRNO|EPERM),
        BPF_STMT(BPF_RET|BPF_K,SECCOMP_RET_ERRNO|EPERM)
    };
    struct sock_fprog program={.len=sizeof(f)/sizeof(f[0]),.filter=f};
    if(prctl(PR_SET_SECCOMP,SECCOMP_MODE_FILTER,&program)) fail();
}
static void state(const char *phase,int count,int bad,int child) {
    FILE *f=fopen("/control/state.tmp","w"); if(!f) fail();
    fprintf(f,"{\"phase\":\"%s\",\"reaped\":%d,\"bad_exits\":%d,\"child_pid\":%d}\n",phase,count,bad,child);
    if(fclose(f)||rename("/control/state.tmp","/control/state.json")) fail();
}
int main(int argc,char **argv) {
    if(argc!=2) return 120;
    pid_t pid=fork();if(pid<0) fail();
    if(pid==0) {
        if(raise(SIGSTOP)) fail();
        if(syscall(SYS_close_range,3,~0U,0)) fail();
        confinement();
        char *args[]={"/lab/probe",argv[1],NULL}; char *env[]={NULL};
        execve(args[0],args,env);fail();
    }
    int count=0,bad=0,status;pid_t result;
    if(waitpid(pid,&status,WUNTRACED)!=pid||!WIFSTOPPED(status)) fail();
    state("waiting",0,0,pid);
    while(access("/control/go",F_OK)) usleep(20000);
    if(kill(pid,SIGCONT)) fail();
    while((result=waitpid(-1,&status,0))>0) {count++;if(!WIFEXITED(status)||WEXITSTATUS(status)!=0)bad++;}
    if(errno!=ECHILD) fail();
    state("complete",count,bad,pid);
    // Remain alive so the external observer can flush and certify lifecycle closure.
    while(access("/control/finish",F_OK)) usleep(20000);
    return bad?121:0;
}
