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
#include <string.h>

static void fail(void) { _exit(120); }
static void rule(int fd, const char *path, unsigned long long access) {
    int parent = open(path, O_PATH | O_CLOEXEC); if (parent < 0) fail();
    struct landlock_path_beneath_attr attr = {.allowed_access=access,.parent_fd=parent};
    if (syscall(SYS_landlock_add_rule, fd, LANDLOCK_RULE_PATH_BENEATH, &attr, 0)) fail();
    close(parent);
}
static void confinement(void) {
    if(prctl(PR_SET_NO_NEW_PRIVS,1,0,0,0))fail();
    unsigned long long read=LANDLOCK_ACCESS_FS_READ_FILE|LANDLOCK_ACCESS_FS_READ_DIR;
    unsigned long long write=LANDLOCK_ACCESS_FS_WRITE_FILE|LANDLOCK_ACCESS_FS_REMOVE_FILE|LANDLOCK_ACCESS_FS_REMOVE_DIR|LANDLOCK_ACCESS_FS_MAKE_DIR|LANDLOCK_ACCESS_FS_MAKE_REG|LANDLOCK_ACCESS_FS_MAKE_SYM|LANDLOCK_ACCESS_FS_MAKE_FIFO|LANDLOCK_ACCESS_FS_MAKE_SOCK;
    struct landlock_ruleset_attr attr={.handled_access_fs=read|write|LANDLOCK_ACCESS_FS_EXECUTE};
    int fd=syscall(SYS_landlock_create_ruleset,&attr,sizeof(attr),0);if(fd<0)fail();
    rule(fd,"/usr",read);rule(fd,"/lib",read);
    if(access("/lib64",F_OK)==0)rule(fd,"/lib64",read);
    rule(fd,"/opt/llama",read);
    rule(fd,"/opt/llama/llama-cli",LANDLOCK_ACCESS_FS_READ_FILE|LANDLOCK_ACCESS_FS_EXECUTE);
    rule(fd,"/opt/llama/probe",LANDLOCK_ACCESS_FS_READ_FILE|LANDLOCK_ACCESS_FS_EXECUTE);
    if(access("/lib/ld-linux-aarch64.so.1",F_OK)==0)rule(fd,"/lib/ld-linux-aarch64.so.1",LANDLOCK_ACCESS_FS_READ_FILE|LANDLOCK_ACCESS_FS_EXECUTE);
    if(access("/lib64/ld-linux-x86-64.so.2",F_OK)==0)rule(fd,"/lib64/ld-linux-x86-64.so.2",LANDLOCK_ACCESS_FS_READ_FILE|LANDLOCK_ACCESS_FS_EXECUTE);
    rule(fd,"/etc/ld.so.cache",LANDLOCK_ACCESS_FS_READ_FILE);
    rule(fd,"/weights",read);
    rule(fd,"/input/prompt.txt",LANDLOCK_ACCESS_FS_READ_FILE);
    rule(fd,"/input/json.gbnf",LANDLOCK_ACCESS_FS_READ_FILE);
    rule(fd,"/dev/null",LANDLOCK_ACCESS_FS_READ_FILE);
    if(syscall(SYS_landlock_restrict_self,fd,0))fail();
    close(fd);
#if defined(__aarch64__)
#define LAB_ARCH AUDIT_ARCH_AARCH64
#elif defined(__x86_64__)
#define LAB_ARCH AUDIT_ARCH_X86_64
#else
#error Unsupported architecture
#endif
#define DENY(n) BPF_JUMP(BPF_JMP|BPF_JEQ|BPF_K,SYS_##n,0,1),BPF_STMT(BPF_RET|BPF_K,SECCOMP_RET_ERRNO|EPERM)
    struct sock_filter f[]={
        BPF_STMT(BPF_LD|BPF_W|BPF_ABS,offsetof(struct seccomp_data,arch)),
        BPF_JUMP(BPF_JMP|BPF_JEQ|BPF_K,LAB_ARCH,1,0),BPF_STMT(BPF_RET|BPF_K,SECCOMP_RET_KILL_PROCESS),
        BPF_STMT(BPF_LD|BPF_W|BPF_ABS,offsetof(struct seccomp_data,nr)),
        DENY(socket),DENY(socketpair),DENY(connect),DENY(sendto),DENY(sendmsg),DENY(recvmsg),
        DENY(ptrace),DENY(process_vm_readv),DENY(process_vm_writev),DENY(io_uring_setup),DENY(io_uring_enter),DENY(io_uring_register),
        DENY(memfd_create),DENY(open_by_handle_at),DENY(unshare),DENY(setns),DENY(mount),DENY(bpf),DENY(perf_event_open),DENY(execveat),
#ifdef SYS_fork
        DENY(fork),
#endif
#ifdef SYS_vfork
        DENY(vfork),
#endif
        BPF_JUMP(BPF_JMP|BPF_JEQ|BPF_K,SYS_clone3,0,1),BPF_STMT(BPF_RET|BPF_K,SECCOMP_RET_ERRNO|ENOSYS),
        // Exact predeclared glibc pthread flags, no process or namespace clones.
        BPF_JUMP(BPF_JMP|BPF_JEQ|BPF_K,SYS_clone,0,7),
        BPF_STMT(BPF_LD|BPF_W|BPF_ABS,offsetof(struct seccomp_data,args[0])+4),
        BPF_JUMP(BPF_JMP|BPF_JEQ|BPF_K,0,1,0),BPF_STMT(BPF_RET|BPF_K,SECCOMP_RET_ERRNO|EPERM),
        BPF_STMT(BPF_LD|BPF_W|BPF_ABS,offsetof(struct seccomp_data,args[0])),
        BPF_JUMP(BPF_JMP|BPF_JEQ|BPF_K,0x3d0f00,0,1),BPF_STMT(BPF_RET|BPF_K,SECCOMP_RET_ALLOW),BPF_STMT(BPF_RET|BPF_K,SECCOMP_RET_ERRNO|EPERM),
        BPF_STMT(BPF_RET|BPF_K,SECCOMP_RET_ALLOW)
    };
    struct sock_fprog p={.len=sizeof(f)/sizeof(f[0]),.filter=f};
    if(prctl(PR_SET_SECCOMP,SECCOMP_MODE_FILTER,&p))fail();
}
static void state(const char *phase,int count,int bad,int child) {
    FILE *f=fopen("/control/state.tmp","w"); if(!f) fail();
    fprintf(f,"{\"phase\":\"%s\",\"reaped\":%d,\"bad_exits\":%d,\"child_pid\":%d}\n",phase,count,bad,child);
    if(fclose(f)||rename("/control/state.tmp","/control/state.json")) fail();
}
int main(int argc,char **argv) {
    if(argc!=3||(!strcmp(argv[1],"generate")?0:strcmp(argv[1],"probe"))) return 120;
    pid_t pid=fork();if(pid<0) fail();
    if(pid==0) {
        if(raise(SIGSTOP)) fail();
        if(syscall(SYS_close_range,3,~0U,0)) fail();
        int out=open("/control/response.txt",O_WRONLY|O_CREAT|O_TRUNC,0644);
        int err=open("/control/runtime.stderr",O_WRONLY|O_CREAT|O_TRUNC,0644);
        if(out<0||err<0||dup2(out,1)<0||dup2(err,2)<0)fail();
        close(out);close(err);
        confinement();
        char *env[]={"LANG=C.UTF-8","HOME=/tmp","PATH=/opt/llama",NULL};
        if(!strcmp(argv[1],"probe")){char *args[]={"/opt/llama/probe",NULL};execve(args[0],args,env);fail();}
        char *args[]={"/opt/llama/llama-cli","--model","/weights/model.gguf","--file","/input/prompt.txt",
            "--grammar-file","/input/json.gbnf","--no-conversation","--no-display-prompt","--simple-io","--no-perf","--no-warmup",
            "--ctx-size","8192","--predict","1536","--threads","4","--threads-batch","4","--n-gpu-layers","0",
            "--seed",argv[2],"--temp","0.2","--top-k","40","--top-p","0.95",NULL};
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
