/**
 * Created by barbaraprommegger on 13/07/2017.
 */

var fs = require('fs');
// importing Product model
var Order = require('./orderSchema');



exports.postOrder = function(req, res) {
    var order = new order(req.body);

    //do not allow user to fake identity. The user who posts the order must be the same user that is logged in
    // if (!req.user.equals(user)) {
    //     res.sendStatus(401);
    //     return;
    // }

    order.save(function(err, m) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        //res.status(201).json({success: true, lastID: m._id});
        res.status(201).json(m);
    });

};

// Create endpoint /api/orders for GET
exports.getOrders = function(req, res) {
    // console.log(req);
    order.find(function(err, products) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.json(products);
    });
};


// Create endpoint /api/orders/:order_id for GET
exports.getOrder = function(req, res) {

    // Use the Order model to find a specific product
    Order.findById(req.params.order_id)
        .exec(function(err, order) {
            if (err) {
                res.status(400).send(err)
                return;
            };
            if(!order)
                return res.status(404).send();
            res.json(order);
        });
};





