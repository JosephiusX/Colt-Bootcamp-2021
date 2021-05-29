# Colt-Bootcamp-2021

394. Express + Mongoose Bsic setup

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


