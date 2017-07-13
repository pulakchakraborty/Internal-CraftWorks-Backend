module.exports = productRoutes;


function productRoutes(passport) {

    var productController = require('./productController');
    var router = require('express').Router();
    var unless = require('express-unless');
    var multiparty = require('connect-multiparty')({uploadDir: './tmp'});

    var mw = passport.authenticate('jwt', {session: false});
    mw.unless = unless;

    //middleware
    router.use(mw.unless({method: ['GET', 'OPTIONS', 'POST']}));

    router.route('/')
        .post(multiparty, productController.postProduct)
        .get(productController.getProducts);

    router.post('/getspecificproducts', productController.getSpecificProducts);

    router.route('/search/:keyword')
        .post(productController.searchProduct);

    router.route('/:product_id')
        .get(productController.getProduct)
        .post(multiparty, productController.updateProduct)
        .delete(productController.deleteProduct);

    router.route('/seller/:seller_id')
        .get(productController.getSellerProducts);


    return router;
}
