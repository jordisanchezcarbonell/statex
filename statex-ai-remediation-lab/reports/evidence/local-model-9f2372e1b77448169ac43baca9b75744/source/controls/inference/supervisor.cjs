'use strict';
// Trusted observer, private /evidence; no untrusted commands or payload buffers.
const fs=require('fs'),{spawn}=require('child_process');
let exit=null,error=null,ticks=0;
const target=JSON.parse(fs.readFileSync('/proc/1/root/control/state.json'));
if(target.phase!=='waiting'||!Number.isInteger(target.child_pid))throw Error('invalid trusted gate');
const stderr=fs.openSync('/evidence/strace.stderr','w');
const tracer=spawn('strace',['-ff','-ttt','-yy','-s','256','-e','trace=%file,%desc,%process,%memory,seccomp,prctl,landlock_create_ruleset,landlock_add_rule,landlock_restrict_self','-e','raw=read,write,pread64,pwrite64,readv,writev,preadv,pwritev,sendto,recvfrom,getrandom','-o','/evidence/trace','-p',String(target.child_pid)],{stdio:['ignore','ignore',stderr]});
tracer.on('error',()=>{error='spawn_failed';});
tracer.on('exit',(code,signal)=>{exit={code,signal};});
function status(){
  ticks++;
  fs.writeFileSync('/evidence/status.tmp',JSON.stringify({ticks,updated_ms:Date.now(),tracer_pid:tracer.pid||null,exit,error,target_pid:target.child_pid}));
  fs.renameSync('/evidence/status.tmp','/evidence/status.json');
}
status();setInterval(status,100);
