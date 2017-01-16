var express = require('express');

var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var books = [
    {
        "title": "The Atonement",
        "author": "Ian McEwan",
        "year": '2005',
        bookId: 6867
    },

    {
        "title": "Crime and Punishment",
        "author": "F.M. Dostojevkij",
        "year": '1936',
        bookId: 7144
    }];

var router = function (nav) {

    adminRouter.route('/addBooks') //auto insert into db a set of books
        .get(function (req, res) { // get request to add books
            //open up our connection, 27017 standard default mongoDB port
            var url = 'mongodb://localhost:27017/books'; //auto create a new db instance or use an existing one
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('booklist');
                collection.insertMany(books, function (err, results) {
                    res.send(results); //we get back the results th elist of books added
                    db.close(); //must be inside the callback
                }); //once it inserted, it is going to execute callback function
            });

            //res.send('inserting books ...');
            //the url is http://localhost:PORT/Admin/addbooks
        });

    return adminRouter;
};

module.exports = router;

//delete books db.booklist.remove({}) then run /admin/addbooks and it should auto insert books into db and check /books