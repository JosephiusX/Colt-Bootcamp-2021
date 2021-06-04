const { render } = require('ejs');
const express = require('express');
const app = express();
const path = require('path'); // built in node module, lets me run from outside directory
const redditData = require('./data.json');
// console.log(redditData)

app.use(express.static(path.join(__dirname, 'public'))) // dosent have to be named public // Lets me run from outside directory

app.set('view engine', 'ejs') // tell express to use ejs
app.set('views', path.join(__dirname, '/views')); // Lets me run from outside directory  // dosent have to be named public

app.get('/', (req, res) => {
    res.render('home'); // instead of res.send res.render renders an entire file
})

app.get('/cats', (req, res) => {
    const cats = [
        'Blue', 'Rocket', 'Monty', 'Stephanie', 'Winston'
    ]
    res.render('cats', { cats })
})

app.get('/r/:subreddit', (req, res) => { // http://localhost:3000/r/dogs
    const { subreddit } = req.params;
    const data = redditData[subreddit];
    if (data) {
        res.render('subreddit', { ...data })
    } else {
        res.render('notfound', { subreddit })
    }
})

app.get('/rand', (req, res) => { 
    const num = Math.floor(Math.random() * 10) + 1 
    res.render('random', {num})
})

app.listen(3000, () => {
    console.log('LISTENING ON PORT 3000')
})