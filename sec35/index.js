const express = require('express');
const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.json())

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