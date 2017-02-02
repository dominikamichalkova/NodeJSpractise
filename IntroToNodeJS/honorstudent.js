var fun = require('./doubler');

process.on('message', function (m) {
    if (m.cmd === 'double') {
        console.log('hs: I was asked to double ' + m.number);
        fun.evenDoubler(m.number, function (err, result) {
            process.send({
                answer: result
            });
        });
    } else if (m.cmd === 'done') {
        process.exit();
    }
});

//function is invoked whenever this child receives a msg
//in the child process we simple register a func fo rthe message event on the process object
//in the func we are going to look at the command (part of json object we are sending was cmd var) 
//if the cmd var is set to double, we are goin gto log to the console that we were asked to double this number and then to run evenDoubler process and when we get the answer back, we will use process again to send a msg back to the parent and send them JSON object that contains the result
//if the command we get is done, this child process can exit