var fs = require('fs');
var http = require('http');

http.createServer(function (req, res) { //pass in a single func that is going to be invoked on each req
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    if (req.url === '/file.txt') { //if the url in the req, we go to fs to open a RS of that file and pipe it to the res
        fs.createReadStream(__dirname + '/file.txt').pipe(res); //directory the current script is running in, look for .txt in the same directory
    } else {
        res.end('Hello world');
    }

}).listen(process.env.PORT, process.env.IP);
console.log('server running');