var cluster = require('cluster');
var http = require('http');
var numWorkers = 2;

if (cluster.isMaster) {
    // Fork workers.
    for (var i = 0; i < numWorkers; i++) {
        console.log('master: about to fork a worker');
        cluster.fork();
    }

    cluster.on('fork', function (worker) {
        console.log('master: fork event (worker ' + worker.id + ')');
    });

    cluster.on('online', function (worker) {
        console.log('master: online event (worker ' + worker.id + ')');
    });

    cluster.on('listening', function (worker, address) {
        console.log('master: listening event (worker ' + worker.id + ', pid ' + worker.process.pid + ', ' + address.address + ':' + address.port + ')');
    });

    cluster.on('exit', function (worker, code, signal) {
        console.log('master: exit event (worker ' + worker.id + ')');
    });

} else {

    console.log('worker: worker #' + cluster.worker.id + ' ready!');

    var count = 0;

    // Workers can share any TCP connection
    // In this case its a HTTP server
    http.createServer(function (req, res) {
        res.writeHead(200);
        count++;
        console.log("Worker #" + cluster.worker.id + " is incrementing count to " + count);
        res.end("hello world from worker #" + cluster.worker.id + " (pid " + cluster.worker.process.pid + ") with count = " + count + "\n");
        if (count === 3) {
            cluster.worker.destroy();
        }
    }).listen(8080, process.env.IP); //process.env.PORT

    // Use process.env.PORT and process.env.IP for cloud9
    // replace with your own port and (optionally) IP as required

}


// We'll begin by requiring the cluster module, as well as requiring the HTTP module because what we're going to be building is a clustered web server. And we've defined a variable here called numWorkers equals 2. This is how many worker processes we're going to spawn. Now, if you remember from the slides, I mentioned the isMaster variable and being able to structure your application by having a large if statement around the bulk of your code, and that's what we've done here. So, if this code is running on the master, it will execute this code. However, if it's not, it will execute this code which means that's running on a worker process. So, when you're setting up a cluster, there are ways that you can configure it to run an entirely separate Node.js file for the worker processes. But for a simple example like this, it's easier just to keep it all in one file. So what we're going to do in the master is iterate over a for loop for the number of workers and fork that many worker processes. And we'll also log something to the console as well. Now everything else in the master is listening for events that happen on the worker processes. So here we're listening for the fork event and we will log that to the console. And if you'll notice when the fork event is omitted, it's passed a reference to the worker that omitted that event. And the same is true here with online, the online event were passed to worker and we'll log that to the console. And then the listening event, the same way, although we've logged a little bit of extra information here. So, we've also logged the process ID which is available at worker.process.pid, and the address and port that the listening process is listening on. And then finally, when a worker process terminates, it will emit the exit event. And so, we are listening for that as well and logging that data to the console. So that's what the master process will be doing. Let's scroll down and see what the child process will do. So the child process first thing will log to the console that it is ready. And we've established the count here and set it to zero. We'll get to that in just a minute. So here in the worker, this is a typical HTTP CreateServer function just like we studied in a prior module. And we're writing out an okay status code, and then we're sending back to the client, "hello world from worker" and then we'll put the worker number, the process ID and the count. And what the count is is that each time the server fulfills a request, we're incrementing the count. And then, once this particular worker has served three requests, it's going to destroy itself. And this will be one way we can make sure that the operating system is taking care of routing the requests to unavailable worker. And we'll see that play out in just a minute. And then with-- for the server that's returned, we're chaining the listen and using our Cloud 9 process, ENV, PORT and IP parameters, and that's really about it. So the worker is establishing a server, answering up to three requests and then, terminating itself. So before we run this, one of the things you'll want to be sure of is that you're running in Node.js 0.8 and not 0.6. So, if you come over here to the run and debug side bar, and be sure to choose Node 0.8. Let's run this code. So we had a fair amount printed to the output. Let's take a look at that first. So if you'll remember in our for loop as we were forking each worker process, we logged this to the console. So this was logged twice, once for each worker. And then after that, the master began receiving events, the fork event from the first worker, and then the second worker. And next, the online event from the worker number one and then number two. And then, in our worker code, we were explicitly printing to the console worker and then the number ready. So we printed that, and then the master received the listening event for the first worker, and then, the listening event for the second worker. Now we printed a little bit of extra information here just to really drive home the point that these are two different processes at the operating system level, 76 and 77. But they are both listening on the same IP and port number. At this point, it's up to the operating system to decide which process to route each request to. So let's invoke a few requests against this web server and see what we get. An easy way to execute discrete requests against the web server is using the cURL command line tool. And that's what we're going to do here. CURL available for Linux, Mac and even Windows. And the simplest use is the word cURL and the address you would like to request. So we're going to do that here against our running web server in Cloud 9. So let's run that. So here you can see that the output from the web server is hello world from worker number 2 pid and then the number and then the count. So what this tells us is that worker number 2 answered this request and it was his first request. If you remember, each worker will only answer three requests before terminating itself. So let's make another request. Okay, this was still worker number 2 and it was his second request. And worker number 2 a third time with his third request. And if you look at the output, you'll notice that as we answer each request, we were incrementing the count and logging that to the console. And then, after the third request, the master received the exit event from the worker. Let's keep making requests for this web server. Now you'll notice worker number 1 has taken over handling request with a count of 1, 2, and 3. And now if we go back to the output, you'll see the three requests handled by worker number 1 and now he has exited as well. This is a really good example of seeing how you can spot multiple Node processes to do the same work and actually share server handles between worker processes.