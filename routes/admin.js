const { Router } = require('express');
const { addMenuItem, removeMenuItem } = require('../database/nedb');
const auth = require('./authorize')

const admin = Router();

admin.post('/addItem', async (request, response) => {
    const credentials = request.body;
    if (credentials.hasOwnProperty("id") && credentials.hasOwnProperty("title") && credentials.hasOwnProperty("desc") && credentials.hasOwnProperty("price")) {
        const newItem = await addMenuItem(credentials)
        const resObj = {
            success: true,
            newItem: newItem
        }

        response.json(resObj)
    } else {
        const resObj = {
            success: false,
            message: 'Invalid body, should contain id, title, desc, price'
        }

        response.status(400).json(resObj);
    }
})

admin.delete('/:id', async (request, response) => {
    const id = request.params.id;
    console.log(id)
    
    const menu = await removeMenuItem(id)

    if (menu == true) {
        const resObj = {
            success: true,
            menu: menu,
            message: `Item with ID: ${id} was deleted`
        }
        console.log(menu)
        
        response.json(resObj)
    } else {
        const resObj = {
            success: false,
            menu: menu,
            message: 'ID does not exist.'
        }
        response.json(resObj)
    }
    

})

module.exports = admin;
