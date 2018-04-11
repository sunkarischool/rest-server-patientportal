var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Bills = require('../models/bills');
var Verify = require('./verify');

var billRouter = express.Router();
billRouter.use(bodyParser.json());

billRouter.route('/')
.get(function (req, res, next) {
    Bills.find(req.query)
        .exec(function (err, bill) {
            console.log(req.query);
            console.log(bill);
        if (err) return next(err);
        res.json(bill);
    });
})

.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Bills.create(req.body, function (err, bill) {
        if (err) return next(err);
        console.log('billing created!');
        var id = bill._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the billing with id: ' + id);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Bills.remove({}, function (err, resp) {
        if (err) return next(err);
        res.json(resp);
    });
});

billRouter.route('/:billingId')
.get(function (req, res, next) {
    Bills.findById(req.params.billingId)
        .exec(function (err, billing) {
        if (err) return next(err);
        res.json(billing);
    });
})

.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin,function (req, res, next) {
    Bills.findByIdAndUpdate(req.params.billingId, {
        $set: req.body
    }, {
        new: true
    }, function (err, bill) {
        if (err) return next(err);
        res.json(bill);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin,function (req, res, next) {
    Bills.findByIdAndRemove(req.params.billingId, function (err, resp) {
        if (err) return next(err);
        res.json(resp);
    });
});

module.exports = billRouter;