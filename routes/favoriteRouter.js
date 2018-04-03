var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Favorites = require('../models/favorites');
var Dishes = require('../models/dishes');
var Verify = require('./verify');

var favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
.all(Verify.verifyOrdinaryUser)

.get(function (req, res, next) {
    Favorites.findOne({postedBy:req.decoded.data._id})
        .populate('postedBy dishes')
        .exec(function (err, favorite) {
        if (err) throw err;
        res.json(favorite);
    });
    
})

.post(function (req, res, next) {
    Favorites.findOne({postedBy:req.decoded.data._id}, function (err, favorite) {
        if (err) throw err;
        if(favorite != null){ //favorite exists
            console.log("fav rec exists");
            var dishLen = favorite.dishes.length;
            var alreadyFav = 0;
            for(var i = 0; i < dishLen; ++i) { //see if this dish is already a favorite
                //console.log("favorite.dishes[i]:"+favorite.dishes[i]);
                if( favorite.dishes[i].equals(req.body._id)) {
                    alreadyFav = 1;
                    console.log("Dish is already part of favorites")
                    break;
                }
            }
            if(alreadyFav == 0){ //not already a favorite
                console.log("not already a fav");
                Dishes.findById(req.body._id, function (err, dish){ //find if this dish exists in dishes
                    if(dish != null){
                        favorite.dishes.push(req.body);
                        favorite.save(function (err, favorite) {
                            if (err) throw err;
                            console.log('Added to favorites!');
                            res.json(favorite);
                        });
                    }
                    else{
                        res.end('Dish with id: ' + req.body._id + ' was not found');
                    }
                });
            }
            else{
                res.json(favorite);
            }
        } //create new favorite record
        else{
            console.log("no fav rec");
            Favorites.create(req.body, function (err, favorite) {
                favorite.postedBy = req.decoded.data._id;

                 Dishes.findById(req.body._id, function (err, dish) {
                    if (err) throw err;
                     if(dish != null){
                        favorite.dishes.push(req.body);
                        favorite.save(function (err, favorite) {
                            if (err) throw err;
                            console.log('Added to favorites!');
                            res.json(favorite);
                        });
                     }
                     else{
                        res.end('Dish with id: ' + req.body._id + ' was not found');
                    }
                });

            });
        }
    });
        
})

.delete(function (req, res, next) {
    Favorites.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

favoriteRouter.route('/:dishId')
.all(Verify.verifyOrdinaryUser)

.delete(function (req, res, next) {
    Favorites.findOne({postedBy:req.decoded.data._id}, function (err, favorite) {
        if (err) throw err;;
        if(favorite != null){
            var index = favorite.dishes.indexOf(req.params.dishId);
            if(index > -1){
                favorite.dishes.splice(index, 1);
            }
            favorite.save(function (err, favorite) {
                if (err) throw err;
                console.log('Removed from favorites!');
                res.json(favorite);
            });
        }
        else{
            res.end('Dish with id: ' + id + ' not found in favorites');
        }
    });
});

module.exports = favoriteRouter;