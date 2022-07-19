const http = require('http');
const {fakeDelayRequestListener} = require('./lib/middleware');
const {port, pid} = require('./lib/environment-vars');

http.createServer(
    fakeDelayRequestListener(pid)
).listen(port, () => {
    console.log(`Started ${pid} listening on http://localhost:${port}`)
})

setTimeout(() => {
    throw new Error('Kaboom')
}, Math.ceil(Math.random() * 3) * 1000)
