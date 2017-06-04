/*
module.exports = productRoutes;


function productRoutes(passport) {

    var productController = require('./productController');
    var router = require('express').Router();
    var unless = require('express-unless');

    var mw = passport.authenticate('jwt', {session: false});
    mw.unless = unless;

    //middleware
    router.use(mw.unless({method: ['GET', 'OPTIONS']}));

    router.route('/')
        .post(movieController.postMovie)
        .get(movieController.getMovies);

    router.route('/:movie_id')
        .get(movieController.getMovie)
        .put(movieController.putMovie)
        .delete(movieController.deleteMovie);

    return router;
}
*/
