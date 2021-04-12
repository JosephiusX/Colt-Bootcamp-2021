const mongoose = require('mongoose'); // requiring mongoose
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({ // create model
    title: String,
    price: String,
    description: String,
    location: String
});

module.exports = mongoose.model('Campground', CampgroundSchema); // export model