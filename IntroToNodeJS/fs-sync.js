var fs = require('fs');

// synch approach, each func is executed one after the other, no callbacks
//each of the sync functions has the word Sync in the name at the end
if (fs.existsSync('temp')) {
    console.log('Directory exists, removing ...');
    if (fs.existsSync('temp/new.txt')) { //check if new.txt is there
        fs.unlinkSync('temp/new.txt'); //if yes, we remove it and then remove /temp/
    }

    fs.rmdirSync('temp');
}

fs.mkdirSync('temp'); //make temp/
if (fs.existsSync('temp')) { //check if it really exists
    process.chdir('temp'); //we change into temp/ and create file test and pass in the string

    setTimeout(function () {

        console.log('Creating new file inside temp/...');



        fs.writeFileSync('test.txt', 'This is some test text for the file');
        fs.renameSync('test.txt', 'new.txt'); //rename the file
        console.log('File has size: ' + fs.statSync('new.txt').size + 'bytes');
        console.log('File contents: ' + fs.readFileSync('new.txt').toString());
    }, 2000);
}

//when we read the file from disc we take te value that is returned by the readFileSync() and we call a .toString() on it - what we are getting back is not a string by default, but we are calling toString() on th instance of the buffer object to get a string value to print out

var b = new Buffer('Hello'); //instantiate new b 

console.log(b.toString()); //if we want to see it just like we see it i out fs we convert it to string
console.log(b.toString('base64')); //diff encoding
var v = new Buffer('World').toString('base64'); //chaining
console.log(b.toString('utf-8', 0, 2)); //call out certain subsection of a buffer, pull out first 2 characters and print them out