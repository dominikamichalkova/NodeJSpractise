var express = require('express');
var bookRouter = express.Router(); //function
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

//wrapper var router that wrapps the routes
var router = function (nav) {
    var bookService = require('../services/goodrservice')();
    var bookController = require('../controllers/bookController')(bookService, nav);
    bookRouter.route('/') // /Books/ 
        .get(bookController.getIndex); //now we return controllers
    //.post() for creating users 

    bookRouter.route('/:id') // read more about a single book, pulling in our id
        .get(bookController.getById);
    return bookRouter;
};
//we have 2 routes hosted by this router, 

module.exports = router; //accessing it by export function that creates a router