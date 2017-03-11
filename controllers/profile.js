var express = require('express');
var db = require('../models');
var router = express.Router();

router.post('/tags/all', function(req, res) {
// var user = req.user;

db.user.findById(req.user.dataValues.id)
  .then(function(user){
console.log(user)
  });

});

//
//
//   var tags = [];
//   if(req.body.tags){
//
//     tags = req.body.tags.split(",");
//     db.tag.create({
//       name: req.body.tags
//     });
//       res.redirect('/profile');
//   }else{
//     console.log('in the else statement');
//
//   };
// });

module.exports = router;
