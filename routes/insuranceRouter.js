var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Insurances = require('../models/insurances');
var Verify = require('./verify');

var insuranceRouter = express.Router();
insuranceRouter.use(bodyParser.json());

insuranceRouter.route('/')
.get(function (req, res, next) {
    Insurances.find(req.query)
        .exec(function (err, insurance) {
        if (err) return next(err);
        res.json(insurance);
    });
})

.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Insurances.create(req.body, function (err, insurance) {
        if (err) return next(err);
        console.log('insurance created!');
        var id = insurance._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the insurance with id: ' + id);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Insurances.remove({}, function (err, resp) {
        if (err) return next(err);
        res.json(resp);
    });
});

insuranceRouter.route('/:insuranceId')
.get(function (req, res, next) {
    Insurances.findById(req.params.insuranceId)
        .exec(function (err, insurance) {
        if (err) return next(err);
        res.json(insurance);
    });
})

.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin,function (req, res, next) {
    Insurances.findByIdAndUpdate(req.params.insuranceId, {
        $set: req.body
    }, {
        new: true
    }, function (err, insurance) {
        if (err) return next(err);
        res.json(insurance);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin,function (req, res, next) {
    Insurances.findByIdAndRemove(req.params.insuranceId, function (err, resp) {
        if (err) return next(err);
        res.json(resp);
    });
});

module.exports = insuranceRouter;