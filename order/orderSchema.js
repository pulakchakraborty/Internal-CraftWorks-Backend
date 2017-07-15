 /** * Created by barbaraprommegger on 13/07/2017.
 */

// load required packages
var mongoose = require('mongoose');


// Define our order schema
var Order   = new mongoose.Schema({
    firstName: {
        type: String,
        required: false
    },

    lastName: {
        type: String,
        required: false
    },

    addressLine1: {
        type: String,
        required: true
    },

    addressLine2: {
        type: String,
        required: false
    },

    city: {
        type: String,
        required: true
    },

    state: {
        type: String,
        required: true
    },

    zip: {
        type: Number,
        required: true
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
            default: true
        }
    },

    amountIsDue: {
        type: Boolean,
        default: false
    },

    date: {
        type: Date,
        default: Date.now
    },

    isShipped: {
        type: Boolean,
        default: false
    },

    items: [{
        name: String,
        q: String
    }],

    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
}

});


// Export the Mongoose model
module.exports = mongoose.model('Order', Order);