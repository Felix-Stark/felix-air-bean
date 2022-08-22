// const { Router } = require('express');
// const keyRouter = Router();

// const apiKeys = [
//     'kj234kj23409',
//     '309dsalkj020',
//     'lkdf9j1jkj12',
//     '13klj2348uhj'
// ];

// function auth(request, response, next) {
//     const apiKey = request.headers['api-key']
//     if (apiKey && apiKeys.includes(apiKey)) {
//         next();
//     } else {
//         const resObj = {
//             error: 'Unvalid key'
//         }
//         response.json(resObj)
//     }
// }

// keyRouter.get('/api/admin/key', (request, response) => {
//     const index = Math.floor(Math.random() * apiKeys.length);
//     const apiKey = apiKeys[index];
//     const resObj = {
//         key: apiKey
//     }

//     response.json(resObj);
// })

// module.exports = auth;