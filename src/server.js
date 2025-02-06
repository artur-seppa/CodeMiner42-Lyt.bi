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
        const shortCode = req.url.split('/')[1] || '';

        return urlController.handleRedirect(req, res, shortCode);
    }

    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
});

if (process.env.NODE_ENV !== 'test') {
    server.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

module.exports = { server, urlDatabase };

//     server.listen(PORT, () => {
//         console.log(`Server running at http://localhosts:${PORT}`);
//     });

// module.exports = { server };