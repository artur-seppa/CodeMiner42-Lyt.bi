function redirectToOriginalUrl(shortCode, urlDatabase) {
    try {
        const urlEntry = urlDatabase[shortCode];

        if (!urlEntry) {
            return {
                status: 'error',
                message: 'Short URL not found'
            };
        } else {
            return {
                status: 'success',
                redirect: urlEntry.originalUrl
            };
        }
    } catch (error) {
        throw new Error('Internal server error');
    }
}

module.exports = { redirectToOriginalUrl };