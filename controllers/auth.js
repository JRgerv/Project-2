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
  successFlash: "Good, you logged in!",
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
  }).spread(function(user, wasCreated){ //returns boolean created or not
    if(wasCreated){
      //good
      passport.authenticate('local', {
        successRedirect: "/",
        successFlash: "Account created and logged in. You're ready to go!"
      })(req,res);
    } else{
      //already found, bad
      req.flash('error', 'Email already exhists!');
      res.redirect('/auth/login');
    }
  }).catch(function(err){
    req.flash("Zoinks! Error: ", err.message);
    res.redirect("/auth/signup");
  });
});

router.get('/logout', function(req, res){
  //res.send('logged out :( ');
  req.logout();
  req.flash("You logged out :(");
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
