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
        required: true,
        maxlength: 20 // constraint for string
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price must be positive!'] // here the first is the default and the second is the message
    },
    onSale: {
        type: Boolean,
        default: false
    },
    categories: [String],
    qty: {
        online: {
            type: Number,
            default: 0
        },
        instore: {
            type: Number,
            default: 0
        }
    },
    size: {
        type: String,
        enum: ['S', 'M', 'L']
    }
})

const Product = mongoose.model('Product',productSchema);

const bike = new Product({ name: 'Cycling Jersey', price:28.50, categories: ['Cycling'], size: 'XS' })
bike.save()
    .then(data => {
        console.log("IT WORKED")
        console.log(data);
    })
    .catch(err => {
        console.log("OH NO ERROR!")
        console.log(err);
    })

// Product.findOneAndUpdate({ name: 'Tire Pump'}, {price: 9.99}, {new:true, runValidators: true})
//     .then(data => {
//         console.log("IT WORKED")
//         console.log(data);
//     })
//     .catch(err => {
//         console.log("OH NO ERROR!")
//         console.log(err);
//     })