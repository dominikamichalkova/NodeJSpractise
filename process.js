//stream interface: listening for data coming in on stdin (typing) and when it does we are going to turn around and write it to stdout; when stdin stream is closed we are going to write another msg, but to stderr --> direct interaction with the streams as opposed to piping to 

//stdin starts pasused, so we must call resume() to begin receving info, we must type into stdin - triger for the next event, data read by stdin and written to stdout -> must terminate and output is End

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    process.stdout.write('You entered ->' + chunk);
});

process.stdin.on('end', function () {
    process.stderr.write('End \n');
});

process.on('SIGTERM', function () { //POSIX signals listening for SIG term event -> if yes, write stderr + log process ID
    process.stderr.write('Why are you trying to terminate me?');
});

console.log('Node is running as process #' + process.pid);

//on another terminal run kill -TERM processID(#) is going to invoke the func and print out error command on previous terminal, we can still ineract with the program because it is running process.kill(#) terminate the process ID#