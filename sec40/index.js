const express = require('express');
const app = express();
const morgan = require('morgan');

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

// app.use((req, res, next) => {
//     console.log("THIS IS MY FIRST MIDDLEWHERE!!!")
//     next();
//     console.log('THIS IS MY FIRST MIDDLEWHARE - AFTER CALLING NEXT()')
// })

// app.use((req, res, next) => {
//     console.log("THIS IS MY SECOND MIDDLEWHERE!!!")
//     next();
// })

// app.use((req, res, next) => {
//     console.log("THIS IS MY THIRD MIDDLEWHERE!!!")
//     next();
// })


app.get('/', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`)
    res.send('HOME PAGE!')
})

app.get('/dogs', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`)
    res.send('WOOF WOOF!')
})

app.use((req, res) => {
    res.status(404).send('NOT FOUND!')
})

app.listen(3000, () => {
    console.log('App is running on localhost:3000')
})