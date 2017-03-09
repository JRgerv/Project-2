var express = require('express');
var db = require('../models');
var router = express.Router();

router.post('/tags/all', function(req, res) {
  console.log('inside the tags post route');
  var tags = [];
  if(req.body.tags){
    console.log('in the conditional###########################')
    tags = req.body.tags.split(",");
    db.tag.create({
      name: req.body.tags
    });
      res.redirect('/profile');
  }else{
    console.log('in the else statement');

  };
});

module.exports = router;
