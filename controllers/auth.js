var express = require('express');
var db = require('../models');
var passport = require('../config/passportConfig'); //requires the passport config
var router = express.Router();


//define routes
router.get('/login', function(req, res){
  res.render('auth/login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  successFlash: "Log-in Accepted",
  failureRedirect: "/auth/login",
  failureFlash: "Invalid Credentials. Try again."
}));

router.get('/signup', function(req, res){
  res.render('auth/signup');
});

router.post('/signup', function(req, res){
  console.log(req.body);
  db.user.findOrCreate({
    where: {email: req.body.email},
    defaults: {
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
      location: req.body.location
    }
  }).spread(function(user, wasCreated){
    if(wasCreated){
      passport.authenticate('local', {
        successRedirect: "/",
        successFlash: "Account created and logged in."
      })(req,res);
    } else{
      req.flash('error', 'Email already exists!');
      res.redirect('/auth/login');
    }
  }).catch(function(err){
    req.flash("Error: ", err.message);
    res.redirect("/auth/signup");
  });
});

router.get('/logout', function(req, res){
  req.logout();
  req.flash("Logged Out");
  res.redirect('/');
});

router.get('/facebook',passport.authenticate('facebook', { //facebook login
  scope: ['public_profile', 'email']
}));

router.get('/callback/facebook', passport.authenticate('facebook', {
  successRedirect: '/',
  successFlash: 'You are now logged in via Facebook',
  failureRedirect:'/auth/login',
  failureFlash: 'Facebook credentials not recognized'
}));

//export
module.exports = router;
