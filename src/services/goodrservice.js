var http = require('http'); //output in xml
var xml2js = require('xml2js'); //convert to json
var parser = xml2js.Parser({
    explicitArray: false
});

var goodreadsService = function () { //will handle all GR APIs

    var getBookById = function (id, call) { //takes a book id as a parameter, callback when all is done

        var options = {
            host: 'www.goodreads.com',
            path: '/book/show/6867?format=xml&key=DzltjhC8jXxusVju2AqHXw'
        };

        var callback = function (response) {
            var str = '';

            response.on('data', function (chunk) {
                str += chunk;
            });
            response.on('end', function () {
                console.log(str);
                parser.parseString(str, function (err, result) { //when data comes form http request we appedn it to string, when it is done, we send the string to xml parser, and then call the calback that bookcontroller sent in with the result
                    call(null, result.GoodreadsResponse.book);
                    //description: 'Description of the book'

                });
            });

        };


        //implement http .get request out to goodrservice and then call end() -->define options
        http.request(options, callback).end();
    };
    return {
        getBookById: getBookById
    };
};


module.exports = goodreadsService;

//go to bookcontroller the route that handles our 1bookview