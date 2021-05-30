const express = require("express") // require express after we install to use in file
const app = express(); // exicute express
// console.dir(app) // shows me the app in nodemon

app.use((req, res) => { // runs on incoming request, hass access to req and res objects
    console.log("WE GOT A NEW REQUEST!!")
    // res.send("HELLO, WE GOT YOUR REQUEST! THIS IS A RESPONSE!!!")
    res.send({color: 'red'}) // renders object to localhost:3000
})

app.listen(3000, () => { // listen for a port
    console.log('LISTENING ON PORT 3000!')
})