// service/createShortUrl.js
const { encodeBase62 } = require('../utils/base62');
const { isValidUrl } = require('../utils/isValidUrl');

function createShortUrl(originalUrl, urlDatabase) {

    try {
        if (!originalUrl || !isValidUrl(originalUrl)) {
            return {
                status: 'error',
                message: 'invalid URL'
            };
        }
        
        const shortCode = encodeBase62(Object.keys(urlDatabase).length + Date.now() + originalUrl.length);

        urlDatabase[shortCode] = {
            originalUrl,
            createdAt: new Date(),
            visits: 0
        };

        return {
            status: 'success',
            shortCode,
            shortUrl: `http://localhost:3000/${shortCode}`,
            originalUrl
        };

    } catch (error) {
        throw new Error('Internal server error');
    }
}

module.exports = { createShortUrl };