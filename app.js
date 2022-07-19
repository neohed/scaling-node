const http = require('http');
const dotenv = require("dotenv");
dotenv.config()
const port = process.env.DEFAULT_SERVER_PORT;

const pid = process.pid;

http.createServer((req, res) => {
    for (let i = 1e7; i > 0; i--) {}
    console.log(`Handling request from ${pid}`);

    res.end(`Hello from ${pid}`)
}).listen(port, () => {
    console.log(`Started ${pid} listening on http://localhost:${port}`)
})
