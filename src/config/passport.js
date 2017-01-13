var passport = require('passport');

module.exports = function (app) {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function (user, done) { //userobject and a callback, store it in the session
        done(null, user);
    });

    passport.deserializeUser(function (user, done) { //takes whatever was store in the session to pull it bak out
        done(null, user);
    });

    require('./strategies/local.strategy')();
};