var express = require('express');
var db = require('../models');
var isLoggedin = require('../middleware/isLoggedin');
var router = express.Router();

router.get('/', function(req, res){
  db.tag.findAll().then(function(tags){ //display all known tags
    res.render('tags/all', {
      tags:tags
    })
  });
});

//display selected tag and associated 
router.get('/:id', function(req,res){
  db.tag.findOne({
    where: {id:req.params.id},
    include: [db.user]
  }).then(function(tag){
    res.render('tags/show',{tag:tag});
  });
});

module.exports = router;
