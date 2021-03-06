var fs = require('fs');
// importing Product model
var Product = require('./productSchema');
var Category = require('./../category/categorySchema');

// Creating bridge between  Product database and replica elastic search
Product.createMapping = function(err, res) {

    if(err){
        console.log("Error Creating Mapping");
        console.log("Error");
    }  else{
        console.log("Mapping Created");
console.log(res);
}
};

var stream = Product.synchronize();
var count = 0;

// Count the amount of documents
stream.on('data', function() {
    count++;
});

// give the count of document after close
stream.on('close', function() {
    console.log("Indexed " + count + " Documents");
});


// Show the the user whether any error come to the server
stream.on('error', function(err)  {
    console.log(err);
});

// Search a product based on a keyword
exports.searchProduct = function(req, res, next) {
    if (req.params.keyword === 'all') {
        query = {
            "match_all": {}
        };
    }
    else {
        query = {
            "multi_match": {
                query: req.params.keyword,
                type: "phrase_prefix",
                fields: ["name", "description", "shortDescription"]
            }
        };
    }

    Product.search(query, function(err, results) {
               if(err) return next(err);
               res.json(results.hits.hits);
        }
    );
};

exports.postProduct = function(req, res) {
    var product = new Product(req.body);
    var targetImageDir = './../Internal-CraftWorks-Frontend/src/assets/img/products/';
    product.imagePath = 'src/assets/img/products/' + product._id + '.jpg';

    //do not allow user to fake identity. The user who posts the product must be the same user that is logged in
    if (!req.user.equals(product.seller)) {
        res.sendStatus(401);
        return;
    }

    product.save(function(err, m) {
        if (err) {
            res.status(400).send(err);
            return;
        }

        if(req.files.file) {
            return fs.rename(req.files.file.path, targetImageDir + m._id + '.jpg', function(err) {
                if(err)
                    return res.status(500).send(err);
                res.status(201).json({success: true, lastID: m._id});
            });
        }
        //res.status(201).json({success: true, lastID: m._id});
        res.status(201).json(m);
    });

    //update the respective category with product reference
    if (product.subcategory) {
        Category.update(
            { name: product.subcategory },
            { $push: { products: product._id } },
            function (err) {
                if (err) {
                    res.status(400).send(err);
                }
            }
        );
    }
    else {
        Category.update(
            { name: product.category },
            { $push: { products: product._id } },
            function (err) {
                if (err) {
                    res.status(400).send(err);
                }
            }
        );
    }
};

// Create endpoint /api/products for GET
exports.getProducts = function(req, res) {
    // console.log(req);
    Product.find(function(err, products) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.json(products);
    });
};

// Create endpoint /api/products/getspecificproducts for POST
exports.getSpecificProducts = function(req, res) {
    const ids = req.body.ids;
    Product.find({
        _id: {
            $in: ids
        }
    }, function(err, products) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.json(products);
    });
};

// Create endpoint /api/products/:product_id for GET
exports.getProduct = function(req, res) {

    console.log(req.params.product_id);
    // Use the Product model to find a specific product
    Product.findById(req.params.product_id)
        .populate('seller')
        .exec(function(err, product) {
            if (err) {
                res.status(400).send(err)
                return;
            };
            if(!product)
                return res.status(404).send();
            res.json(product);
    });
};

// Create endpoint /api/products/seller/:seller for GET
exports.getSellerProducts = function(req, res) {

    // Use the Product model to find a specific product
    Product.find(({seller: req.params.seller_id}), function(err, products) {
        if (err) {
            res.status(400).send(err)
            return;
        };
        if(!products)
            return res.status(404).send();
        res.json(products);
    });
};

// Create endpoint /api/products/:product_id for PUT
exports.updateProduct = function(req, res) {
    var targetImageDir = './../Internal-CraftWorks-Frontend/src/assets/img/products/';


    //console.log(req.body);
    // Use the Product model to find a specific product and update it
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
            //update product image
            if(req.files.file) {
                console.log("Image file was sent");
                return fs.rename(req.files.file.path, targetImageDir + req.params.product_id + '.jpg', function(err) {
                    if(err)
                        return res.status(500).send(err);
                    res.status(201).json({success: true, lastID: req.params.product_id});
                });
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

        //delete the product reference from respective category
        if (m.subcategory) {
            Category.update(
                { name: m.subcategory },
                { $pull: { products: m._id } },
                function (err) {
                    if (err) {
                        res.status(400).send(err);
                    }
                    console.log('Product reference removed from sub-category!');
                }
            );
        }
        else {
            Category.update(
                { name: m.category },
                { $pull: { products: m._id } },
                function (err) {
                    if (err) {
                        res.status(400).send(err);
                    }
                    console.log('Product reference removed from category!');
                }
            );
        }

        //remove the product from products collection
        m.remove(function(err) {
            if (err) throw err;
            console.log('Product successfully deleted!');
        });
        res.sendStatus(200);
    });
};
