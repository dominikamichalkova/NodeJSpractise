var express = require('express');

var bookRouter = express.Router(); //function
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

//wrapper var router that wrapps the routes
var router = function (nav) {

    bookRouter.route('/') // /Books/ 
        .get(function (req, res) {
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


        });
    //.post() for creating users 

    bookRouter.route('/:id') // read more about a single book, pulling in our id
        .get(function (req, res) {

            var id = new objectId(req.params.id);
            var url = 'mongodb://localhost:27017/books';

            mongodb.connect(url, function (err, db) {
                var collection = db.collection('booklist'); //pull out of our db
                collection.findOne({ //findOne return just the one ID, must createobjectId = _id mongoDB uses for ID
                        _id: id
                    },
                    function (err, results) {
                        res.render('bookView', {
                            title: 'Books',
                            nav: nav,
                            book: results
                        });
                    });
            });
            //var id = req.params.id;
            //everything that is behind : Express is going to attach to req object
            //res.send('Hello single books');
            //res.render('bookView', {
            //title: 'Books', //json object
            //nav: nav,
            //book: books[id] //just one book to render associated with the ID
        });
    return bookRouter;
};
//we have 2 routes hosted by this router

module.exports = router; //accessing it by export function that creates a router