const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req.method);
    res.writeHead(200, {'content-type': 'text/plain'});
    res.end('Método recebido: ${req.method}');
});

server.listen(3000, () => {
    console.log('http://localhost:3000');
});