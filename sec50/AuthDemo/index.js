const express = require('express');
const app = express();
const User = require('./models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');

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
app.use(session({ secret : 'notagoodsecret'}));

const requireLogin = (req, res, next) => {
    if(!req.session.user_id) {
        return res.redirect('/login')
    }
    next();
}
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
    req.session.user_id = user._id; // adding user id to session
    res.redirect('/')
})


app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', async(req, res) => {
    const {username, password} = req.body;
    
    if (validPassword) {
        req.session.user_id = user._id; // adding user id to session
        res.redirect('/secret')
    }
    else {
        res.send(" TRY AGAIN")
    }
})

app.post('/logout', (req, res) => {
    // req.session.user_id = null; // this is the minimum i need for authentication
    req.session.destroy(); // this destroys the whole session
    res.redirect('/login')
})

app.get('/secret', requireLogin, (req, res) => {
    res.render('secret')
})

app.get('/topsecret', requireLogin, (req, res) => {
    res.send('TOP SECRET!!!')
})
    

app.listen(3000, () => {
    console.log('Serving your app!')
})