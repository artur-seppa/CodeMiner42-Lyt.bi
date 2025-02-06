const { createShortUrl } = require('../service/createShortUrl');

class UrlController {
    constructor(urlDatabase) {
        this.urlDatabase = urlDatabase;
    }

    handleCreateShortUrl(req, res) {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const { url: originalUrl } = JSON.parse(body);
                const response = createShortUrl(originalUrl, this.urlDatabase);

                if (response.status === 'error') {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: response.message }));
                } else {
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({
                        shortUrl: response.shortUrl,
                        originalUrl: response.originalUrl
                    }));
                }

            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: error.message }));
            }
        });
    }

}

module.exports = { UrlController };