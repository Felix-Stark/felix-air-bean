// const { Router } = require('express');
// const { addMenuItem, removeMenuItem } = require('../database/nedb');


// const admin = Router();

// // const apiKeys = [
// //     'kj234kj23409',
// //     '309dsalkj020',
// //     'lkdf9j1jkj12',
// //     '13klj2348uhj'
// // ];

// // function auth(request, response, next) {
// //     const apiKey = request.headers['api-key']
// //     if (apiKey && apiKeys.includes(apiKey)) {
// //         next();
// //     } else {
// //         const resObj = {
// //             error: 'Unvalid key'
// //         }
// //         response.json(resObj)
// //     }
// // }

// // admin.get('/api/admin/key', (request, response) => {
// //     const index = Math.floor(Math.random() * apiKeys.length);
// //     const apiKey = apiKeys[index];
// //     const resObj = {
// //         key: apiKey
// //     }

// //     response.json(resObj);
// // })

// admin.post('/api/admin/addItem', auth, (request, response) => {
//     const credentials = request.body;
//     if (credentials.hasOwnProperty("id") && credentials.hasOwnProperty("title") && credentials.hasOwnProperty("desc") && credentials.hasOwnProperty("price")) {
//         const newItem = addMenuItem(credentials)
//         const resObj = {
//             success: true,
//             newItem: newItem
//         }

//         response.json(resObj)
//     } else {
//         const resObj = {
//             success: false,
//             message: 'Invalid body, should contain id, title, desc, price'
//         }

//         response.status(400).json(resObj);
//     }
// })

// admin.delete('/api/admin/:id', auth, (request, response) => {
//     const id = request.params.id;
//     console.log(id)
    
//     const menu = removeMenuItem(id)

//     if (menu == false) {
//         const resObj = {
//             success: true,
//             menu: menu,
//             message: `Item with ID: ${id} was deleted`
//         }
//         console.log(menu)
        
//         response.json(resObj)
//     } else {
//         const resObj = {
//             success: false,
//             menu: menu,
//             message: 'ID does not exist.'
//         }
//         response.json(resObj)
//     }
    

// })

// module.exports = admin;
