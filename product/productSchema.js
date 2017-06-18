// Load required packages
var mongoose = require('mongoose');

// Define our product schema
var Product   = new mongoose.Schema({
    name: String,
    description: String,
    shortDescription: String,
    category: String,
    subcategory: String,
    color: {
        isYellow: {
            type: Boolean,
            required: false
        },
        isOrange: {
            type: Boolean,
            required: false
        },
        isRed: {
            type: Boolean,
            required: false
        },
        isBrown: {
            type: Boolean,
            required: false
        },
        isGreen: {
            type: Boolean,
            required: false
        },
        isBlue: {
            type: Boolean,
            required: false
        },
        isViolette: {
            type: Boolean,
            required: false
        },
        isWhite: {
            type: Boolean,
            required: false
        },
        isBlack: {
            type: Boolean,
            required: false
        }
    },
    weight: String,
    price: String,
    stock: Number,
    isActive: {
        type: Boolean,
        default: true
    },
    updated: {
        type: Date,
        default: Date.now
    },
    imagePath: String,
    processingDays: Number,
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

// Export the Mongoose model
module.exports = mongoose.model('Product', Product);
