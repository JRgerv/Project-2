//require express and other global variables
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');
var passport = require('./config/passportConfig');
var isLoggedin = require('./middleware/isLoggedin');

require('dotenv').config();

var app = express();

//set and use statements
app.set("view engine", 'ejs');
app.use(bodyParser.urlencoded({extended:false}));
app.use(ejsLayouts);
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize()); //session must come before passport
app.use(passport.session());
app.use(express.static(__dirname + '/public'));
app.use(function(req, res, next){ //custom middleware
  res.locals.currentUser = req.user;
  res.locals.alerts = req.flash();
  next();
});

//routes
app.get('/', function(req, res){ //home page
  res.render('home');
});

app.get('/profile', isLoggedin, function(req, res){ // current user profile
  res.render("profile");
});


//controllers
app.use('/auth', require('./controllers/auth'));
app.use('/tags', require('./controllers/tags'));
app.use('/profile', require('./controllers/profile'));
app.use('/users', require('./controllers/users'));

//listen
app.listen(process.env.PORT || 3000);
