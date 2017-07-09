module.exports = categoryRoutes;


function categoryRoutes(passport) {

    var categoryController = require('./categoryController');
    var router = require('express').Router();
    var unless = require('express-unless');

    var mw = passport.authenticate('jwt', {session: false});
    mw.unless = unless;

    //middleware
    router.use(mw.unless({method: ['GET', 'OPTIONS']}));

    router.route('/')
        .post(categoryController.postCategory)
        .get(categoryController.getCategories);

    router.route('/parentCategories')
        .get(categoryController.getParentCategories);

    router.route('/:category_id')
        .get(categoryController.getCategory)
        .put(categoryController.putCategory)
        .delete(categoryController.deleteCategory);

    return router;
}
