/**
 * Created by barbaraprommegger on 13/07/2017.
 */
var fs = require('fs');
// importing Product model
var Order = require('./orderSchema');


//post new Order
exports.postOrder = function(req, res) {
    var order = new Order(req.body);
    var order_request = req.body;

    //set paymentmethod boolean
    if(order_request.payment == "isIBAN") {
        order.payment.isIBAN = true;
        order.payment.isPayPal = false;
    } else {
        order.payment.isIBAN = false;
        order.payment.isPayPal = true;
    }

    //save order
    order.save(function(err, m) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.status(201).json(m);
    });

};

// Create endpoint /api/orders for GET
exports.getOrders = function(req, res) {
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





