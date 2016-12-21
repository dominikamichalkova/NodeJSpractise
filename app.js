//node init on cmd-> setup npm for our project, atutomatically creates package.json with the meta about the project, keeping track about all te dependencies, packages installed for our app
//npm install express --save -> it saves it to package.json


//on package.json file --> to run app without telling which file to run, standard way to execute app, now a scripts ,start' associated with this file which is associated with npm that says start is node app.js -> on cmd just execute ,npm start'

var express = require('express'); //reference to express, does not give the ability to do anything
//create an instance of express 
var app = express();

var port = 5000 //pass a port in, port that express listens on on our machine; in prod 80 or 443


//need to have a browser making a request to css, js files, but without setting up a separate routes for all of those, not to create app.get for all of the different static files -> set up a public static directory (incl. all the css, img files) and express server is going to serve that stuff up
app.use(express.static('public')); //.use by Express is executed first before it does anything else, set up a static directory = public, first look into public for a static file, run -> http://localhost:5000/css/styles.css
app.use(express.static('src/views')); //look for html


// '/' slash is a home route localhost:5000 (root) will execute this; express is going to pass this function 2 arg, request - info coming form te browser
//run localhost:5000 on browser, express is taking a req from the browser and sending sth back
app.get('/', function (req, res) {
    res.send('Hello');
});

//books subdirectory 
app.get('/books', function (req, res) {
    res.send('Books');
});

app.listen(5000, function (err) {
    console.log('running server on port ' + port); //express up and running and listening on port 
});