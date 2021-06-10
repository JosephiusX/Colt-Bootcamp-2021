const express = require('express');
const app = express();
const morgan = require('morgan');

const AppError = require('./AppError');

// app.use allows us to run code on every single request 
app.use(morgan('tiny')) 

app.use((req, res, next) => {
    req.requestTime = Date.now();
    console.log(req.method, req.path); // logging the method type (GET), req.path displays the path
    next();
})

app.use('/dogs', (req, res, next) => {
    console.log("I Love Dogs!!")
    next();
})

const verifyPassword = (req, res, next) => {
    const { password } = req.query;
    if (password === 'chickennugget') {
        next();
    }
    // res.send('password needed)
    // res.status(401)
    throw new AppError('Password required!', 401);
}

app.get('/', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`)
    res.send('HOME PAGE!')
})

app.get('/dogs', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`)
    res.send('WOOF WOOF!')
})

app.get('/secret', verifyPassword, (req, res) => {
    res.send('MY SECRET IS: Sometimes I wear headphones in public so I dont have to talk to anyone')
})

app.get('/error', (req, res) => { // route set up to cause error
    chicken.fly()
})

app.use((req, res) => {
    res.status(404).send('NOT FOUND!')
})

app.use((err, req, res, next) => { // Error handling middleware
   
})

app.listen(3000, () => {
    console.log('App is running on localhost:3000')
})