module.exports = userRoutes;

function userRoutes(passport) {

    var userController = require('./userController');
    var router = require('express').Router();
    var multiparty = require('connect-multiparty')({uploadDir: './tmp'});


    router.post('/login', userController.login);
    router.post('/signup', multiparty, userController.signup);
    router.post('/unregister', passport.authenticate('jwt', {session: false}),userController.unregister)

    return router;

}
