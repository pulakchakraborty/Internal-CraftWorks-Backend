// Load required packages
var mongoose = require('mongoose');

// Define our movie schema
var Category   = new mongoose.Schema({
    name: String,
    slug: String,
    info: String,
    parent: String,
    category: String,
    updated: {type: Date, default: Date.now},
    imagePath: String,
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
});

// Export the Mongoose model
module.exports = mongoose.model('Category', Category);
