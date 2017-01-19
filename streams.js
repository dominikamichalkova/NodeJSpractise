//redable stream

var request = require('request'); //good use of streams with request

var s = request('http://pluralsight.com/'); //call a req on a pluralsight, returns a stream

//streams inherit from eventEmitters, can use .on() to subscribe to some of the events that are emitted by a readablestream
//data event is emitted whenever new data has been received, end event is emitted when there's no more data to be read
//we subscribe to these 2 events, request gives us back the stream - the body of the reponse of the request, shoulb be html of the pluralsight homepage and so as the data for the homepage comes back, we willget some number of data events and the func that we are asking it to invoke on te data event; parameter passed to it is the actual data that it received

s.on('data', function (chunk) {
    console.log('>>>Data>>>' + chunk); //log on console is html
});

s.on('end', function () {
    console.log('>>>Done');
});

//html is being returned from the http req, data events are being fired and pieces of the html are being sent to the func being registered to that data event


//writeable stream
//process module has several streams that it makes available -stdin,stdin,stderror,
console.log('stdout is writable? ' + process.stdout.writable); //bool

process.stdout.write('Hello');
process.stdout.write('World');