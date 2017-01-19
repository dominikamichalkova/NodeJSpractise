//piping a RS to WS
var request = require('request');

var s = request('http://pluralsight.com/');

s.pipe(process.stdout); //instead of listening for events on RS, we pipe it to WS
//html returned from the req and pipe it to console

//alternative: request('http://pluralsight.com/').pipe(process.stdout);

var fs = require('fs');
request('http://pluralsight.com/').pipe(fs.createWriteStream('pluralsight.html')); //pipe req to a file on the file system; create WS that will store the contents in this html file and return the stream - download html of webpage and save it

var zlib = require('zlib');

request('http://pluralsight.com/').pipe(zlib.createGzip()).pipe(fs.createWriteStream('pluralsight.html.gz'));
//R+W stream; flow of data - chaining: req() does not a req turn to a stream, but we make an injection - gzip the data on the way into the file; gzip returns a stream both R+W read uncompressd content and output compressed content; we pass in the stream that was returned form gzip() into pipe, the return value of pipe() is a stream when we can call pipe()