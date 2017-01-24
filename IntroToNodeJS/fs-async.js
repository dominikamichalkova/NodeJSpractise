var fs = require('fs');

//async version -> christmas tree problem

if (fs.existsSync('temp')) {
    console.log('Directory exists, removing ...');
    if (fs.existsSync('temp/new.txt')) {
        fs.unlinkSync('temp/new.txt');
    }

    fs.rmdirSync('temp');
}
//each one of these ()'s is built on the one prior by being implemented in the prior ()'s callback
fs.mkdir('temp', function (err) { //make /temp/ and in callback we call exists and in its callback we get if it is T or F..
    fs.exists('temp', function (exists) {
        if (exists) {
            process.chdir('temp');
            setTimeout(function () {

                console.log('Creating new file inside temp/...');



                fs.writeFile('test.txt', 'this is some test text for the file', function (err) {
                    fs.rename('test.txt', 'new.txt', function (err) {
                        fs.stat('new.txt', function (err, stats) {
                            console.log('file has size: ' + stats.size + 'bytes');
                            fs.readFile('new.txt', function (err, data) {
                                console.log('File contents: ' + data.toString());
                            });
                        });
                    });
                });
            }, 2000);
        }
    });
});