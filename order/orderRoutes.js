/**
 * Created by barbaraprommegger on 13/07/2017.
 */

module.exports = orderRoutes;


function orderRoutes(passport) {

    var orderController = require('./orderController');
    var router = require('express').Router();
    var unless = require('express-unless');

    var mw = passport.authenticate('jwt', {session: false});
    mw.unless = unless;

    //middleware
    router.use(mw.unless({method: ['GET', 'OPTIONS']}));

    router.route('/')
        .post(orderController.postOrder)
        .get(orderController.getOrders)
        .get(orderController.getOrder);

    return router;
}

