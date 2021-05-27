const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override')

const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/farmStand', {useNewUrlParser: true, useUnifiedTopology: true}) // default mongo port, copy from  where to find mongodb locally / database (if it dosent exist one will be created)
.then(() => { // try
    console.log("MONGO CONNECTION OPEN!!!")
})
.catch(err => { // catch if error
    console.log("OH NO  MONGO ERROR !!!");
    console.log(err);
})

//middlewhere
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewhere
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

app.get('/products', async (req, res) => { // rought
    const products = await Product.find({})
    res.render('products/index', { products })
})

app.get('/products/new', (req, res) => {
    res.render('products/new')
})

app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body)
    await newProduct.save()
    console.log(newProduct)
    res.redirect(`/products/${newProduct._id}`)
})

app.get('/products/:id', async (req, res) => {
    const { id } =  req.params;
    const product = await Product.findById(id)
    res.render('products/show', { product })
})

app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    res.render('products/edit', { product })
})

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/products/${product._id}`)
})

app.listen(3000, () => {
    console.log('APP IS LISTENING ON PORT 3000!')
})

