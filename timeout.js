//print hello world in 1/1000 sec, but immediately print out Hello
setTimeout(function () {
    console.log('hello world'); //last executed, because it takes the highest time
}, 2000);

console.log('Hello');

// Load the http module to create an http server.
var http = require('http');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
    response.writeHead(200, {
        "Content-Type": "text/plain"
    });
    response.end("Hello World\n");
});

// Listen on port 8000, IP defaults to 127.0.0.1
//process.env.PORT, process.env.IP
server.listen(8000, "localhost");

// Put a friendly message on the terminal
console.log("Server running at http://localhost:8000/"); //or 127.0.0.1:8000

//calbackss

var maxTime = 1000;
//if input is even, double it, if not, error then
//each call  to evenDoubler takes random amount of time <1sec

var evenDoubler = function (v, callback) {
    var waitTime = Math.floor(Math.random() * (maxTime = 1)); //calculate amount of wait time
    if (v % 2) {
        setTimeout(function () {
            callback(new Error("Odd input"));
        }, waitTime);
    } else {
        setTimeout(function () {
            callback(null, v * 2, waitTime); //pass null for error, go ahead and double it
        }, waitTime);
    }
};

//first parameter to callback is error, results will be the doubled number if there was not any error, 3rd parameter - how long did it take this to run
var handleResults = function (err, results, time) {
    if (err) {
        console.log('ERROR: ' + err.message); //if error is found, log that to the console
    } else {
        console.log('The results are: ' + results + ' (' + time + ' ms)');
    }

};

evenDoubler(2, handleResults); //pass the number, callback to receive result
evenDoubler(5, handleResults);
evenDoubler(10, handleResults);
console.log('----------------'); //first is invoked series of calls evenDoubler, but we might get --- before, because the invocation of the function takes a certain amount of time to complete, but Node went ahead --> different order of result we get
//no control when the call-back is going to get invoked

for (var i = 0; i < 10; i++) {
    console.log('Calling evenDoubler for value:' + i); //put function call inside a for loop
    evenDoubler(i, handleResults);
};
console.log('Done');
//output: logs invoked in order as it iteras (0-10), the results for evenDoubler are the last in a random order, but timing was in order


//solution with handleResults as a anonymous function defines as a part the call to evenDoubler - the callback

var count = 0; //through the invocations of the call-baack I am incrementing a count

for (var i = 0; i < 10; i++) {
    console.log('NEW Calling evenDoubler for value:' + i);
    evenDoubler(i, function (err, results, time) {
        if (err) {
            console.log('NEW ERROR: ' + err.message); //if error is found, log that to the console
        } else {
            console.log('NEW The results are: ' + results + ' (' + time + ' ms)');
        }
        if (++count === 10) {
            console.log('NEW Done!');
        }
    });
};

//JS
var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

setTimeout(function () {
    rl.question(">>What's your name?  ", function (answer) {
        console.log("Hello " + answer);
        rl.close();
    });
}, 2000);