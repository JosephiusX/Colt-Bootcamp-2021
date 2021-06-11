const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
    title: String,
    image: String,
    price: Number,
    description: String,
    location: String,
    reviews: [ // referencint the review model
        {
            type: Schema.Types.ObjectId, // object id
            ref: 'Review' // from thes model
        }
    ]
});

module.exports = mongoose.model('Campground', CampgroundSchema);