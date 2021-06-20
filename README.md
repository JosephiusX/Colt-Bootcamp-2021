# Colt-Bootcamp-2021
sec 27 Async Javascript

    271.  The Call Stack
        last in first out


sec33 

    
330. Introducing Express

                express is a fast unopinionated, minimalist web framework for Node.js  It helps us build web apps

                its just an npm package which comes with a bunch of methods and optional plugins that we can use to build web applications and API's

    331. Our very first express app

            mkdir FirstApp
            cd FirstApp
            npm init -y
            npm i express
            touch index.js

    332. The Request and Response Objects

            req and res are http but express takes them and turns them into objects

            in the app.use body:
                console.dir(req) // view the req Obj with nodemon 
                console.dir(res) // view res Obj

            the method res.send() method is versatile:
                res.send('<h1>This is my webpage </h1>)
                // res.send("HELLO, WE GOT YOUR REQUEST! THIS IS A RESPONSE!!!")
                // res.send({color: 'red'}) // renders object to localhost:3000
                res.send('<h1> This is my webpage!</h1>')

    333. Express Routing Basics

                taking incoming requests and a path and matching it to some code in some response


                app.get('/cats', (req, res) => {
                    console.log("CAT REQUEST!!!")
                })
                    with above code in my index.js running in nodemon , visit : localhost:3000/cats
                        results:   CAT REQUEST!!! , in nodemon terminal

                Post Request : 
                    app.post('/cats', (req, res) => {
                    res.send('POST REQUEST TO /cats!!!! THIS IS DIFFRENT THAN A GET REQUEST!')
                })
                        : if we send a get request to cats we will get the console.log.  however if we send a post request (using postman) to cats we git the Post reponse
                        
                        POST REQUEST TO /cats!!!! THIS IS DIFFRENT THAN A GET REQUEST!
        
        334. Express Path requirements

                app.get('/r/:subreddit', (req, res) => {
                    res.send("THIS IS A SUBREDDIT!")
                })

                localhost:3000/cats
                    : sends THIS IS A SUBREDDIT
                    in node :
                        LISTENING ON PORT 3000!
                        { subreddit: 'cats' }
            
                with this route:
                    app.get('/r/:subreddit/:postId', (req, res) => { 
                    const { subreddit, postId } = req.params;
                    res.send(`<h1>Viewing Post ID: ${postId} on the ${subreddit} subreddit</h1> `)
                    })
                        result: localhost:3000/r/gardening/289173
                            rendered:
                                Viewing Post ID: 289173 on the gardening subreddit

        335. working with Query Strings

                 app.get('/search', (req, res) => {
                    const { q } = req.query;
                    if(!q) { 
                        res.send(`NOTHING FOUND IF NOTHING SEARCHED`)
                    }
                    res.send(`<h1>Search results for: ${q}</h1>`) 
                })

                run in postman to see complete results:
                    http://localhost:3000/search?q=dogs&colors=red

`
        336. Auto Restart With Nodemon

                install nodemon globally : npm i -g nodemon

                in com       mand line in file dir: nodemon index.js


sec34 L.339. Configuring Express for EJS
     
                in new dir: npm init -y
                            npm i express
                            touch index.js
                            npm i ejs
                            mkdir views
                            inside viewes dir : touch home.ejs

                            add to index.js file:
                            app.set('view engine', 'ejs')

                render file:
                    res.render('home')
        
    340. Setting The Views Directory 
        
            - helps me run the file from outside the folder 

                add to index.html:

                    const path = require('path');

                    app.set('views', path.join(__dirname, '/views'))
                
        341. EJS Interpolation Syntax

                TAGS:
                    <% 'Scriptlet' tag, for control-flow, no output
                    <%_ 'Whitespace Slurping' Scriptlet tag, strips all whitespace before it
                    <%= (not treated like html) Outputs the value into the template (escaped)
                    <%- (will be treated like html) Outputs the unescaped value into the template
                    <%# Comment tag, no execution, no output
                    <%% Outputs a literal '<%'
                    %%> Outputs a literal '%>'
                    %> Plain ending tag
                    -%> Trim-mode ('newline slurp') tag, trims following newline
                    _%> 'Whitespace Slurping' ending tag, removes all whitespace after it


        342. Passing data to Templates

            with this path a can save a value by the name of num and render it to EJS:

                app.get('/rand', (req, res) => { 
                    const num = Math.floor(Math.random() * 10) + 1 
                    res.render('random', {num})
                })

        343. Subreddit Template Demo    

            app.get('/r/:subreddit',(req, res) => {
                const { subreddit } = req.params;
                res.render('subreddit', { subreddit })
            })

                 http://localhost:3000/r/dogs
                    remders to subbredit.ejs:
                        Browsing the dogs subreddit


        344. Conditionals in EJS
            random.ejs

        345. Loops in ejs
            cats.ejs

        346. A More Complex Subreddit Demo
            
                we connected these routes to our json data file:
                    http://localhost:3000/r/soccer
                    http://localhost:3000/r/chickens
                    http://localhost:3000/r/mightyharvest

                    we added error handling for if the route isint recegonized:
                        http://localhost:3000/r/dogs

        347. Serving Static Assets in express
            
                app.use(express.static('public'))
                
            with serving assets we have to make it so it works from outside the directory

                app.use(express.static(path.join(__dirname, 'public')))

        348. Bootstrap + Express

            cd Bootstrap demo : cd BootstrapDemo

            it dosent have a public directory because we are going to use bootstrap instead.

            download compiled css and js bootstrap files : https://getbootstrap.com/docs/5.0/getting-started/download/

            also get the jquery min file download

            assuming we dont have a public directory yet : mkdir public
            mkdir public/css public/js

        349. EJS & Partials 

                in views dir we can make a partials dir for organization. in that file make a head.ejs file.
                in the file place the code I want to reuse.

                then we use a special ejs tag:
                    <%- include('partials/head')%>

sec35 L 351. Get Vs. Post Requests

                get:
                    used to retreve information
                    data is sent via query string
                    Information is plainly visible in the URL!
                    Limited amount of data can be sent
                    
                    submits form data to query string above

                post:
                    Used to post data to the server
                    Used to write/create/update
                    data is sent via request body, not a query string
                    Can send any sort of data(JSON)

                    submits the form data with the body(can see with postman)

        352. Defining Express Post Routes

                in new empty folder : npm init -y
                                    npm i express
                                    touch index.js

        353. Parsing the Request Body

                parse request body as url encoded data:
                    app.use(express.urlencoded({extended: true}))

                console.log(req.body) : { meat: 'carnitas', qty: '4' }
                    shows that the form post info was added to req.body

                helps read JSON:
                    app.use(express.json())

        354. Intro to REST - Represational State Transfer

                REST is an 'architectural style for distributed hypernedua systems."

                It's basically a set of guidlines for how a client + server should communicate and perform CRUD operations on a given resource.

                The main idea of rest is treating data on the server side as resources than that can be CRUDed

                The most common way of approaching REST is in formatting the URLs and HTTP verbs in your applications.

        355. RESTFUL Comments Overview


                    BASIC CRUD FUNCTIONALITY BLUEPRINT:
                GET /comments - list all comments
                POST /comments - Create a new comment
                GET /comments/:id -Get one comment (using ID)
                PATCH /comments/:id - Update one comment
                DELETE /comments:id - Destroy one comment

        356. RESTful Comments Index

                npm i ejs
                set view engine in index.html:
                    app.set('view engine', 'ejs')
                mkdir views

        357. RESTful Comments New   

                make create route     

        358. Express Redirects

        359. RESTful Comments Show

        360. The UUID Package

            npm package for generating unique ids:
                npm i uuid

            must require in index.html:
                const { v4: uuid } = require('uuid');
                uuid();

        361. RESTful Comments Update

            no fucking clue what the lesson was about or if it even worked.

        362. Express Method Override

                normally we can only use get and post from a form, method override changes that:

                npm i method-override

                require in index.js file:
                    const methodOverride = require('method-override')

                to use:
                app.use(methodOverride('_method'))

                we are overriding the method to which ever one we want

                ******************** shit still dosent work:
                        it was a space before my route in the index.js file


        363. RESTful Components Delete

        Seems to be working peachy







    















Sec36 L372. Inserting with mongo

            open mongodb using the shortcut we created
            use animalshelter : moving to or creating animalshelter database

            // inserting single object
        > db.dogs.insertOne({name:"charlie", age: 3, breed: "corgi", catFriendly:true }) : inserting object to db

            {
                "acknowledged" : true,
                "insertedId" : ObjectId("6074e9a30876b93b4c7d7575")
            } : acknodgment of insertion

            show collections :dogs
            
        > db.dogs.find() : returns the contents of dogs below as well as a object id
            { "_id" : ObjectId("6074e9a30876b93b4c7d7575"), "name" : "charlie", "age" : 3, "breed" : "corgi", "catFriendly" : true }

            // inserting 2 objects at once
        > db.dogs.insert([{name:"wyatt", breed: "Golden", age: 14, catFriendly:false}, {name: "Tonya", breed: "Chihuaua" , age: 17, catFriendly:true}])

            // Conformation of objects added
            BulkWriteResult({
                "writeErrors" : [ ],
                "writeConcernErrors" : [ ],
                "nInserted" : 2,
                "nUpserted" : 0,
                "nMatched" : 0,
                "nModified" : 0,
                "nRemoved" : 0,
                "upserted" : [ ]
            })

            //next

            // make new cat db and insert a cat object
        > db.cats.insert({name: 'Blue Steele', age: 6, dogFriendly: false, breed: 'Scottish fold'})

            // result : WriteResult({ "nInserted" : 1 })

        > db.cats.find() : to check the cats db

            

        L373. Finding with mongo
            // find all instances if any
        > db.dogs.find({breed: 'corgi'}) : find in db dogs a breed: 'corgi'
                //result :
                { "_id" : ObjectId("6074e9a30876b93b4c7d7575"), "name" : "charlie", "age" : 3, "breed" : "corgi", "catFriendly" : true }

        > db.dogs.find({catFriendly: true}) : in db dogs find objects with catfriendly set to true

            // find one instance
        > db.dogs.findOne({catFriendly: true})

            // finding with multiple peramiters
        > db.dogs.find({catFriendly: true, age: 17})

            // find eberything in db
        > db.cats.find({})

        L374. Updating With mongo
        > db.dogs.find() : show us dog db objects
        > db.dogs.updateOne({name: 'charlie'}, {$set: {age:4, breed: 'Lab}}) // in db dogs we are updating one objects age to 4 and its breed to lab, it is case sensitive
                // returns:
                    { "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }
            > db.dogs.find({name: 'charlie'})
            { "_id" : ObjectId("6074e9a30876b93b4c7d7575"), "name" : "charlie", "age" : 5, "breed" : "lab", "catFriendly" : true }

            // here we add a property color
            > db.dogs.updateOne({name: 'charlie'}, {$set: {color: 'chocolate'}})
            { "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }
            > db.dogs.find({name: 'charlie'})
            { "_id" : ObjectId("6074e9a30876b93b4c7d7575"), "name" : "charlie", "age" : 5, "breed" : "lab", "catFriendly" : true, "color" : "chocolate" }

            // updateMany
            > db.dogs.updateMany({catFriendly: true}, {$set: {isAvailable: false}})
            { "acknowledged" : true, "matchedCount" : 3, "modifiedCount" : 3 }

            // view results
            db.dogs.find()

            //something about adding a date 
            > db.cats.updateOne({age: 6}, {$set: {age:7}, $currentDate:{lastChanged : true} })
            { "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }
            >
            > db.cats.findOne()
            {
                    "_id" : ObjectId("607500e4b6b94b8b7be13824"),
                    "name" : "Blue Steele",
                    "age" : 7,
                    "dogFriendly" : false,
                    "breed" : "Scottish fold",
                    "lastChanged" : ISODate("2021-04-13T17:49:43.805Z")
            }

            // theres also replaceOne()
            // further on in the course we will abstract away from using mongo like this but its good to know

        L375 Deleting with mongo
            // deleteOne()
            > db.cats.deleteOne({name: 'Blue Steele'})
            { "acknowledged" : true, "deletedCount" : 1 }
            > db.cats.find()
            >  // nothing is returned because we sucessfully deleted the only object in the cat db

            // deleteMany()
            > db.dogs.find()
            { "_id" : ObjectId("6074e9a30876b93b4c7d7575"), "name" : "charlie", "age" : 5, "breed" : "lab", "catFriendly" : true, "color" : "chocolate", "isAvailable" : false }
            { "_id" : ObjectId("6074f76a4b1fa5cef141a493"), "name" : "wyatt", "breed" : "Golden", "age" : 14, "catFriendly" : false }
            { "_id" : ObjectId("6074f76a4b1fa5cef141a494"), "name" : "Tonya", "breed" : "Chihuaua", "age" : 17, "catFriendly" : true, "isAvailable" : false }
            { "_id" : ObjectId("6074ffe54b1fa5cef141a495"), "name" : "wyatt", "breed" : "Golden", "age" : 14, "catFriendly" : false }
            { "_id" : ObjectId("6074ffe54b1fa5cef141a496"), "name" : "Tonya", "breed" : "Chihuaua", "age" : 17, "catFriendly" : true, "isAvailable" : false }
        
            > db.dogs.deleteMany({isAvailable: true}) : deleting all objects in db.dogs with isAvailable set to true
            { "acknowledged" : true, "deletedCount" : 0 }
            > db.dogs.deleteMany({isAvailable: false})
            { "acknowledged" : true, "deletedCount" : 3 }
            > db.dogs.find()
            { "_id" : ObjectId("6074f76a4b1fa5cef141a493"), "name" : "wyatt", "breed" : "Golden", "age" : 14, "catFriendly" : false }
            { "_id" : ObjectId("6074ffe54b1fa5cef141a495"), "name" : "wyatt", "breed" : "Golden", "age" : 14, "catFriendly" : false }

            // deleteMany() : delete everything in dogs db
            > db.dogs.find()
            { "_id" : ObjectId("6074f76a4b1fa5cef141a493"), "name" : "wyatt", "breed" : "Golden", "age" : 14, "catFriendly" : false }
            { "_id" : ObjectId("6074ffe54b1fa5cef141a495"), "name" : "wyatt", "breed" : "Golden", "age" : 14, "catFriendly" : false }
            > db.dogs.deleteMany({})
            { "acknowledged" : true, "deletedCount" : 2 }
            > db.dogs.find()
            >

        L376. Additional Mongo Operators

            // circle back point
sec 37 
    
    L378. What is mongoose
        
            ODM - Object Data Mapper - Object document Mapper
            it connects node.js and mongodb

        L379. Connecting Mongoose to Mongo
            npm init -y : in a new folder to initalize package.json
            npm i mongoose
            touch index.js
            // open mongodb and leave it open in the background

            // contents of index.js
            const mongoose = require('mongoose'); // require mongoose after installing it on npm
            mongoose.connect('mongodb://localhost:27017/movieApp', {useNewUrlParser: true, useUnifiedTopology: true}) 
                .then(() => { // try
                    console.log("CONNECTION OPEN!!!")
                })
                .catch(err => { // catch if error
                    console.log("OH NO ERROR !!!");
                    console.log(err);
                })
                
            // in the console in this folder run:
            node index.js

        L380. Our First Mongoose Model
            > node
            > .load index.js
            const mongoose = require('mongoose'); // require mongoose after installing 
            it on npm
            mongoose.connect('mongodb://localhost:27017/movieApp', {useNewUrlParser: true, useUnifiedTopology: true}) // where to find mongodb locally / database 
            (if it dosent exist one will be created)
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

                                        // take the schema and tell mongoose to make a 
            model using the schema
                                        const Movie = mongoose.model('Movie', movieSchema) // pass in name of model and the schema, Movie createw a collection 'movies' in mongoose , save it to a variable and save it to a variable Movie  
                                        const amadeus = new Movie ({title: 'Amadeus', year: 1986, score: 9.2, rating: 'R'})
            Promise { <pending> }
            > CONNECTION OPEN!!!

            >
            >
            >
            >
            >
            >
            > amadeus
            {
            _id: 60760396fd4201420c7abf85,
            title: 'Amadeus',
            year: 1986,
            score: 9.2,
            rating: 'R'
            }
            
            // up until this point nothing has been saved to the db

            // Saving to mongo database
            > amadeus.save()
            Promise { <pending> }

            // in our mongodb shell :
            > db.movies.find()
            { "_id" : ObjectId("60760396fd4201420c7abf85"), "title" : "Amadeus", "year" : 1986, "score" : 9.2, "rating" : "R", "__v" : 0 }

            // back to the node powershell:
                > amadeus.score = 9.5
                9.5 // changing it in the js only
                > amadeus.save() // saving the change to database
                Promise { <pending> }
            // checking mongodb shell:
                > db.movies.find() // checking to see that we saved changes on the database side
        { "_id" : ObjectId("60760396fd4201420c7abf85"), "title" : "Amadeus", "year" : 1986, "score" : 9.5, "rating" : "R", "__v" : 0 }

        L381. Insert Many
            // after writing the javascript in the indes file run:
            node index.js : confirm that Insert Many is working

            // to check the database make sure im in the moviesApp database and view the contents
            open mongodb powershell
            > use movieApp
            switched to db movieApp
            > db.movies.find()  
                // Result: the objects in the insertMany array in index.js

        L382. Finding With Mongoose
            we will connect to mongo , we will keep the movie model , but we are going to comment out the next
            navigate to project folder
            node : node REPL
            .load index.js : running the js file ending with a CONNECTION OPEN!!!  message

            // just running Movie.find() will result in more info than what we need, so we use the then method to log only the data
            Movie.find({}).then(data => console.log(data)) // this filters out relivant data like with promises
            Promise { <pending> }
            > [
            {
                _id: 60760396fd4201420c7abf85,
                title: 'Amadeus',
                year: 1986,
                score: 9.5,
                rating: 'R',
                __v: 0
            },
            {
                _id: 60761452822fc55b7cdd11af,
                title: 'Amelie',
                year: 2001,
                score: 8.3,
                rating: 'R',
                __v: 0
            },
            {
                _id: 60761452822fc55b7cdd11b0,
                title: 'Alien',
                year: 1979,
                score: 8.1,
                rating: 'R',
                __v: 0
            },
            {
                _id: 60761452822fc55b7cdd11b1,
                title: 'The Iron Giant',
                year: 1999,
                score: 7.5,
                rating: 'PG',
                __v: 0
            },
            {
                _id: 60761452822fc55b7cdd11b2,
                title: 'Stand By Me',
                year: 1986,
                score: 8.6,
                rating: 'R',
                __v: 0
            },
            {
                _id: 60761452822fc55b7cdd11b3,
                title: 'Moonrise Kingdom',
                year: 2012,
                score: 7.3,
                rating: 'PG-13',
                __v: 0
            }
            ]

            // Find movie that is PG-13
            > Movie.find({rating: 'PG-13'}).then(data => console.log(data))
            Promise { <pending> }
            > [
            {
                _id: 60761452822fc55b7cdd11b3,
                title: 'Moonrise Kingdom',
                year: 2012,
                score: 7.3,
                rating: 'PG-13',
                __v: 0
            }
            ]

            // find movie more recent than 2010
            > Movie.find({year: {$gte: 2010}}).then(data => console.log(data))
            Promise { <pending> }
            > [
            {
                _id: 60761452822fc55b7cdd11b3,
                title: 'Moonrise Kingdom',
                year: 2012,
                score: 7.3,
                rating: 'PG-13',
                __v: 0
            }
            ]

            >Movie.find({rating: 'PG-13'}).then(data => console.log(data))
                    // returns just the ones with the PG-13 ratings

            we can also querry like this
                > Movie.find({year: {$gte: 2010}}).then(data => console.log(data))
                    // returns movies newer than or equal to year 2010
                > Movie.find({year: {$lt: 1990}}).then(data => console.log(data))
                    // returns 1990 and older
                > Movie.findOne({}).then(m => console.log(m))
                    // finds one instance (first one)
                > Movie.find({_id: '60760396fd4201420c7abf85'}).then(m => console.log(m))
                    // returns item in Movie db with matching id

        L383. Updating in mongoose
            in mongo shell check to see what year amadeus is set to
                > db.movies.find({title: 'Amadeus'})
                { "_id" : ObjectId("60760396fd4201420c7abf85"), "title" : "Amadeus", "year" : 1986, "score" : 9.5, "rating" : "R", "__v" : 0 }

            updating the date to 1984 in terminal using updateOne
                > Movie.updateOne({title: 'Amadeus'}, {year: 1984}).then(res => console.log(res))
                > { n: 1, nModified: 1, ok: 1 }

            check in the mongo shell to see that it was actually changed
                > db.movies.find({title: 'Amadeus'})

            using updateManu in node terminal
                > Movie.updateMany({title: {$in: ['Amadeus', 'Stand By Me']}}, {score: 10}).then(res => console.log(res))
                    //returns:
                    Promise { <pending> }
                    > { n: 4, nModified: 4, ok: 1 }

            In the mongo shell to see if the changes have been made to the scores
                    > db.movies.find({title: {$in: ['Amadeus', 'Stand By Me']}})
                        { "_id" : ObjectId("60760396fd4201420c7abf85"), "title" : "Amadeus", "year" : 1984, "score" : 10, "rating" : "R", "__v" : 0 }
                        { "_id" : ObjectId("60761452822fc55b7cdd11b2"), "title" : "Stand By Me", "year" : 1986, "score" : 10, "rating" : "R", "__v" : 0 }
                        { "_id" : ObjectId("60ac44b2be9a0444c80216c0"), "title" : "Stand By Me", "year" : 1986, "score" : 10, "rating" : "R", "__v" : 0 }
                        { "_id" : ObjectId("60ac4823e68f405dac0ed38b"), "title" : "Stand By Me", "year" : 1986, "score" : 10, "rating" : "R", "__v" : 0 }

            > Movie.findOneAndUpdate({title: 'The Iron Giant'}, {score: 7.0}).then(m => console.log(m))
                // returns: // supposidly it returns the old version
                    Promise { <pending> }
                        > {
                        _id: 60761452822fc55b7cdd11b1,
                        title: 'The Iron Giant',
                        year: 1999,
                        score: 7,
                        rating: 'PG',
                        __v: 0
                        }

            do the same but return the modified function with a diffrent score this time
                > Movie.findOneAndUpdate({title: 'The Iron Giant'}, {score: 7.8}, {new: true}).then(m => console.log(m))
                // returns modified version :
                    {
                    _id: 60761452822fc55b7cdd11b1,
                    title: 'The Iron Giant',
                    year: 1999,
                    score: 7.8,
                    rating: 'PG',
                    __v: 0
                    }

        384. Deleting With Mongoose

                help in the mongo shell can show me some commands

            //delete every instance
                >Movie.remove({title: 'Amelie'}).then(msg => console.log(msg))
                    // returns:
                        Promise { <pending> }
                        > (node:12276) DeprecationWarning: collection.remove is deprecated. Use deleteOne, deleteMany, or bulkWrite instead.
                        { n: 4, ok: 1, deletedCount: 4 }

                > Movie.deleteMany({year: {$gte: 1999}}).then(msg => console.log(msg))
                    returns:
                        Promise { <pending> }
                        > { n: 6, ok: 1, deletedCount: 6 }
                    check in mongo shell if it works:
                        in mongo shell : use movieApp
                        db.movies.find()

            // here I return the result after deleting a single selection
                > Movie.findOneAndDelete({title:'Alien'}).then(m => console.log(m))

        385. Mongoose Schema validations
            in sec37 dir touch product.js
            copy over connection logic from index.js
            change line 2 from movie app to shopApp
            open  mongodb and leave it open
            in product.js containing dir run: node
                                        then: .load product.js
            mongoShell> show dbs : to verify shopApp db is created
            use shopApp : to switch to the db
            db.products.find()

            * start up shopApp database

        386. Additional Schema Constraints

            adding to schema in product.js:
                onSale: {
                type: Boolean,
                default: false
            }
            // next change the line that makes a new product:
                const Product = mongoose.model('Product',productSchema);

            // see in mongo shell if new object was created
                > db.products.find()
                // we can see that nothing was added because it did not pass the string length validator

            // we can add constraint to numbers schema: min: 0
            // then change the new bike price to a - to see what happens: it runs an error and dosent save because of the number validator we set
            
            // in the schema we add : categories : [String]
            then we change the new bike product
                const bike = new Product({ name: 'Bike Helmet', price:19.50, categories: ['Cycling', 'Safety'] })
            restart product.js in node and check in db to see that the new bike obj has been saved

            // if i do it again and add a number to categories like so :
                const bike = new Product({ name: 'Bike Helmet', price:19.50, categories: ['Cycling', 'Safety', 1234] })
                    // it works but it changes the number to a string due to the validation we set:
                        {
                        onSale: false,
                        categories: [ 'Cycling', 'Safety', '1234' ],
                        _id: 60ad338d19725952c45a6ace,
                        name: 'Bike Helmet',
                        price: 19.5,
                        __v: 0
                        }

            // for categories schema:
                categories: [String],
                        qty: {
                            online: {
                                type: Number,
                                default: 0
                            },
                            instore: {
                                type: Number,
                                default: 0
                            }
                        }

            // re run project.js 
                result: we can see the default qty's
                    {
                    qty: { online: 0, instore: 0 },
                    onSale: false,
                    categories: [ 'Cycling', 'Safety', '1234' ],
                    _id: 60ad35ccf0ea9031e857a1ba,
                    name: 'Bike Helmet',
                    price: 19.5,
                    __v: 0
                    }

        387. Vaildating Mongoose updates

                const bike = new Product({ name: 'Tire Pump', price:19.50, categories: ['Cycling'] })

                change the save logic to find and update:
                    Product.findOneAndUpdate({ name: 'Tire Pump'}, {price: 100}, {new:true})
                        .then(data => {
                            console.log("IT WORKED")
                            console.log(data);
                        })
                        .catch(err => {
                            console.log("OH NO ERROR!")
                            console.log(err);
                        })
                    // result:
                    {
                    qty: { online: 0, instore: 0 },
                    onSale: false,
                    categories: [ 'Cycling' ],
                    _id: 60ad3a248653330d207b2b76,
                    name: 'Tire Pump',
                    price: 100,
                    __v: 0
                    }

                Run it again but with a negative number as the price:
                    Product.findOneAndUpdate({ name: 'Tire Pump'}, {price: -19.99}, {new:true})
                        results the same as above: thenumber validator did nothing

                run it like this for validators to work:
                    Product.findOneAndUpdate({ name: 'Tire Pump'}, {price: 9.99}, {new:true, runValidators: true})
                        result: we get the validation error that we are looking for
                            OH NO ERROR!
                                    Error: Validation failed: price: Path `price` (-9.99) is less than minimum allowed value (0).
                                        at ValidationError.inspect (C:\Users\gramk\OneDrive\Desktop\Colt-Bootcamp-2021\sec37\node_modules\mongoose\lib\error\validation.js:47:26)
                                            ..............................................
                                    _message: 'Validation failed'
                                    }
                                    CONNECTION OPEN!!!

        388. Mongoose Validation Errors

                Edit price Schema: + change price to a positive to pass prev validation constraints
                    price: {
                                type: Number,
                                required: true,
                                min: [0, 'Price must be positive!'] // here the first is the default and the second is the message
                            },
                                run results in error : Price must be positive!

                add size schema:
                        size: {
                                type: String,
                                enum: ['S', 'M', 'L']
                            }

                this time make new bike obj again :
                    const bike = new Product({ name: 'Cycling Jersey', price:28.50, categories: ['Cycling'], size: 'XS' })
                    bike.save()
                        .then(data => {
                            console.log("IT WORKED")
                            console.log(data);
                        })
                        .catch(err => {
                            console.log("OH NO ERROR!")
                            console.log(err);
                        })

        389. Model Instance methods


            > node
            >.load product.json
                const pro = new Product({name: 'bike bag', price: 10})

                ******************* technical difficulties completint this lesson

        390 . Adding Model static methods 

            ????????????????????????????????????????

        391. Mongoose virtuals

        392. Defining Mongoose Middleware

sec 38 394. Express + Mongoose Bsic setup

                npm init -y
                npm i express ejs mongoose

        395. Creating Our Model

                in project dir : mkdir models

                touch models/product.js

                in product.js, require mongoose
                build product schema for name price and, category
                compile model
                export

                in index.js change db to farmStand
                require ./models/product

                touch seeds.js
                in seeds.js require mongoose
                copy mongoose connection logic
                require product

                to see it things are working so far 

                > node seeds.js
                    returns: 
                        MONGO CONNECTION OPEN!!!
                            {
                            _id: 60ae7b44ef709f21c09b7b67,
                            name: 'Ruby Grapefruit',
                            price: 1.99,
                            __v: 0
                            }

                mongo> show dbs 
                mongo> use farmStand
                mongo> show collections
                mongo> db.products.find()
                    returns :
                        { "_id" : ObjectId("60ae7b44ef709f21c09b7b67"), "name" : "Ruby Grapefruit", "price" : 1.99, "__v" : 0 }

        396. Products index

                in views dir make a products folder
                in products folder make index.ejs file

        397. Product Details

                in views dir product folder make show.ejs

        398. Creating Products

                make /products/new get route
                in views dir in product folder make new.ejs

                **************** seems to be working so far
                ?????????? no clue how

        399.  Updating Products

                make edit.ejs in Views/products

                2:40 it works at this point, taking break

                install method-override

                ******************** category isint showing up
                    reason: 
                        i misspelled category in the product schema in product.js file

        400. Tangent On Category Selector
                
                in edit.ejs i placed conditional statements on the opetion selectors

                in index.js make a array and assign it the value of categories

                in new.ejs we add options dynamically like so:

                    <% for(let category of categories) { %>
                        <option value='<%=category %>'><%=category %></option>
                    <% } %>

                add same logic to edit.ejs but with turnary added in:
                    <% for(let category of categories) { %>
                        <option value='<%=category %>' <%= product.category === category ? 'selected': '' %> ><%=category %></option>
                    <% } %>

        401. Deleting Products

                to test:
                    http://localhost:3000/products?category=fruit

sec39 405 Creating Basic Exprss App

                in empty folder:
                    npm init -y
                install express mongoose and ejs:
                    npm i express mongoose ejs
                make app.js:
                    touch app.js

        405. Campground Model Basics

                make a models directory
                in it make campground.js

        406. Campground Model Basics

                to check if it worked.
                first have mongo opened in background
                run nodemon app.js to see if mongo connection is made
                in a browser run this address:
                    http://localhost:3000/makecampground

        407. Seeding Campgrounds

                test progress at 4.20: node seeds/index.js
                then
                    mongo> db.campgrounds.find()

        408. Campground Index

                assuming mongo db is already open
                to test project 
                in project dir:
                nodemon app.js 

        409. Campground Show

                check route:
                    http://localhost:3000/campgrounds/askjd
                        returns: CAMPGROUND SHOW

                final check : click on the ca

        410. Campground New & Create


        411. Campground Edit & Update

                npm i method-override
                    then require in app.js:
                        const methodOverride = require('method-override')

                        app.use(methodOverride('_method'))

        412. Campground Delete

sec40 

        415. Using Morgan - Logger Middlewhere
                it sends information about any route being used to the console

            in a new express app in a new folder:

             npm i morgan

             const morgan = require('morgan'):

             app.use(morgan('tiny))

             app.use is a way to run code on every single request

        416. Defining Our Own Middlewhare 

        417. More Middleware Practice

        418. Setting Up A 404 Route

        419. Password Middleware Demo (NOT REAL AUTH)

        420. Protecting Specific Routes

                to test that its working:
                    http://localhost:3000/secret?password=chickennugget


sec41 YelpCamp Adding Basic Styles

        421. A New EJS Tool For Layouts 

            a solution that works better than partials:
                npm i ejs-mate
                require in app.js
           in views dir make layouts dir
           in layouts dir make boilerplate.ejs 

        422. Bootstrap5! Boilerplate
             add bootstrap 5 css cdn to boilerplate
             added 2 js cdns as well
             put body in a html element 
        
        423. Navbar Partial

            in views make partials dir
            in partials make navbar.ejs for the navbar content
            include partial in boilerplate:
                <%- include('../partials/navbar') %>

        424. Footer Partial

            in partial dir make footer.ejs

        425. Adding Images
            
            update campground Schema

        426. Styling Capgrounds Index

        427. Styling The New Form
            missed something
                    copied github, its just the bootstrap stuff who cares

        428. Styling the edit form
            copied github, its just the bootstrap stuff who cares

        429. Styling Show page
            copied github, its just the bootstrap stuff who cares

sec42 Handling Errors in Express Apps

        431. Express ' Built-in Errot Handler

        432. idk wtf is going on

        435. Handling more async errors
            async functions need to be handled with try catch

        436. Defining An Async Utility

        437. Differentiating Mongoose Error

sec43 YelpCamp: Errors & Validating Data

        439. Client side form validators
            
            bootstrap has its own form validator helpers found in the docs under forms > validation

        440. Basic Error Handler

            make basic error route. pass in next

            wrap the route body with try and catch(e) {
                next(e)
            }

        441. Defining ExpressError Class

            make dir utils
            in utils make ExpressError.js file
                make express error object

            make catchAsync.js file in utils dir as well


            instead of try catch
                wrap the route body in the catchAsync() function exported from catchAsync.js

        442. More Errors

            we did some stuff

        443.Defining Error Template
                
        444. JOI Schema Validations 

            npm i joi
             require in app.js

             ********** not sure if i tested properly with postman

        445. joi Validation Middleware


            add schemas.js file at top level of code and export

            require in app.js

            ************** also not sure if i tested correctly with postman

sec44 Data Relationships with mongo
            
        448. SQL Relationships Overview

                basic idea of how SQL works

        449. One to Few

                npm init a new folder
                npm i mongoose
                mkdir Models
                in Models make user.js

        450. One to Many

            One option is to store data separately, but then store references to document ID somewhere inside the parent(similar to SQL approach)


            make farm.js in models dir

        451. Mongoose Populate

            ********** idk what is happening or if its working

        452. One to 'Bajillions

            with thousands or mor documents, it's more efficent to store a reference to the parent on the child document. 

            we can embed documents or we can reference them

        453. Mongo Schema Design

            https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design-part-3

sec45 Mongo relationships with Express

        455. Defining Our Farm & Product Models
            we start by copying the farmstand app in sec 38

            name it farmStandTake2 in index.js to distinguish

            in models dir make farm.js file

        456. Note about farm and model:

        457. Creating new farms

            make farm folder in views insid it make new.ejs template

        458. show farm page

            in farms dir make show.ejs

        459. Creating products for a farm

            in this route we need the farm id because we are making a new product from the farm.

            we have a field on farm that refs product
            we have a field on product that refs farm

            at the end we can a new product to a specific farm.

        460. Finishing Touches

        461. Deletion Mongoose Middleware
            now if i delete the farm the products associated with it are deleted as well

Section 46: YelpCamp: Adding The Reviews Model

        462. Defining The Review Model

            in models directory make review.js
                require mongoose in it

        463. Adding The Review Form

        464. Creating Reviews

        465. Validating Reviews

        466. Displaying Reviews

        467. Styling Reviews

        468. Deleting Reviews
            having problems with the redirect . need to check source code at end of section 
            ******* i put Id instead of id in the route

        469. Campground delete Middleware
            if we delete the campground, all the reviews associated with it are still in the database but not accessable.

            now when we delete the campground , all associated reviews are deleted as well.

sec47 Express Router and Cookies

        471. Express Router Intro

            set up basic espress app for demo
                npm init -y
                npm i express
                touch index.js , require express
                mkdir routes
                in routes touch shelters.js, require express

                make another example in dogs.js

        472. Express Router & Middleware

                touch admin.js in routes dir

                http://localhost:3000/admin/deleteeverything
                    : sorry not an admin via the middleware

                http://localhost:3000/admin/deleteeverything?isAdmin=true
                    : ok deleted it all, because admin is set to true in the query string

        473. Introducing Cookies

                cookies are little bits of info that are stored in a user's browser when browsing a particular  website.

                onec a cookie is set, a user's browser will send the cookie on every subsiquent request to the site.

                Cookies allow use to make http stateful.

        474. Sending Cookies

                not able to follow

        475. Cookie Parser Middleware

                npm i cookie-parse475r

        476. Signing cookies

            something to do with verifying state

        477. Optional HMAC signing

sec 48 Express Session & Flash

        479. Introduction to Sessions
            its not very practical (or secure) to store a lot of data client-side using gookies. This is where sessions come in.

            sessions are a server-side and then send the browser a cookie that can be used to retrieve the data.

        480. Express Session
            initalize express app
            touch index.js
            npm i express-session

        481. More Express Session

            if i send my name in the querry string it will recegonise me for the session:
                localhost:3000/resister?username=Joseph

        482. Intro to flash

             couldnt find starter code, just watched 

        481. Res.locals & Flash

sec 49: YelpCamp: Restructuring & Flash

        484. Breaking Out Campground Routes
             mkdir routes
             in routes touh campgrounds.js
             requier express and router

        485. Breaking Out Review Routes

            make  route/reviews.js file
            require express and express router
            place review routers in file and
            export route: 
                module.exports = router;

            require route in app.js:
                const Review = require('./routes/reviews');

            use the route:
                app.use('/campgrounds/:id/reviews', reviews)

            remove ' campgrounds/:id/reviews ' from the routes in reviews.js 

            copy catchAsync over to reviews wit updated path

            require campground and review models:
                const Campground = require('./models/campground');
                const reviews = require('./models/review');

        486. Serving static Assets

                mkdir public
                in it touch hello.js (test file)
                place alert in it to test

                tell express to serve out public directory. in app.js:
                app.use(express.static('public'))

                in public touch validateForms.js
                take the bootstrap javascript logic  from boilerplate and place it in validateForms.js file
                back in the boilerplate.ejs file,  in the remaining script tag, give it a source of validateForms.js

                in public dir make javascripts dir and stylesheets dir

                place validateForms.js in javascripts dir
                update the src in boilerplate file to  
                /javascripts/validateForms.js

                use and make path absolute in app.js:
                    app.use(express.static(path.join(__dirname, 'public')));

                in the mongoose conndecion logic add:
                    useFindAndModify: false

        487. Configuring Session

                npm i exprss-session
                require in app.js

        488. Setting Up Flash

                npm i connect-flash
                require in app.js
        
            ********* when i make new campground im getting an error,  campground is created but there seems to be a problem with the redirect

        489. Flash Success Partial

                in partials touch flash.ejs

        490. Flash Errors Partial  

sec50 Authentication From 'Scratch'

        491-495  Authentication theory

        496. Intro to Bcrypt - password hashing function
            
            in a new folder: npm i bcrypt
            touch index.js, require Bcrypt

        497. Auth Demo: Setup

                mkdir BcryptDemo
                npm init
                npm i express ejs mongoose bcrypt
                touch index.js
                mkdir views
                mkdir models
                in models touch user.js

            set up route for form:
                in views touch register.ejs : to be rendered due to /register route in app.js
                build out form
        
        498. Auth Demo: Registering

                set up route where register data will submit to:

                require mongoose
                set up mongo logic code.
                set it up as routeDemo
        
        499. Auth Demo: Login

                in views make login.ejs file

        500. Auth Demo: Staying Logged In With Session

                npm i express-session
                require it

        501. Auth Demo: Logout

                in views make secret.ejs

        502. Auth Demo: Require Login Middleware

        503. refactoring to model methods

sec 51: Yelp Camp: Adding In Authentication

        504. Introduction to Passport

            npm i passport passport-local passport-local-mongoose

        505. Creating Our User Model

            in models dir make user.js file

        506. Configuring Passport

        507. Register Form

            in routes dir touch users.js

            in views : mkdir users 
                inside it touch register.ejs

        508. Register Route Logic

        509. Login Routes

            in views/user dir touch login.ejs

        510. isLggedIn Middleware

            in main directory make middleware.js

        511. Adding Logout

        512. currentUser Helper

        513 . fixing regidster route

sec52: Yelp-Camp: Basic Authorization

        515. Adding a authou to Campground

        516. Showing and Hiding Edit/Delete

        517. Campground Permissions
            





        
            


        

        







        











        

    





