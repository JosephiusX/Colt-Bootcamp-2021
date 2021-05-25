const mongoose = require('mongoose'); // require mongoose after installing it on npm
mongoose.connect('mongodb://localhost:27017/shopApp', {useNewUrlParser: true, useUnifiedTopology: true}) // default mongo port, copy from  where to find mongodb locally / database (if it dosent exist one will be created)
.then(() => { // try
    console.log("CONNECTION OPEN!!!")
})
.catch(err => { // catch if error
    console.log("OH NO ERROR !!!");
    console.log(err);
})

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

const Product = mongoose.model('Product',productSchema);

const bike = new Product({ name: 'Mountain Bike', price: 999, color: 'red' })
bike.save()
    .then(data => {
        console.log("IT WORKED")
        console.log(data);
    })
    .catch(err => {
        console.log("OH NO ERROR!")
        console.log(err);
    })