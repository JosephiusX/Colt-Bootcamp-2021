const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate'); // require after npm install
const ExpressError = require('./utils/ExpressError')
const methodOverride = require('method-override');


const campgrounds = require('./routes/campgrounds');
const reviews = require('./routes/reviews');


mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    userNewUrlParser: true,
    userCreateIndx: true,
    useUnifiedTopology: true
}); 

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const app  = express();

app.engine('ejs', ejsMate); // tell express to use ejsMate
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use('/campgrounds', campgrounds)
app.use('/campgrounds/:id/reviews', reviews)

app.get('/', (req, res) => {
    res.render('home')
});

app.all('*', (req, res, next) =>{ // every request, will only run if nothing else is matched first , thus is best at the end 
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => { // basic error route
    const {statusCode = 500, message = 'something went wrong'} = err;
    if(!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err })
})


app.listen(3000, () => {
    console.log('Serving on port 3000')
});