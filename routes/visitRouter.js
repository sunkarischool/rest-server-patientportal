var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Visits = require('../models/Visits');
var Verify = require('./verify');

var visitRouter = express.Router();
visitRouter.use(bodyParser.json());

visitRouter.route('/')
.get(function (req, res, next) {
    Visits.find(req.query)
        .exec(function (err, visit) {
            console.log(req.query);
            console.log(visit);
        if (err) return next(err);
        res.json(visit);
    });
})

.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Visits.create(req.body, function (err, visit) {
        if (err) return next(err);
        console.log('visit created!');
        var id = visit._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the visit with id: ' + id);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Visits.remove({}, function (err, resp) {
        if (err) return next(err);
        res.json(resp);
    });
});

visitRouter.route('/:visitId')
.get(function (req, res, next) {
    Visits.findById(req.params.visitId)
        .exec(function (err, visit) {
        if (err) return next(err);
        res.json(visit);
    });
})

.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin,function (req, res, next) {
    Visits.findByIdAndUpdate(req.params.visitId, {
        $set: req.body
    }, {
        new: true
    }, function (err, visit) {
        if (err) return next(err);
        res.json(visit);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin,function (req, res, next) {
    Visits.findByIdAndRemove(req.params.visitId, function (err, resp) {
        if (err) return next(err);
        res.json(resp);
    });
});

module.exports = visitRouter;