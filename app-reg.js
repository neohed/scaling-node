const http = require('http');
const pid = process.pid;
const consul = require('consul');
const portfinder = require('portfinder')
const serviceType = process.argv[2];

portfinder.getPort((err, port) => {
    const serviceId = serviceType + port;
    consul.agent.service.register({
        port,
        id: serviceId,
        name: serviceType,
        address: 'localhost',
        tags: [serviceType]
    }, () => {
        const unRegisterService = (err) => {
            consul.agent.service.deregister(serviceId, () => {
                process.exit(err ? 1 : 0)
            })
        }

        process.on('exit', unRegisterService);
        process.on('SIGINT', unRegisterService);
        process.on('uncaughtException', unRegisterService);

        http.createServer((req, res) => {
            for (let i = 1e7; i > 0; i--) {}
            console.log(`Handling request from ${pid}`);

            res.end(`${serviceType} response from ${pid}`)
        }).listen(port, () => {
            console.log(`Started ${serviceType} (${pid}) on port ${port}`)
        })
    })
})
