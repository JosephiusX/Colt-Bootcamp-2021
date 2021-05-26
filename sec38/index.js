const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/movieApp', {useNewUrlParser: true, useUnifiedTopology: true}) // default mongo port, copy from  where to find mongodb locally / database (if it dosent exist one will be created)
.then(() => { // try
    console.log("MONGO CONNECTION OPEN!!!")
})
.catch(err => { // catch if error
    console.log("OH NO  MONGO ERROR !!!");
    console.log(err);
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/dog', (req, res) => {
    res.send('WOOF!')
})

app.listen(3000, () => {
    console.log('APP IS LISTENING ON PORT 3000!')
})

