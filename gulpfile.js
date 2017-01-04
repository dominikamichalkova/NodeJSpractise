var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');

var jsFiles = ['*.js', 'src/**/*.js']; //location of our js files

//to be able to do sth, we need to create task
//run gulp style
gulp.task('style', function () {
    return gulp.src(jsFiles)
        .pipe(jshint()) //piping out to jshint reporter
        .pipe(jshint.reporter('jshint-stylish', {
            verbose: true
        })) //look of reporter
        .pipe(jscs());
});

//inject=name, run gulp inject
gulp.task('inject', function () {
    //inject references to package dependencies bower:css,js
    var wiredep = require('wiredep').stream;
    var inject = require('gulp-inject');
    //inject our files - personal dependencies inject:css,js
    var injectSrc = gulp.src(['./public/css/*.css', './public/js/*.js'], {
        read: false
    }); //no need to read the file, just the names

    var injectOptions = {
        ignorePath: './public'
    };

    //automatically inject the css, dependencies files that are in the public location, without each of them to insert separe
    //wiredep look for dependencies in bower.json, need to clarify the path to this file
    //remove public path from the result print
    //run ,gulp inject' every time we change sth in the files
    var options = {
        bowerJson: require('./bower.json'), //return json object 
        directory: './public/lib',
        ignorePath: '../../public'
    };

    return gulp.src('./src/views/*.jade')
        .pipe(wiredep(options))
        .pipe(inject(injectSrc, injectOptions))
        .pipe(gulp.dest('./src/views'));
});

//nodemon, auto restat our app, run gulp serve
gulp.task('serve', ['style', 'inject'], function () {
    var options = {
        script: 'app.js', //what is going to run
        delayTime: 1,
        env: {
            'PORT': 3000 //other stuff like DB connetion string that might change in every enviro
        },
        watch: jsFiles //if anything changes in jsFiles then Lrestart server
    };

    return nodemon(options)
        .on('restart', function (ev) {
            console.log('Restarting ....');
        });
}); //array of tasks to run asynchron