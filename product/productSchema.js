// Load required packages
var mongoose = require('mongoose');

// Define our product schema
var Product   = new mongoose.Schema({
    name: String,
    description: String,
    shortDescription: String,
    category: String,
    subcategory: String,
    color: String,
    customizable: { type: Boolean, default: false },
    weight: Number,
    price: Number,
    stock: Number,
    orderedNum: { type: Number, default: 0 },
    listingPeriod: { type: Number, default: 120 },
    isActive: { type: Boolean, default: true },
    updated: {type: Date, default: Date.now},
    imagePath: String,
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

// Export the Mongoose model
module.exports = mongoose.model('Product', Product);
