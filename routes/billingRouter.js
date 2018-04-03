var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Billing = require('../models/billing');
var Verify = require('./verify');

var billingRouter = express.Router();
billingRouter.use(bodyParser.json());

billingRouter.route('/')
.get(function (req, res, next) {
    Billing.find(req.query)
        .exec(function (err, bills) {
            console.log(req.query);
            console.log(bills);
        if (err) return next(err);
        res.json(bills);
    });
})

.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Billing.create(req.body, function (err, billing) {
        if (err) return next(err);
        console.log('billing created!');
        var id = billing._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the billing with id: ' + id);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Billing.remove({}, function (err, resp) {
        if (err) return next(err);
        res.json(resp);
    });
});

billingRouter.route('/:billingId')
.get(function (req, res, next) {
    Billing.findById(req.params.billingId)
        .exec(function (err, billing) {
        if (err) return next(err);
        res.json(billing);
    });
})

.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin,function (req, res, next) {
    Billing.findByIdAndUpdate(req.params.billingId, {
        $set: req.body
    }, {
        new: true
    }, function (err, billing) {
        if (err) return next(err);
        res.json(billing);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin,function (req, res, next) {
    Billing.findByIdAndRemove(req.params.billingId, function (err, resp) {
        if (err) return next(err);
        res.json(resp);
    });
});

module.exports = billingRouter;