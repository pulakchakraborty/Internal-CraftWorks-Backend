/**
 * Created by barbaraprommegger on 13/07/2017.
 */

// Load required packages
var mongoose = require('mongoose');


// Define our order schema
var Order   = new mongoose.Schema({
    addressLine1: {
        type: String,
        required: false
    },

    addressLine2: {
        type: String,
        required: false
    },

    city: {
        type: String,
        required: false
    },

    state: {
        type: String,
        required: false
    },

    zip: {
        type: Number,
        required: false
    },

    payment: {
        isIBAN: {
            type: Boolean,
            required: true,
            default: false
        },
        isPayPal: {
            type: Boolean,
            required: true,
            default: false
        }
    },

    delivery: {
        isExpress: {
            type: Boolean,
            required: true,
            default: false
        },
        isStandard: {
            type: Boolean,
            required: true,
            default: false
        }
    },

    amountIsDue: {
        type: Boolean
    },

    date: {
        type: Date,
        default: Date.now
    },

    isShipped: {
        type: Boolean
    },

    items: [{ name: String, quantity: String }],




});


// Export the Mongoose model
module.exports = mongoose.model('Order', Order);

