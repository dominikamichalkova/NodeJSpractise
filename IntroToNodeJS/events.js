//example to instantiate eventEmitter and return it from a function call
//1st pattern
var EventEmitter = require('events').EventEmitter;

var getResource = function (c) { //take a number and returns an instance of en eventEmitter that emits 3 events
    var e = new EventEmitter(); //instantiate new eventEmitter
    process.nextTick(function () { //on the very next tick of the vent loop we want to emit start event
        var count = 0;
        e.emit('start');
        var t = setInterval(function () { //every 10 milisec to exec the func to emit our data event
            e.emit('data', ++count); //keeping a count of how many data events we have emitted so far
            if (count === c) { //if the count is equal to the number we passed in, we emit an end event
                e.emit('end', count);
                clearInterval(t); //terminate func
            }
        }, 10);
    });
    return (e); //return value to be called before we start emitting events 
};

var r = getResource(5); //we passed in  5-> get back 5 data events and we subscribe to these events and printing sth out the console

//eventEmitter has 3 events
r.on('start', function () {
    console.log("I have started"); //reaction to the start event
});

r.on('data', function (data) {
    console.log("I have received data -> " + data);
});

r.on('end', function (t) {
    console.log("I am done with " + t + " data events.");
});


//2nd pattern, object that extends the EventEmitter class
//separation of code, take the code that emits the events and separated it out into a JS file

var Resource = require('./resource');

var r = new Resource(7);

r.on('start', function () {
    console.log("I have started"); //reaction to the start event
});

r.on('data', function (data) {
    console.log("I have received data -> " + data);
});

r.on('end', function (t) {
    console.log("I am done with " + t + " data events.");
});