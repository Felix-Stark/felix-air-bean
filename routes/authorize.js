const { Router } = require('express')
const keyRouter = Router();

const apiKeys = [
    'kj234kj23409',
    '309dsalkj020',
    'lkdf9j1jkj12',
    '13klj2348uhj'
];

function auth(request, response, next) {
    console.log('--I middleware--');
    console.log(`Middleware: ${req.url}`);
    console.log(`API key: ${JSON.stringify(req.headers['api-key'])}`);
    const apiKey = request.headers('api-key');
    if (apiKey && generateKeys.includes[apiKey]) {
        next();
    } else {
            const resObj = {
                error: 'Access denied, gotta get that key!'
            }
            response.json(resObj);
        }
}

keyRouter.get('/api/key', (request, response) => {
    const index = Math.floor(Math.random() * apiKeys.length);
    const apiKey = apiKeys[index];
    const resObj = {
        key: apiKey
    };
    response.json(resObj);

})

module.exports = { keyRouter, auth }