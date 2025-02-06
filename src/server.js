const http = require('http');
const { parse } = require('url');
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
        const queryParams = parse(req.url, true).query;
        const shortCode = queryParams.code;

        return urlController.handleRedirect(req, res, shortCode);

        // res.writeHead(200, { 'Content-Type': 'application/json' });
        // res.end(JSON.stringify({ message: 'GET' }));
        // return;
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