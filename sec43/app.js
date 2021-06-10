const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate'); // require after npm install
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError')
const methodOverride = require('method-override');
const Campground = require('./models/campground');
const { isBuffer } = require('util');

// mongoose.set('useFindAndModify', false);

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

app.get('/', (req, res) => {
    res.render('home')
});

app.get('/campgrounds', async (req, res) => {
   const campgrounds = await Campground.find({})
   res.render('campgrounds/index', { campgrounds})
});

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
});

app.post('/campgrounds', catchAsync(async (req, res, next) => {
        if(!req.body.campground) throw new ExpressError('Invalid Campground Data', 400);
        const campground = new Campground(req.body.campground);
        await campground.save();
        res.redirect(`/campgrounds/${campground._id}`)
}));

app.get('/campgrounds/:id', catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/show', { campground });
}));

app.get('/campgrounds/:id/edit', catchAsync(async(req, res) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/edit', { campground });
}));

app.put('/campgrounds/:id',catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    res.redirect(`/campgrounds/${campground._id}`)
}));

app.delete('/campgrounds/:id', catchAsync(async (req, res) => {
    const { id } = req.params; // destructure,  finds id's value and assigns it to id for use here
    await Campground.findByIdAndDelete(id); // find campground by id and delete
    res.redirect('/campgrounds'); // redirect back to campground

}));

app.all('*', (req, res, next) =>{ // every request, will only run if nothing else is matched first , thus is best at the end 
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => { // basic error route
    const {statusCode = 500, message = 'something went wrong'} = err;
    if(!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err })
});


app.listen(3000, () => {
    console.log('Serving on port 3000')
});