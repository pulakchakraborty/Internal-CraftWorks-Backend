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
        .post(productController.postProduct)
        .get(productController.getProducts);

    router.route('/:product_id')
        .get(productController.getProduct)
        .put(productController.putProduct)
        .delete(productController.deleteProduct);

    router.route('/seller/:seller_id')
        .get(productController.getSellerProducts);

    return router;
}
