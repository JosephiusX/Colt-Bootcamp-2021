const mongoose = require('mongoose'); // require mongoose after installing it on npm
mongoose.connect('mongodb://localhost:27017/movieApp', {useNewUrlParser: true, useUnifiedTopology: true}) // default mongo port, copy from  where to find mongodb locally / database (if it dosent exist one will be created)
.then(() => { // try
    console.log("CONNECTION OPEN!!!")
})
.catch(err => { // catch if error
    console.log("OH NO ERROR !!!");
    console.log(err);
})

// Our first mongoose model

// schemas
const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String
})

// take the schema and tell mongoose to make a model using the schema
const Movie = mongoose.model('Movie', movieSchema); // pass in name of model and the schema, Movie createw a collection 'movies' in mongoose , save it to a variable and save it to a variable Movie
// const amadeus = new Movie ({title: 'Amadeus', year: 1986, score: 9.2, rating: 'R'}) // this is our js object that we can change and save to the db
// as of this point nothing has been created in my mongodb movies database until we open the file with node and save it

const blah = new Movie(); // normally
blah.save()

Movie.insertMany([ // with this we dont need to call a save method
    {title: 'Amelie', year: 2001, score: 8.3, rating: 'R'},
    {title: 'Alien', year: 1979, score: 8.1, rating: 'R'},
    {title: 'The Iron Giant', year: 1999, score: 7.5, rating: 'PG'},
    {title: 'Stand By Me', year:1986, score: 8.6, rating: 'R'},
    {title: 'Moonrise Kingdom', year: 2012, score: 7.3, rating: 'PG-13'}
])
.then(data => {
    console.log('It WORKED!')
    console.log(data);
})