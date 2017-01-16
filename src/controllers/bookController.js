var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var bookController = function (bookService, nav) {

    var getIndex = function (req, res) {
        var url = 'mongodb://localhost:27017/books'; //auto create a new db instance or use an existing one
        mongodb.connect(url, function (err, db) {
            var collection = db.collection('booklist'); //pull out of our db
            collection.find({}).toArray(function (err, results) {
                res.render('bookListView', { //reference to bookListView.ejs, look through in views folder app.set is pointing
                    title: 'Books', //json object
                    nav: nav,
                    books: results //books:books when hardcode defined books in code, passing in an array that is navigation and my; now we are taking books from database to be printed out on site
                });
            });
        });


    };


    var getById = function (req, res) {

        var id = new objectId(req.params.id);
        var url = 'mongodb://localhost:27017/books';

        mongodb.connect(url, function (err, db) {
            var collection = db.collection('booklist'); //pull out of our db
            collection.findOne({ //findOne return just the one ID, must createobjectId = _id mongoDB uses for ID
                    _id: id
                },
                function (err, results) {

                    if (results.bookId) { //if have bookId we call service
                        bookService.getBookById(results.bookId,
                            function (err, book) {
                                results.book = book; //description
                                res.render('bookView', { //go to bookview view
                                    title: 'Books',
                                    nav: nav,
                                    book: results
                                });
                            });
                    } else {
                        res.render('bookView', {
                            title: 'Books',
                            nav: nav,
                            book: results
                        });
                    };
                    //call our bookservice, pass in results (_id for mongo, id goodr - must be added to our db)

                });
        });
        //var id = req.params.id;
        //everything that is behind : Express is going to attach to req object
        //res.send('Hello single books');
        //res.render('bookView', {
        //title: 'Books', //json object
        //nav: nav,
        //book: books[id] //just one book to render associated with the ID
    };

    return {
        getIndex: getIndex,
        getById: getById //controller sserves 2 routes, convenient way of having a controller when we have even more routes
    };
};

module.exports = bookController;