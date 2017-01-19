var util = require('util');
var EventEmitter = require('events').EventEmitter;

//our resource object extends or inherits from EventEmitter object - in order to do that we use util module and it has an inherits function built-in; which allow us to have the access to the .on function + scripts that included this file as a module to have access to resource obj
//all packed up in Resource func
function Resource(m) {
    var maxEvents = m;
    var self = this;


    process.nextTick(function () {
        var count = 0;
        self.emit('start');
        var t = setInterval(function () {
            self.emit('data', ++count);
            if (count === maxEvents) {
                self.emit('end', count);
                clearInterval(t); //terminate func
            }
        }, 10);
    });

};
//th edifference = we were instantiating an EventEmitter and using that instntiated vaiable to call the emit func, in this case because our resouce func inherits form eventemitter, it is our resource func that is doing the emitting of the events, so we need to use ,,this" variable to access the current resource that needs to do the emitting

util.inherits(Resource, EventEmitter);

module.exports = Resource;