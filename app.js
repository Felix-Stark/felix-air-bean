const express = require('express');
const app = express();
const {menuResult, checkAccount, createAccount, loginAccount, createOrder, findOrders, checkMenuItem, addMenuItem, removeMenuItem} = require('./database/nedb')
// const admin = require('./routes/admin');
// const { auth } = require('./modules/authorize')



const PORT = 8000
app.use(express.json());
// app.use(auth);
// app.use(admin);

const apiKeys = [
    'kj234kj23409',
    '309dsalkj020',
    'lkdf9j1jkj12',
    '13klj2348uhj'
];

function auth(request, response, next) {
    const apiKey = request.headers['api-key']
    if (apiKey && apiKeys.includes(apiKey)) {
        next();
    } else {
        const resObj = {
            error: 'Unvalid key'
        }
        response.json(resObj)
    }
}

app.get('/api/admin/key', (request, response) => {
    const index = Math.floor(Math.random() * apiKeys.length);
    const apiKey = apiKeys[index];
    const resObj = {
        key: apiKey
    }

    response.json(resObj);
})

app.post('/api/admin/addItem', auth, async(request, response) => {
    const credentials = request.body;
    
    
    if (credentials.hasOwnProperty("id") && credentials.hasOwnProperty("title") && credentials.hasOwnProperty("desc") && credentials.hasOwnProperty("price")) {
        let idCheck = await checkMenuItem(credentials);
        console.log(idCheck)
        if (idCheck < 1) {
            const newItem = addMenuItem(credentials)
            console.log('new item', newItem)
            const resObj = {
                success: true,
                newItem: newItem
            }
            console.log('i if empty')

            response.json(resObj)

        } else {
                const resObj = {
                    success: false,
                    message: 'Id already exist'
                }
                console.log('i if not empty')
                response.json(resObj)
            }
            
    } else {
        const resObj = {
            success: false,
            message: 'Invalid body'
        }

        response.status(400).json(resObj);
    }
})

app.delete('/api/admin/:id', auth, async (request, response) => {
    const id = request.params.id;

    const menu = await removeMenuItem(id)

    if (menu == true) {
        const resObj = {
            success: true,
            menu: menu,
            message: `Item with ID: ${id} was deleted`
        }
        
        response.json(resObj)
    } else {
        const resObj = {
            success: false,
            message: 'ID does not exist.'
        }
        response.json(resObj)
    }
})


// /api/order	POST	Sparar en kaffebeställning för en användare och returnerar en ETA-tid och ordernummer 
// (båda dessa kan slumpas) till frontend. Om ett användarnamn skickas med i beställningen ska ordern kopplas till 
// detta användarnamn i databasen. Ifall inget användarnamn skickas med så ska beställningen sparas som gäst.

// UTFORMNING AV FRONTEND REQUEST {"username": "", "password": "", "cart": {[ {ITEM}, {ITEM} ]}

app.post('/api/order', (request, response)=> {
    const credentials = request.body
    if (credentials.hasOwnProperty('cart')){
        const resObj = {}
        if (credentials.hasOwnProperty('username')) {
                const result = checkAccount(credentials)
                if (result.length > 0) {
                    const orderResults = createOrder(credentials);
                   resObj.order= orderResults
                   addPrices(orderResults)
                   resObj.order.ordernumber= orderResults._id
                } else {
                    resObj.message = "Account does not exist!"
                }
            response.json(resObj)
        } else {
            credentials.username = "guest";
            const orderResults = createOrder(credentials);
            addPrices(orderResults)
            resObj.order= orderResults
            resObj.order.ordernumber= orderResults._id
            response.json(resObj)
        }
    }
})
function addPrices(orderResults){
    orderResults.totalPrice= 0
    const orderResultsOrder = orderResults.order
    for (let i = 0; i < orderResultsOrder.length; i++) {
        const singleItem = orderResultsOrder[i];
        orderResults.totalPrice = parseInt( orderResults.totalPrice + singleItem.price) ;
    }
}

// /api/order/:id	GET	Returnerar orderhistorik för en specifik användare
// skicka med en jämförelse i returneringen om en är klar
app.get('/api/order/:id', (request, response)=> {

        const username = request.params.id;
        const findOrder = findOrders(username)
        for (let i = 0; i < findOrder.length; i++) {
            const singleOrder = findOrder[i];
            checkIfDone(singleOrder);
        }
        response.json(findOrder);
})

function checkIfDone(singleOrder) {
    const rightNow = new Date().toLocaleString()
    singleOrder.totalPrice = 0;
    if (singleOrder.ETA > rightNow ) {
     singleOrder.done = "done";
    }
    const singleOrderCart = singleOrder.order;
     for (let i = 0; i < singleOrderCart.length; i++) {
         const singleItem = singleOrderCart[i];
         singleOrder.totalPrice = parseInt( singleOrder.totalPrice + singleItem.price) ;
    }
}

// /api/menu	GET	Returnerar en kaffemeny
app.get('/api/menu', (request, response)=> {
    const menuResults = menuResult();
    const resObj = {menu: menuResults};
    response.json(resObj);
})

// /api/account/signup	POST	Skapar ett användarkonto

//   UTFORMNING AV SIGNUP FRONTEND  {"email" : "", "username": "", "password": ""}
app.post('/api/account/signup', (request, response)=> {
    const credentials = request.body
    const resObj = {};
    if (credentials.hasOwnProperty('email') && credentials.hasOwnProperty('username') && credentials.hasOwnProperty('password')) {
        const result = checkAccount(credentials);
        if (result.length < 1) {
            const result = createAccount(credentials)
            resObj.message = "success";
            resObj.account = result;
        } else {
            resObj.message = "Account already exists";
        }
    } else {
        resObj.message = "No valid credentials " ;
    }
    response.json(resObj);
})


// /api/account/login	POST	Logga in

//   UTFORMNING AV LOGIN FRONTEND  {"username": "", "password": ""}


app.post('/api/account/login', (request, response)=> {
    const credentials = request.body;
    const resObj = {};
    if (credentials.hasOwnProperty('username') && credentials.hasOwnProperty('password')) {
        const result = loginAccount(credentials);
        if (result.length > 0) {
            resObj.message = "Account successfully logged in!";
        } else  resObj.message = "Wrong username/password";
    } else {
        resObj.message = "No credentials BIFOGAT";
    }
    response.json(resObj);
})


app.listen(PORT, ()=>{
    console.log(`Server started at port: ${PORT}`);
    console.log("Listening to orders");
})
