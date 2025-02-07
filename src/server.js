const http = require('http');
const { UrlController } = require('./controller/urlController');

const PORT = process.env.PORT || 3000;
const urlDatabase = {};
const urlController = new UrlController(urlDatabase);

const server = http.createServer((req, res) => {
    const { method, url } = req;

    if (method === 'POST') {
        return urlController.handleCreateShortUrl(req, res);
    }

    if (method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'GET' }));
        return;
    }

    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhosts:${PORT}`);
});

module.exports = { server, urlDatabase };
