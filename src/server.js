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

    const urlParams = req.url.split('/').filter(part => part !== '')
    const [shortCode, endpoint] = urlParams;

    if (method === 'GET') {
        switch (endpoint) {
            case 'visits':
                return urlController.handleRedirectToVisitsCounter(req, res, shortCode);
                break;

            case undefined:
                return urlController.handleRedirect(req, res, shortCode);
                break;
        }
    }

    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = { server, urlDatabase };