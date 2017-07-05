// Load required packages
var mongoose = require('mongoose');
var mongoosastic = require('mongoosastic');
var esClient = require('./../elasticsearch-connection');

// Define our product schema
var Product   = new mongoose.Schema({
    name: {
        type: String,
        es_indexed:true
    },
    description: String,
    shortDescription: String,
    category: String,
    subcategory: String,
    color: {
        isYellow: {
            type: Boolean,
            required: true,
            default: false
        },
        isOrange: {
            type: Boolean,
            required: true,
            default: false
        },
        isRed: {
            type: Boolean,
            required: true,
            default: false
        },
        isBrown: {
            type: Boolean,
            required: true,
            default: false
        },
        isGreen: {
            type: Boolean,
            required: true,
            default: false
        },
        isBlue: {
            type: Boolean,
            required: true,
            default: false
        },
        isViolette: {
            type: Boolean,
            required: true,
            default: false
        },
        isWhite: {
            type: Boolean,
            required: true,
            default: false
        },
        isBlack: {
            type: Boolean,
            required: true,
            default: false
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

Product.plugin(mongoosastic, {
    esClient: esClient
})

// Export the Mongoose model
module.exports = mongoose.model('Product', Product);
