var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({


    username: {
        type: String,
        required: true,
        unique: true
    },
/*

    userFirstName: {
        type: String,
        required: true
    },

    userLastName: {
        type: String,
        required: true
    },

    userEmail: {
        type: String,
        required: true,
        unique: true
    },
*/

    password: {
        type: String,
        required: true
    }

/*    userAddress1: {
        type: String,
        required: true
    },

    userAddress2: {
        type: String,
        required: false
    },

    userCity: {
        type: String,
        required: true
    },

    userState: {
        type: String,
        required: true
    },

    userZIP: {
        type: Number,
        required: true
    },

    userPhone: {
        type: Number,
        required: false
    },

    userPaypal: {
        type: String,
        required: false
    },

    userIsDesigner: {
        type: Boolean,
        required: true
    },

    userShopID: {
        type: Number,
        required: true,
        unique: true
    },

    userUpcomingEvents: { // TODO: Change type if implemented
        type: String,
        required: false
    }*/
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

