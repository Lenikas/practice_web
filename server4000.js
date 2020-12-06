const http = require('http');
const fs = require('fs');
const url = require('url');
const server = new http.Server();
server.listen(4200, '127.0.0.1');

server.on('request', function (req, res) {
    const urlParsed = url.parse(req.url, true);

    console.log(urlParsed);
    console.log(req.headers);

    const cb_name= urlParsed.query["callback"];
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Headers", "Origin,Content-Type, X-Auth-Token, Authorization");

    if (urlParsed.pathname === '/customer/13') {
        const result = {"Name": "Adam", "Id" : 13};
        res.end(`${cb_name}(${JSON.stringify(result)})`)
    }

    if (urlParsed.pathname === '/customer/another') {
        const result = {"Name": "Bob", "Id" : 123};
        res.end(`${cb_name}(${JSON.stringify(result)})`)
    }

});