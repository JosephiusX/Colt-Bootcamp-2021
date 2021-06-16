const express = require('express');
const app = express();
const User = require('./models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb://localhost:27017/loginDemo', {useNewUrlParser: true, useUnifiedTopology: true}) // default mongo port, copy from  where to find mongodb locally / database (if it dosent exist one will be created)
    .then(() => { // try
        console.log("CONNECTION OPEN!!!")
    })
    .catch(err => { // catch if error
        console.log("OH NO ERROR !!!");
        console.log(err);
    })

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true })); // parsing url body

app.get('/' , (req, res) => {
    res.send('THIS IS THE HOME PAGE')
})

app.get('/register' , (req, res) => {
    res.render('register')
})

app.post('/register', async (req, res) => { // post, create a user
    const { password, username } = req.body;
    const hash = await bcrypt.hash(password, 12);
    const user = new User ({
        username,
        password: hash
    })
    await user.save();
    res.redirect('/')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', async(req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({ username })
    const validPassword = await bcrypt.compare(password, user.password)
    if (validPassword) {
        res.send('YAY WELCOME!!')
    }
    else {
        res.send(" TRY AGAIN")
    }
})

app.get('/secret', (req, res) => {
    res.send('THIS IS SECRET! YOU CANNOT SEE ME UNLESS YOU ARE LOGGED IN !!!')
})

app.listen(3000, () => {
    console.log('Serving your app!')
})