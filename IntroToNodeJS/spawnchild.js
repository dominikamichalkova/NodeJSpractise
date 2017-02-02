var spawn = require('child_process').spawn,
    tasklist = spawn('tasklist', ['/M']), //spawning 2 processes
    find = spawn('find', ['node']);

tasklist.stdout.pipe(find.stdin);
find.stdout.pipe(process.stdout);

tasklist.stderr.on('data', function (data) {
    console.log('tasklist stderr: ' + data);
});

find.stderr.on('data', function (data) {
    console.log('find stderr: ' + data);
});

//spawn give much control over stdin,stdout, stderr of the process while it is running
//in exec() we had acceess to stdout, stderr once the process was complete, now we can feed data to stdin and get data form stdout while process is still running
//they are streams - we can pipe one to another
//going to take stdout of the tasklist command and pipe it to stdin of find and then take stdout of find and send it to the console
//look for the event on stderr to see if there is an error with tasklist command and if there is we will log that to the console and the same for find