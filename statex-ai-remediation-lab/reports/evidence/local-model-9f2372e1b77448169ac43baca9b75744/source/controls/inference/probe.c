#define _GNU_SOURCE
#include <errno.h>
#include <fcntl.h>
#include <stdio.h>
#include <sys/socket.h>
#include <sys/wait.h>
#include <unistd.h>
static int denied_read(const char *path,int expected) {
    int fd=open(path,O_RDONLY);int e=errno;
    if(fd>=0){close(fd);return 0;}return e==expected;
}
static int denied_write(const char *path) {
    int fd=open(path,O_WRONLY);int e=errno;
    if(fd>=0){close(fd);return 0;}return e==EACCES||e==EROFS;
}
int main(void) {
    char b[4];int fd=open("/weights/model.gguf",O_RDONLY);
    int weights=fd>=0&&read(fd,b,4)==4&&b[0]=='G'&&b[1]=='G'&&b[2]=='U'&&b[3]=='F';
    if(fd>=0)close(fd);
    fd=open("/input/prompt.txt",O_RDONLY);int context=fd>=0&&read(fd,b,4)==4;if(fd>=0)close(fd);
    int absent=denied_read("/work/package.json",ENOENT)&&denied_read("/secret/canary",ENOENT)&&denied_read("/var/run/docker.sock",ENOENT)&&denied_read("/controller/accept.py",ENOENT);
    int protected=denied_read("/denied/probe",EACCES)&&denied_write("/weights/model.gguf")&&denied_write("/input/prompt.txt")&&denied_write("/control/state.json");
    int pid=fork();int fork_denied=pid<0&&errno==EPERM;
    if(pid==0)_exit(99);
    if(pid>0)waitpid(pid,NULL,0);
    int s=socket(AF_INET,SOCK_STREAM,0);int net_denied=s<0&&errno==EPERM;if(s>=0)close(s);
    char *args[]={"/bin/sh","-c","exit 0",NULL};execv(args[0],args);int shell_denied=errno==EACCES;
    int ok=weights&&context&&absent&&protected&&fork_denied&&net_denied&&shell_denied;
    printf("{\"weights_readable\":%s,\"context_readable\":%s,\"domain_paths_absent\":%s,\"protected_paths_denied\":%s,\"fork_denied\":%s,\"network_socket_denied\":%s,\"shell_exec_denied\":%s,\"passed\":%s}\n",weights?"true":"false",context?"true":"false",absent?"true":"false",protected?"true":"false",fork_denied?"true":"false",net_denied?"true":"false",shell_denied?"true":"false",ok?"true":"false");
    return ok?0:1;
}
