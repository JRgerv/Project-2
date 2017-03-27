var express = require('express');
var db = require('../models');
var isLoggedin = require('../middleware/isLoggedin');
var router = express.Router();

router.post('/tags/all', isLoggedin, function(req, res) {
  db.user.findById(req.user.id)
  .then(function(user){
    console.log(user);
    db.tag.findOrCreate({
      where: {name: req.body.tags}
    }).spread(function(tag,created){
      user.addTag(tag).then(function(tag){
        console.log(tag.name, "added to", user.firstname);
        res.redirect("/profile");
      })
    })
  });
});

router.post('/skills/all', isLoggedin, function(req, res) {
  db.user.findById(req.user.id)
  .then(function(user){
    db.skill.findOrCreate({
      where: {content: req.body.skills}
    }).spread(function(skill, created){
      user.addSkill(skill).then(function(skill){
        console.log(skill.content, "added to", user.firstname);
      res.redirect('/profile');
      })
    })
  });
});

module.exports = router;
