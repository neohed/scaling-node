const http = require('http');
const dotenv = require("dotenv");
dotenv.config({path: '../.env'})
const port = process.env.DEFAULT_SERVER_PORT;
const path = '/'
const hostname = 'localhost'

const concurrentRequests = 10;
const durationMS = 10_000;

const getElapsedTime = (function(startTime) {
    return () => Date.now() - startTime
})(Date.now())

const options = {
    hostname,
    port,
    path,
    method: 'GET',
};

function makeRequest() {
    const req = http.request(options, res => {
        const {statusCode} = res;

        res.on('data', res => gotResponse(statusCode, res))
    });

    req.on('error', error => {
        console.error(error)
    })

    req.end()
}

function gotResponse(status, data) {
    const b = Buffer.from(data);
    const elapsed = getElapsedTime();

    console.log(`Status ${status} @ ${elapsed}ms, data: "${b.toString()}"`);

    if (elapsed < durationMS) {
        makeRequest()
    }
}

for (let i = 0; i < concurrentRequests; i++) {
    makeRequest()
}
