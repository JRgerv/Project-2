var express = require('express');
var db = require('../models');
var router = express.Router();
var isLoggedin = require('../middleware/isLoggedin');

router.post('/tags/all', isLoggedin, function(req, res) {
  db.user.findById(req.user.id)
  .then(function(user){
    console.log(user);
    db.tag.findOrCreate({
      where: {name: req.body.tags}
    }).spread(function(tag,created){
      user.addTag(tag).then(function(tag){
        console.log(tag, "added to", user.firstname);
        res.redirect("/profile");
      })
    })
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
