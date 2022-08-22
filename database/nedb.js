
const nedb =  require('nedb-promise')
const userDatabase = new nedb({filename: 'userdatabase.db', autoload:true})
const orderDatabase = new nedb({filename: 'orderdatabase.db', autoload:true})
const menuDatabase = new nedb({filename: 'menudatabase.db', autoload:true})


async function menuResult(){
    const result = await menuDatabase.find({})
    return result
}

async function checkMenuItem(credentials) {
    const idCheck = await menuDatabase.find({ id: credentials.id });   
    console.log('id check', typeof idCheck)
    console.log('id check length', idCheck.length)
    return idCheck;
}

async function addMenuItem(credentials) {
    const addItem = await menuDatabase.insert({ id: credentials.id, title: credentials.title, desc: credentials.desc, price: credentials.price })
    return addItem;
    
}

async function removeMenuItem(id) {
    const result = await menuDatabase.remove({ id: Number(id) })
    return result;
}

async function checkAccount(credentials){
    const result = await userDatabase.find({ $or: [ {email: credentials.email}, {username: credentials.username} ] })
    return result;
}

async function createAccount(credentials){
    const result = await userDatabase.insert({ email: credentials.email , username: credentials.username, password: credentials.password })
    return result;
}

async function loginAccount(credentials){
    const result = await userDatabase.find({$and: [{username: credentials.username}, {password: credentials.password}] })
    return result;
}
async function findOrders(credentials){
    const result = await orderDatabase.find({username: credentials })
    return result;

}

async function createOrder(credentials){
    const orderTime = new Date().toLocaleTimeString();
    const orderTimeTemp = new Date()
    const ETAnumber = Math.floor(Math.random() * 10)
    ETAminutes = new Date ( orderTimeTemp );
    ETAminutes.setMinutes ( orderTimeTemp.getMinutes() + ETAnumber );
    const toLocaleETA =ETAminutes.toLocaleTimeString()

    const result = await orderDatabase.insert({username: credentials.username, order: credentials.cart, orderTime: orderTime, ETA: toLocaleETA })
    return result;
}



module.exports = { menuResult, checkAccount, createAccount, loginAccount, createOrder, findOrders, checkMenuItem, addMenuItem, removeMenuItem }
