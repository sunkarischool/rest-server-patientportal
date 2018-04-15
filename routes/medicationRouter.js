var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Medications = require('../models/medications');
var Verify = require('./verify');

var medicationRouter = express.Router();
medicationRouter.use(bodyParser.json());

medicationRouter.route('/')
.get(function (req, res, next) {
    Medications.find(req.query)
        .exec(function (err, medication) {
            console.log(req.query);
        if (err) return next(err);
        res.json(medication);
    });
})

.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Medications.create(req.body, function (err, medication) {
        if (err) return next(err);
        console.log('medication created!');
        var id = medication._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the medication with id: ' + id);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    medications.remove({}, function (err, resp) {
        if (err) return next(err);
        res.json(resp);
    });
});

medicationRouter.route('/:medicationId')
.get(function (req, res, next) {
    medications.findById(req.params.medicationId)
        .exec(function (err, medication) {
        if (err) return next(err);
        res.json(medication);
    });
})

.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin,function (req, res, next) {
    Medications.findByIdAndUpdate(req.params.medicationId, {
        $set: req.body
    }, {
        new: true
    }, function (err, medication) {
        if (err) return next(err);
        res.json(medication);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin,function (req, res, next) {
    Medications.findByIdAndRemove(req.params.medicationId, function (err, resp) {
        if (err) return next(err);
        res.json(resp);
    });
});

module.exports = medicationRouter;