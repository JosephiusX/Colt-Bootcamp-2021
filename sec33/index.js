const express = require("express") // require express after we install to use in file
const app = express(); // exicute express
// console.dir(app) // shows me the app in nodemon

// app.use((req, res) => { // runs on incoming request, hass access to req and res objects
//     console.log("WE GOT A NEW REQUEST!!")
//     res.send('<h1> This is my webpage!</h1>') // once we res.send() , thats the end of it
// })

app.get('/', (req, res) => { // loalhost:3000/ (the root route)
    res.send('This is the home page !') // renders this phrase to screen
})

app.get('/r/:subreddit/:postId', (req, res) => { // http://localhost:3000/r/asjdfoasdhf
   const { subreddit, postId } = req.params; // destructuring - making variable that corrisponds to a property in the object
   res.send(`<h1>Viewing Post ID: ${postId} on the ${subreddit} subreddit</h1> `)
})

app.post('/cats', (req, res) => {
    res.send('POST REQUEST TO /cats!!!! THIS IS DIFFRENT THAN A GET REQUEST!')
})

app.get('/cats', (req, res) => { // localhost:3000/cats
    res.send('MEOW!') // renders MEOW to the screen
})

app.get('/dogs', (req, res) => {// localhost:3000/dogs
    res.send('WOOF!') // renders WOOF
})

app.get('*', (req, res) => { // setting message for un recegonized paths (Localhost:3000/alidifjawdu) , has to be last
    res.send(`I don't know that path!`)
}) // routes are matched in order, this route only works at the end


// /cats => 'meow'
// /dogs => 'woof'
// '/'

app.listen(3000, () => { // listen for a port
    console.log('LISTENING ON PORT 3000!')
})