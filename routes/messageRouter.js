var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Messages = require('../models/messages');
var Verify = require('./verify');

var messageRouter = express.Router();
messageRouter.use(bodyParser.json());

messageRouter.route('/')
.get(function (req, res, next) {
    Messages.find(req.query)
        .exec(function (err, message) {
            console.log(req.query);
        if (err) return next(err);
        res.json(message);
    });
})

.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    messages.create(req.body, function (err, message) {
        if (err) return next(err);
        console.log('message created!');
        var id = message._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the message with id: ' + id);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    messages.remove({}, function (err, resp) {
        if (err) return next(err);
        res.json(resp);
    });
});

messageRouter.route('/:messageId')
.get(function (req, res, next) {
    messages.findById(req.params.messageId)
        .exec(function (err, message) {
        if (err) return next(err);
        res.json(message);
    });
})

.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin,function (req, res, next) {
    messages.findByIdAndUpdate(req.params.messageId, {
        $set: req.body
    }, {
        new: true
    }, function (err, message) {
        if (err) return next(err);
        res.json(message);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin,function (req, res, next) {
    messages.findByIdAndRemove(req.params.messageId, function (err, resp) {
        if (err) return next(err);
        res.json(resp);
    });
});

module.exports = messageRouter;