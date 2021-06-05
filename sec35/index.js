const express = require('express');
const app = express();
const path = require('path');

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const comments = [
    {
        username: 'Todd',
        comment: 'lol that is so funny'
    },
    {
        username: 'Skyler',
        comment: 'I like to go birdwatching with my dog'
    },
    {
        username: 'Sk8terBoi', 
        comment: 'Plz delete your account, Todd'
    },
    {
        username: 'onlysayswoof',
        comment: 'woof woof woof'
    }
]

app.get('/comments', (req, res) => { // localhost:3000/comments
    res.render('comments/index', { comments }) // giving assess to comments obj in our template 
})

app.get('/comments/new', (req, res) => { // localhost:3000/comments/new
    res.render('comments/new'); // rendering new.ejs in comments dir in views
})

app.post('/comments', (req, res) => {
    const { username, comment} = req.body
    comments.push({ username, comment})
    res.redirect('/comments')
})

app.get('/tacos', (req, res) => {
    res.send("Get /tacos response")
})

app.post('/tacos', (req, res) => {
    const { meat, qty } = req.body; // destructure from req.body
    res.send(`OK, here are your ${qty} ${meat}`)
})

app.listen(3000, () => {
    console.log('ON PORT 3000')
})