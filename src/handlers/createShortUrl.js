const { encodeBase62 } = require('../utils/base62');
const { isValidUrl } = require('../utils/isValidUrl');

function createShortUrl(req, res, urlDatabase) {
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        try {
            const { url: originalUrl } = JSON.parse(body);

            if (!originalUrl || !isValidUrl(originalUrl)) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'invalid URL' }));
            }

            const currentTimestamp = Date.now();
            const shortCode = encodeBase62(currentTimestamp + originalUrl.length);
            
            urlDatabase[shortCode] = {
                originalUrl,
                createdAt: new Date(),
                visits: 0
            };

            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ 
                shortUrl: `http://localhost:3000/${shortCode}`,
                originalUrl 
            }));

        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'internal server error' }));
        }
    });
}

module.exports = { createShortUrl };