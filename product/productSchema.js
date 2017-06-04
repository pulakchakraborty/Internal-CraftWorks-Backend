/*
// Load required packages
var mongoose = require('mongoose');

// Define our product schema
var Product   = new mongoose.Schema({
    productName: String,
    productDescription: String,
    productShortDescription: String,
    productKeyword: String,
    productCatID: Number,
    productSubCatID: Number,
    productColor: String,
    productCustomizable: Boolean,
    productDesignerShop: Number,
    productDeliveryTime: Number,
    productDeliveryRegion: String,
    productWeight: Number,
    productPrice: Number,
    productStock: Number,
    productListingPeriod: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

// Export the Mongoose model
module.exports = mongoose.model('Product', Product);*/
