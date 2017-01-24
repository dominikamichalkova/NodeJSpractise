var http = require('http');

var options = {
    host: 'www.google.co.uk',
    port: 80,
    path: '/',
    method: 'GET'
};

console.log('Going to make a request ...');

var req = http.request(options, function (response) {
    console.log(response.statusCode); //return http status code
    response.pipe(process.stdout); //pipe the response to stdout
});

req.end();

//when calling http requests and being returned the request object in order to have the request actually invoked, we have to call req.end() - closing a give WS when we create the req

http.get('http://www.google.co.uk', function (response) {
    console.log(response.statusCode);
    response.pipe(process.stdout);
});


//using .get no end() needs to be done, it know w ear not going to be uploading any data and even take the return