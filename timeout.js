//print hello world in 1/1000 sec, but immediately print out Hello
setTimeout(function () {
    console.log('hello world');
}, 1000);

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

//calbacks

var maxtime = 1000;
//if input is even, double it, if not, error then
//each call  to evenDoubler takes random amount of time <1sec

var evenDoubler = function (v, callback) {

};

//first parameter to callback is error, results will be the doubled number if there was not any error, 3rs parameter - how long did it take this to run
var handleResults = function (err, results, time) {
    if (err) {
        console.log('ERROR' + err.message);
    } else {
        console.log('The results are' + results + " (" + time + " ms)");
    }

};

evenDoubler(2, handleResults); //pass the number, callback to receive result
console.log('---');