//node server side code that uses web sockets
//web server and socket.io server combined
//using socket.io for real-time communication
//handler - no matter which url it gets, it returns index.html
var http = require('http');
var socketio = require('socket.io');
var fs = require('fs');

var handler = function (req, res) {
    fs.readFile(__dirname + '/index.html', function (err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading index.html');
        } else {
            res.writeHead(200);
            res.end(data);
        }
    });
};

var app = http.createServer(handler); //passing in handler()
var io = socketio.listen(app); //socket.io really adds itself to the server tht was created in http.createserver

//version 2 other transport mecha
//io.configure(function () {
//  io.set('transports', ['xhr-polling']);  //socket.io trying to use web sockets, if not need to define other transport mechanism to maintain connection between client and the server, because we cannot depend on WS
//});

io.sockets.on('connection', function (socket) { //for socket.io server whenever it receives a connection event - browser
    setInterval(function () { //connects to the server, we want it to set an interval every 2 sec and during
        var timestamp = Date.now(); //it to capture a current timestamp emitted to the log and over te socket I want you
        console.log('Emitted: ' + timestamp); //to emit a timer event to the browser and pass the timestamp that has been 
        socket.emit('timer', timestamp); //just created to the browser
    }, 2000);
    socket.on('submit', function (data) { //listen to a submit event that comes from the browser, take data and log it
        console.log('Submitted: ' + data);
    });
});

app.listen(8080); //running localy yon localhost:8080
//app.listen(process.env.PORT, process.env.IP);

console.log('server running');