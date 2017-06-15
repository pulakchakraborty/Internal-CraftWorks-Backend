var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({


    username: {
        type: String,
        required: true,
        unique: true
    },


    firstName: {
        type: String,
        required: false
    },

    lastName: {
        type: String,
        required: false
    },

    email: {
        type: String,
        required: false,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

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

    phone: {
        type: String,
        required: false
    },

    paymentMethod: {
        isIban: {
            type: Boolean,
            required: false
        },
        isPaypal: {
            type: Boolean,
            required: false
        }
    },

    iban: {
        type: String,
        required: false
    },

    paypal: {
        type: String,
        required: false
    },

    isDesigner: {
        type: Boolean,
        required: true,
        default: true
    },

    isFeatured: {
        type: Boolean,
        required: true,
        default: false
    },

    imagePath: {
        type: String,
        required: false
    },

    deliveryTime: {
        type: Number,
        required: true,
        default: 5
    }

});

userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};


var User = mongoose.model('User', userSchema);

module.exports = User;

