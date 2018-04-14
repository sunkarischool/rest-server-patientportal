var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Patient = require('../models/patient');
var Verify    = require('./verify');

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({}, function (err, user) {
        if (err) throw err;
        res.json(user);
    });
});


router.post('/register', function(req, res) {
    User.register(new User({ username : req.body.username }),
        req.body.password, function(err, user) {
        if (err) {
            return res.status(500).json({err: err});
        }
        user.save(function(err,user) {
            passport.authenticate('local')(req, res, function () {
              var patient = new Patient({username: req.body.username, lastName: req.body.lastname, firstName: req.body.firstname,
              MI: req.body.MI, email: req.body.email, gender: req.body.gender, dob: req.body.dob, ssn: req.body.ssn});
              Patient.create(req.body, function (err, patient) {
              });
              return res.status(200).json({status: 'Registration Successful!'});
            });
        });
    });
});

router.post('/login', function(req, res, next) {
  
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      //console.log(err);
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
        
      var status = "";
      var patient;
      var token = Verify.getToken({"username":user.username, "_id":user._id, "admin":user.admin});
            status = "success"; 
      Patient.find({"username":user.username}, function (err, patient) {
        if (err) throw err;
        
        res.status(200).json({
          status: 'Login successful!',
          success: true,
          token: token,
          patient: patient
        });
       // console.log(res);

    });
      
    });
  })(req,res,next);
});

router.get('/logout', function(req, res) {
    req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});


router.get('/facebook', passport.authenticate('facebook'),
  function(req, res){});

router.get('/facebook/callback', function(req,res,next){
  passport.authenticate('facebook', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
              var token = Verify.getToken(user);
              res.status(200).json({
        status: 'Login successful!',
        success: true,
        token: token
      });
    });
  })(req,res,next);
});
module.exports = router;