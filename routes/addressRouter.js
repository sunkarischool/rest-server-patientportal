var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Addresses = require('../models/address');
var Verify = require('./verify');

var addressRouter = express.Router();
addressRouter.use(bodyParser.json());

addressRouter.route('/')
.get(function (req, res, next) {
    console.log(req.query);
    Addresses.find(req.query)
        .exec(function (err, address) {
        if (err) return next(err);
        console.log(address);
        res.json(address);
    });
})

.post(function (req, res, next) {
    Address.create(req.body, function (err, address) {
        if (err) return next(err);
        console.log('address created!');
        var id = address._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the address with id: ' + id);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Address.remove({}, function (err, resp) {
        if (err) return next(err);
        res.json(resp);
    });
});

addressRouter.route('/:addressId')
.get(function (req, res, next) {
    Address.findById(req.params.addressId)
        .exec(function (err, address) {
        if (err) return next(err);
        res.json(address);
    });
})

.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin,function (req, res, next) {
    Address.findByIdAndUpdate(req.params.addressId, {
        $set: req.body
    }, {
        new: true
    }, function (err, address) {
        if (err) return next(err);
        res.json(address);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin,function (req, res, next) {
    Address.findByIdAndRemove(req.params.addressId, function (err, resp) {
        if (err) return next(err);
        res.json(resp);
    });
});


module.exports = addressRouter;