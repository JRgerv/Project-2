var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var facebookStrategy = require('passport-facebook').Strategy;
var db = require('../models');
require('dotenv').config();

passport.serializeUser(function(user, callback){
  callback(null, user.id); 
});

passport.deserializeUser(function(id, cb){
  db.user.findById(id).then(function(user){
    cb(null, user);
  }).catch("Callback error: " + cb);
});

passport.use(new localStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function(email, password, cb){
  db.user.findOne({
    where: {email: email}
  }).then(function(user){
    if(!user || !user.isValidPassword(password)){
      cb(null, false);
    }else{
      cb(null, user);
    }
  }).catch(cb);
}));

passport.use(new facebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_SECRET,
  callbackURL: process.env.BASE_URL + 'auth/callback/facebook',
  profileFields: ['id', 'email', 'displayName'],
  enableProof: true
},function(accessToken, refreshToken, profile, cb){
  var email = profile.emails ? profile.emails[0].value : null;
  console.log(profile);
  db.user.findOne({
    where: {email:email}
  }).then(function(existingUser){
    if(existingUser && email){
      existingUser.updateAttributes({
        facebookId: profile.id,
        facebookToken: accessToken
      }).then(function(updatedUser){
        cb(null, updatedUser);
      }).catch(cb);
    }
    else{
      db.user.findOrCreate({
        where: {facebookId: profile.id},
        defaults: {
          facebookToken: accessToken,
          email: email,
          firstname: profile.displayName.split(" ")[0],
          lastname: profile.displayName.split(" ")[1],
          username: profile.displayName,
        }
      }).spread(function(user, wasCreated){
        if(wasCreated){
          cb(null, user);
        }
        else{
          user.facebookToken = accessToken;
          user.save().then(function(){
            cb(null, user);
          }).catch(cb);
        }
      }).catch(cb);
    }
  })
}));

module.exports = passport;
