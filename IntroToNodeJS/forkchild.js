//message passing between parent and child process
var fork = require('child_process').fork;

var child = fork(__dirname + '/honorstudent.js');

child.on('message', function (m) {
    console.log('The answer is: ', m.answer);
    child.send({
        cmd: 'done'
    });
});

child.send({
    cmd: 'double',
    number: 20
});

//call fork to run honorstudent.js another Node program ans when it executes, fork returns a ChildProcess object and on that we are going to invoke send() to send it a msg - json object which has a command ,double' and number 20 - asking te child to double the number 20
//listen for a msg form the child and when we get a msg, we print the answervariable to the console and then we are sending another msg to the child, command ,done'