var Config = require('../config/config.js');
var User = require('./userSchema');
var jwt = require('jwt-simple');
var fs = require('fs');

module.exports.login = function(req, res){

    if(!req.body.username){
        res.status(400).send('username required');
        return;
    }
    if(!req.body.password){
        res.status(400).send('password required');
        return;
    }

    User.findOne({username: req.body.username}, function(err, user){
        if (err) {
            res.status(500).send(err);
            return
        }

        if (!user) {
            res.status(401).send('Invalid Credentials');
            return;
        }
        user.comparePassword(req.body.password, function(err, isMatch) {
            if(!isMatch || err){
                res.status(401).send('Invalid Credentials');
            } else {
                res.status(200).json({token: createToken(user)});
            }
        });
    });

};

// Create endpoint /api/user/:user_id for GET
module.exports.getUser = function(req, res) {

    // console.log(req.params.user_id);
    // Use the user model to find a specific user
    User.findById(req.params.user_id)
        .exec(function(err, user) {
            if (err) {
                console.log(err);
                res.status(400).send(err)
                return;
            };
            if(!user)
                return res.status(404).send();
            res.json(user);
        });
};

module.exports.signup = function(req, res){
    if(!req.body.username){
        res.status(400).send('username required');
        return;
    }
    if(!req.body.password){
        res.status(400).send('password required');
        return;
    }

    var user = new User(req.body);
    var targetImageDir = './../CraftWorks-Frontend/src/assets/img/users/';
    user.imagePath = 'src/assets/img/users/' + user._id + '.jpg';

    //user.username = req.body.username;
    //user.password = req.body.password;

    user.save(function(err, m) {
        if (err) {
            res.status(500).send(err);
            return;
        }

        if(req.files.file) {
            console.log("Inside if image block");
            return fs.rename(req.files.file.path, targetImageDir + m._id + '.jpg', function(err) {
                if(err) {
                    console.log("Inside if image error block");
                    return res.status(500).send(err);
                }
                //res.status(201).json({success: true, lastID: m._id});
                res.status(201).json({token: createToken(user)});
                console.log("image upload success");
            });
        }
        else {
            res.status(201).json({token: createToken(user)});
        }
    });
};

module.exports.unregister = function(req, res) {
    req.user.remove().then(function (user) {
        res.sendStatus(200);
    }, function(err){
        res.status(500).send(err);
    });
};

function createToken(user) {
    var tokenPayload = {
        user: {
            _id: user._id,
            username: user.username
        }

    };
    return jwt.encode(tokenPayload,Config.auth.jwtSecret);
};
