const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

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

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 50; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '60ce32f8259bf75278c937fe' ,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate voluptatem aperiam facere in necessitatibus quia dignissimos, quibusdam ea nulla molestiae.',
            price, // price : price
            images: [
                {
                  url: 'https://res.cloudinary.com/dvv0mze8q/image/upload/v1624823618/YelpCamp/binqstd4idfwd2ostozl.jpg',
                  filename: 'YelpCamp/binqstd4idfwd2ostozl'      
                },
                {
                  url: 'https://res.cloudinary.com/dvv0mze8q/image/upload/v1624823618/YelpCamp/kxiadc9zzsx6skrc9k4n.jpg',
                  filename: 'YelpCamp/kxiadc9zzsx6skrc9k4n'      
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close()
});