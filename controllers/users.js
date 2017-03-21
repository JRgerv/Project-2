var express = require('express');
var db = require('../models');
var isLoggedin = require('../middleware/isLoggedin');
var router = express.Router();


//display selected tag and associated tag
router.get('/:id', function(req,res){
  db.user.findOne({
    where: {id:req.params.id},
    include:[db.tag, db.skill]
  }).then(function(user){
    res.render('users/show',{user:user});
  });
});

module.exports= router;
