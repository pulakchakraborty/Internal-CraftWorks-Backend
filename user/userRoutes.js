module.exports = userRoutes;

function userRoutes(passport) {

    var userController = require('./userController');
    var router = require('express').Router();
    var multiparty = require('connect-multiparty')({uploadDir: './tmp'});


    router.post('/login', userController.login);
    router.post('/unregister', passport.authenticate('jwt', {session: false}),userController.unregister);
    router.post('/signup', multiparty, userController.signup);
    router.route('/:user_id')
        .get(userController.getUser);

    return router;

}
