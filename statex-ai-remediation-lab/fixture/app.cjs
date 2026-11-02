const spawn = require('cross-spawn');
const result = spawn.sync(process.execPath, ['-e', 'process.stdout.write(JSON.stringify({message:process.argv[1]}))', process.argv[2] || 'hello'], {encoding:'utf8', timeout:1000});
if (result.error || result.status !== 0) process.exit(1);
process.stdout.write(result.stdout);
