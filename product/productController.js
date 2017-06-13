// importing Movie model
var Product = require('./productSchema');
exports.postProduct = function(req, res) {
    var product = new Product(req.body);
    //do not allow user to fake identity. The user who postet the product must be the same user that is logged in
    if (!req.user.equals(product.user)) {
        res.sendStatus(401);
        return;
    }
    product.save(function(err, m) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.status(201).json(m);
    });
};

// Create endpoint /api/products for GET
exports.getProducts = function(req, res) {
    Product.find(function(err, products) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.json(products);
    });
};

// Create endpoint /api/products/:product_id for GET
exports.getProduct = function(req, res) {
    // Use the Movie model to find a specific product
    Product.findById(req.params.product_id, function(err, product) {
        if (err) {
            res.status(400).send(err)
            return;
        };

        res.json(product);
    });
};

// Create endpoint /api/products/:product_id for PUT
exports.putProduct = function(req, res) {
    // Use the Movie model to find a specific product and update it
    Product.findByIdAndUpdate(
        req.params.product_id,
        req.body,
        {
            //pass the new object to cb function
            new: true,
            //run validations
            runValidators: true
        }, function (err, product) {
            if (err) {
                res.status(400).send(err);
                return;
            }
            res.json(product);
        });
};

// Create endpoint /api/products/:product_id for DELETE
exports.deleteProduct = function(req, res) {
    // Use the Beer model to find a specific beer and remove it
    Product.findById(req.params.product_id, function(err, m) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        m.remove();
        res.sendStatus(200);
    });
};