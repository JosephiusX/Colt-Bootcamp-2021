const express = require("express") // require express after we install to use in file
const app = express(); // exicute express
// console.dir(app) // shows me the app in nodemon

app.use(() => { // runs on incoming request
    console.log("WE GOT A NEW REQUEST!!")
})

app.listen(3000, () => { // listen for a port
    console.log('LISTENING ON PORT 3000!')
})