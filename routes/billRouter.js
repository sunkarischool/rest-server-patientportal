var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Bills = require('../models/Bills');
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
        console.log('bill created!');
        var id = bill._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the bill with id: ' + id);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Bills.remove({}, function (err, resp) {
        if (err) return next(err);
        res.json(resp);
    });
});

billRouter.route('/:billId')
.get(function (req, res, next) {
    Bills.findById(req.params.billId)
        .exec(function (err, bill) {
        if (err) return next(err);
        res.json(bill);
    });
})

.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin,function (req, res, next) {
    Bills.findByIdAndUpdate(req.params.billId, {
        $set: req.body
    }, {
        new: true
    }, function (err, bill) {
        if (err) return next(err);
        res.json(bill);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin,function (req, res, next) {
    Bills.findByIdAndRemove(req.params.billId, function (err, resp) {
        if (err) return next(err);
        res.json(resp);
    });
});

module.exports = billRouter;