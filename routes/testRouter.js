var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Tests = require('../models/tests');
var Verify = require('./verify');

var testRouter = express.Router();
testRouter.use(bodyParser.json());

testRouter.route('/')
.get(function (req, res, next) {
    Tests.find(req.query)
        .exec(function (err, test) {
            console.log(req.query);
            console.log(test);
        if (err) return next(err);
        res.json(test);
    });
})

.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Tests.create(req.body, function (err, test) {
        if (err) return next(err);
        console.log('visit created!');
        var id = test._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the visit with id: ' + id);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Tests.remove({}, function (err, resp) {
        if (err) return next(err);
        res.json(resp);
    });
});

testRouter.route('/:visitId')
.get(function (req, res, next) {
    Tests.findById(req.params.visitId)
        .exec(function (err, visit) {
        if (err) return next(err);
        res.json(visit);
    });
})

.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin,function (req, res, next) {
    Tests.findByIdAndUpdate(req.params.visitId, {
        $set: req.body
    }, {
        new: true
    }, function (err, visit) {
        if (err) return next(err);
        res.json(visit);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin,function (req, res, next) {
    Tests.findByIdAndRemove(req.params.visitId, function (err, resp) {
        if (err) return next(err);
        res.json(resp);
    });
});

module.exports = testRouter;