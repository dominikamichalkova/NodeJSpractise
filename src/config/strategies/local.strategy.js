var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongodb = require('mongodb').MongoClient;
var express = require('express');

module.exports = function () {
    passport.use(new LocalStrategy({ //handling local sign-in, take json object with 2 fields
            usernameField: 'username', //in index.ejs tells our local strategy that our usernamefield is called username
            passwordField: 'password'
        },

        function (username, password, done) {
            var url = 'mongodb://localhost:27017/books';
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('userlist');
                collection.findOne({
                        username: username
                    },
                    function (err, results) { //user object comes as a result
                        if (results.password === password) {
                            var user = results; //results are checked
                            done(null, user); //if all is ok
                        } else {
                            done(null, false, { //redirect to '/' null for no errors, false instead of a user

                                message: 'wrong password' // done(null,'bad password')
                            });
                        }
                    });
                //var user = {
                // username: username,
                //password: password
                //};
                //done(null, user);
            });
            //to determine whether this is an appropriate sign in, done callbac

        }));
};