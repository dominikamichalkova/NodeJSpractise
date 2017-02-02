var exec = require('child_process').exec; //directly require exec() from childprocess mod

//output of the commad once the command has completed
var child = exec('dir', function (err, stdout, stderr) { //arbitrary system statement 
    if (err) {
        console.log('Error' + stderr);
    } else {
        console.log('Output is:' + stdout);
    }
});

console.log('PID is: ' + child.pid); //process ID of the child process