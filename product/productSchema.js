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
        }
    },
    customizable: {
        type: Boolean,
        default: false
    },
    weight: Number,
    size: {
        height: {
            type: number,
            required: false
        },
        breadth: {
            type: number,
            required: false
        },
        depth: {
            type: number,
            required: false
        }
    },
    price: Number,
    stock: Number,
    orderedNum: {
        type: Number,
        default: 0
    },
    listingPeriod: {
        type: Number,
        default: 120
    },
    listingAutoRenewal: {
        type: Boolean,
        required: true,
        default: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    updated: {
        type: Date,
        default: Date.now
    },
    imagePath: String,
    daysNeededToSend: Number,
    deliveryTime: Number,
    deliveryCost: String,
    deliveryOption: {
        isExpress: {
            type: Boolean,
            required: false
        },
        isStandard: {
            type: Boolean,
            required: false
        }
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

// Export the Mongoose model
module.exports = mongoose.model('Product', Product);
