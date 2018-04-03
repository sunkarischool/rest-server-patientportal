var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Patients = require('../models/patient');
var Verify = require('./verify');

var patientRouter = express.Router();
patientRouter.use(bodyParser.json());

patientRouter.route('/')
.get(function (req, res, next) {
    Patients.find(req.query)
        .exec(function (err, patient) {
        if (err) return next(err);
        res.json(patient);
    });
})

.post(Verify.verifyOrdinaryUser, function (req, res, next) {
    Patients.create(req.body, function (err, patient) {
        if (err) return next(err);
        console.log('Patient created!');
        var id = patient._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the Patient with id: ' + id);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Patients.remove({}, function (err, resp) {
        if (err) return next(err);
        res.json(resp);
    });
});

patientRouter.route('/:patientId')
.get(function (req, res, next) {
    Patients.findById(req.params.patientId)
        .exec(function (err, patient) {
        if (err) return next(err);
        res.json(patient);
    });
})

.put(Verify.verifyOrdinaryUser, function (req, res, next) {
    Patients.findByIdAndUpdate(req.params.patientId, {
        $set: req.body
    }, {
        new: true
    }, function (err, patient) {
        if (err) return next(err);
        res.json(patient);
    });
})

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    Patients.findByIdAndRemove(req.params.patientId, function (err, resp) {
        if (err) return next(err);
        res.json(resp);
    });
});

//address
/* patientRouter.route('/:patientId/address')

.get(function (req, res, next) {
    Patients.findById(req.params.patientId)
        .populate('address')
        .exec(function (err, patient) {
        if (err) return next(err);
        res.json(patient.address);
    });
})

.post(Verify.verifyOrdinaryUser, function (req, res, next) {
    Patients.findById(req.params.patientId, function (err, patient) {
        if (err) return next(err);
        //req.body.postedBy = req.decoded._id;
        patient.address.push(req.body);
        patient.save(function (err, patient) {
            if (err) return next(err);
            console.log('Updated address!');
            res.json(patient);
        });
    });
})

.delete(Verify.verifyAdmin,function (req, res, next) {
    Patients.findById(req.params.patientId, function (err, patient) {
        if (err) return next(err);
        for (var i = (patient.comments.length - 1); i >= 0; i--) {
            patient.comments.id(patient.comments[i]._id).remove();
        }
        patient.save(function (err, result) {
            if (err) return next(err);
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Deleted all comments!');
        });
    });
});

patientRouter.route('/:patientId/comments/:commentId')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Patients.findById(req.params.patientId)
        .populate('comments.postedBy')
        .exec(function (err, patient) {
        if (err) return next(err);
        res.json(patient.comments.id(req.params.commentId));
    });
})

.put(Verify.verifyOrdinaryUser, function (req, res, next) {
    // We delete the existing commment and insert the updated
    // comment as a new comment
    Patients.findById(req.params.patientId, function (err, patient) {
        if (err) return next(err);
        patient.comments.id(req.params.commentId).remove();
        req.body.postedBy = req.decoded._id;
        patient.comments.push(req.body);
        patient.save(function (err, patient) {
            if (err) return next(err);
            console.log('Updated Comments!');
            res.json(patient);
        });
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Patients.findById(req.params.patientId, function (err, patient) {
        if (patient.comments.id(req.params.commentId).postedBy
           != req.decoded.data._id) {
            var err = new Error('You are not authorized to perform this operation!');
            err.status = 403;
            return next(err);
        }
        patient.comments.id(req.params.commentId).remove();
        patient.save(function (err, resp) {
            if (err) return next(err);
            res.json(resp);
        });
    });
}); */

module.exports = patientRouter;