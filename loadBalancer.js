const http = require('http');
const httpProxy = require('http-proxy');
const consul = require('consul');

const routing = [
    {
        path: '/api',
        service: 'api-service',
        index: 0
    },
    {
        path: '/',
        service: 'webapp-service',
        index: 0
    },
]

const proxy = httpProxy.createProxyServer({});
