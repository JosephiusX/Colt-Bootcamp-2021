const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/farmStand', {useNewUrlParser: true, useUnifiedTopology: true}) // default mongo port, copy from  where to find mongodb locally / database (if it dosent exist one will be created)
.then(() => { // try
    console.log("MONGO CONNECTION OPEN!!!")
})
.catch(err => { // catch if error
    console.log("OH NO  MONGO ERROR !!!");
    console.log(err);
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/products', async (req, res) => { // rought
    const products = await Product.find({})
    console.log(products)
    // res.send('ALL PRODUCTS WILL BE HERE')
    res.render('products/index', { products })

})

app.listen(3000, () => {
    console.log('APP IS LISTENING ON PORT 3000!')
})

