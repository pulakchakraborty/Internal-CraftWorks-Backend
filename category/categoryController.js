// importing Category model
var Category = require('./categorySchema');
exports.postCategory = function(req, res) {
    var category = new Category(req.body);
    //do not allow user to fake identity. The user who postet the category must be the same user that is logged in
    /*if (!req.user.equals(category.user)) {
        res.sendStatus(401);
    }*/
    category.save(function(err, m) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.status(201).json(m);
    });
};
// Create endpoint /api/categories for GET
exports.getCategories = function(req, res) {
    Category.find(function(err, categories) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.json(categories);
    });
};
// Create endpoint /api/categories/:category_id for GET
exports.getCategory = function(req, res) {
    // Use the Category model to find a specific category
    Category.findById(req.params.category_id, function(err, category) {
        if (err) {
            res.status(400).send(err)
            return;
        };

        res.json(category);
    });
};
// Create endpoint /api/categories/:category_id for PUT
exports.putCategory = function(req, res) {
    // Use the Category model to find a specific category and update it
    Category.findByIdAndUpdate(
        req.params.category_id,
        req.body,
        {
            //pass the new object to cb function
            new: true,
            //run validations
            runValidators: true
        }, function (err, category) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.json(category);
    });
};
// Create endpoint /api/categories/:category_id for DELETE
exports.deleteCategory = function(req, res) {
    // Use the Beer model to find a specific beer and remove it
    Category.findById(req.params.category_id, function(err, m) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        m.remove();
        res.sendStatus(200);
    });
};
