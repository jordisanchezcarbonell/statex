// Freestanding, static test payload: no dynamic loader, libc startup or hidden threads.
#include <asm/unistd.h>
#include <linux/sched.h>
#include <linux/mman.h>
#include <signal.h>
#include <stddef.h>
#include <stdint.h>
static long sc(long n,long a,long b,long c,long d,long e,long f) {
#if defined(__aarch64__)
    register long x8 __asm__("x8")=n,x0 __asm__("x0")=a,x1 __asm__("x1")=b,x2 __asm__("x2")=c,x3 __asm__("x3")=d,x4 __asm__("x4")=e,x5 __asm__("x5")=f;
    __asm__ volatile("svc 0":"+r"(x0):"r"(x8),"r"(x1),"r"(x2),"r"(x3),"r"(x4),"r"(x5):"memory");return x0;
#else
    register long r10 __asm__("r10")=d,r8 __asm__("r8")=e,r9 __asm__("r9")=f;long ret;
    __asm__ volatile("syscall":"=a"(ret):"a"(n),"D"(a),"S"(b),"d"(c),"r"(r10),"r"(r8),"r"(r9):"rcx","r11","memory");return ret;
#endif
}
#define CALL(n,a,b,c,d,e,f) sc(__NR_##n,(long)(a),(long)(b),(long)(c),(long)(d),(long)(e),(long)(f))
static int eq(const char *a,const char *b){while(*a&&*a==*b){a++;b++;}return *a==*b;}
static void quit(int status){CALL(exit_group,status,0,0,0,0,0);for(;;){}}
static int read_path(const char *path,int expected_error){
    long fd=CALL(openat,-100,path,0,0,0,0);if(expected_error)return fd==-expected_error?0:91;
    if(fd<0)return 92;
    char buf[32];long n=CALL(read,fd,buf,32,0,0,0);CALL(close,fd,0,0,0,0,0);return n==32?0:93;
}
static int denied_calls(void){
    char b[32];long fd=CALL(openat,-100,"/fixtures/allowed",0,0,0,0);if(fd<0)return 95;
#define DENIED(n,a,b,c,d,e,f) if(CALL(n,a,b,c,d,e,f)!=-1)return 96
    DENIED(pread64,fd,b,32,0,0,0);
    DENIED(readv,fd,0,0,0,0,0);
    DENIED(mmap,0,4096,PROT_READ,MAP_PRIVATE,fd,0);
    DENIED(io_uring_setup,1,0,0,0,0,0);
    DENIED(dup,fd,0,0,0,0,0);
    DENIED(socket,1,1,0,0,0,0);
    DENIED(openat2,-100,"/fixtures/allowed",0,0,0,0);
    DENIED(sendfile,1,fd,0,32,0,0);
    DENIED(splice,fd,0,1,0,32,0);
    DENIED(process_vm_readv,1,0,0,0,0,0);
    DENIED(clone,CLONE_VM|SIGCHLD,0,0,0,0,0);
    DENIED(openat,-100,"/fixtures/allowed",2,0,0,0);
    CALL(close,fd,0,0,0,0,0);
    // Landlock denies reads/exec outside the two authorized trees.
    if(CALL(openat,-100,"/etc/passwd",0,0,0,0)!=-13)return 97;
    char *args[]={"/bin/sh",0};if(CALL(execve,"/bin/sh",args,0,0,0,0)!=-13)return 98;
    return 0;
}
void probe_main(long *stack){
    const char *mode=(const char *)stack[2];int ret=90;
    if(eq(mode,"allowed")) ret=read_path("/fixtures/allowed",0);
    else if(eq(mode,"denied")) ret=read_path("/fixtures/denied",13);
    else if(eq(mode,"none")) ret=0;
    else if(eq(mode,"symlink")) ret=read_path("/fixtures/symlink",0);
    else if(eq(mode,"hardlink")) ret=read_path("/fixtures/hardlink",0);
    else if(eq(mode,"children")) {
        long pid=CALL(clone,SIGCHLD,0,0,0,0,0);if(pid<0)quit(99);
        if(pid>0)quit(0);
        pid=CALL(clone,SIGCHLD,0,0,0,0,0);if(pid<0)quit(99);
        if(pid>0)quit(0);
        ret=read_path("/fixtures/allowed",0);
    } else if(eq(mode,"interrupted")) {
        struct {long sec,nsec;} delay={3,0};CALL(clock_nanosleep,1,0,&delay,0,0,0);
        ret=read_path("/fixtures/allowed",0);
    } else if(eq(mode,"blocked"))ret=denied_calls();
    quit(ret);
}
#if defined(__aarch64__)
__asm__(".global _start\n_start:\n mov x0, sp\n bl probe_main\n");
#else
__asm__(".global _start\n_start:\n mov %rsp, %rdi\n call probe_main\n");
#endif
