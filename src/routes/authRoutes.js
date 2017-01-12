var express = require('express');

var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');

var router = function () { //tells passport that there is a new logging in
    authRouter.route('/signUp') //sign up route to create a new user; tha path will be /auth/signUp
        .post(function (req, res) {
            console.log(req.body);
            var url = 'mongodb://localhost:27017/books';
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('userlist');
                var user = {
                    username: req.body.username, //case sensitive, must match with the sign up form in index.ejs
                    password: req.body.password
                };
                //created a user --> insert with a function what to do after insert
                collection.insert(user, function (err, results) {
                    req.login(results.ops[0], function () {
                        res.redirect('/auth/profile'); //req.login is going to take us to auth/profile
                    });
                });
            });


            //pull the username and pswd of the post body of the request -- add into app.js bodyparser, to auto parse the body of whatever is coming into our request and set it up as a json object - operates as middleware; e. app.use when a req comes in, this piece of middleware looks and sees if the request goes to sth that is in the public directory, and if it does, it just sends it on - bodyparses does that too
        }); //what our form is posting to in order to create that user

    authRouter.route('/signIn')
        .post(passport.authenticate('local', {
                failureRedirect: '/' //if fails, go home
            }),
            function (req, res) {
                res.redirect('/auth/profile'); //if ok, go to profile
            });

    authRouter.route('/profile')
        .all(function (req, res, next) {
            if (!req.user) { //kick out the user of the session back to '/' if they are not logged in
                res.redirect('/'); //redirect off the response, not request
            }
            next();
        })
        .get(function (req, res) {
            res.json(req.user); //if all is okay, possport is going to append this user object to my request and then to decide what the user has the access to, what to show them/not to
        });
    return authRouter;
};

module.exports = router;

//the result - the new user is printout on the console is a json with name and password we inserted, req.body is being populated in json doc by bodyParser