var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest:'./uploads'});
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');   //using the schema on the users.js file

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

// for home page
router.get('/home-page', (req, res, next) => {
  res.render('home-page', {title: 'Home Page' });
});

//for the pandit-registration page
router.get('/registration-pandit', (req, res, next) => {
  res.render('registration-pandit', {title:'Registration'});
});

//for the pandit login page
router.get('/login-pandit', (req, res, next) => {
  res.render('login-pandit', {title: 'Login'});
});

router.post('/login-pandit', 
  passport.authenticate('local', {failureRedirect: '/users/login-pandit', failureFlash: 'Invalid username or password'}),
  (req, res) => {
    req.flash('success', 'You are now logged in');
    res.redirect('/');
  }
  );

//serializing and deserializing user
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.getUserById(id, (err, user) => {
    done(err, user);
  });
});

// creating a local strategy
passport.use(new LocalStrategy((username, password, done) => {
  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user){
      return done(null, false, {message: 'Unknown user'});
    }
  
  User.comparePassword(password, user.password, (err, isMatch) => {
    if(err) return done(err);
    if(isMatch) {
      return done(null, user);
    } else {
      return done(null, false, {message: 'Invalid password'});
    }
  });
  });
}));

//using post as we are handling forms
// the 'profile_image' iss  the name of the inpu field set by us
//registration form handling
router.post('/registration-pandit', upload.single('profile_image'), (req, res, next) => {
  console.log(req.body.name);
  var name = req.body.name;
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  var password2 = req.body.password2;
  var contact_no = req.body.contact_no;
  var years_experience = req.body.years_experience;
  var address = req.body.address;
  
  if(req.file) {
    console.log('Uploading file....');
    var profile_image = req.file.filename;
  } else {
    console.log('No file uploaded!');
    var profile_image = 'noimage.jpg';
  }

  // Form validator
  req.checkBody('name','Name field is required').notEmpty();
  req.checkBody('username','User name field is required').notEmpty();
  req.checkBody('email','Email field is required').notEmpty();
  req.checkBody('email','Email is not valid').notEmpty();
  req.checkBody('password','Password field is required').notEmpty();
  req.checkBody('password2','Passwords do not match').equals(req.body.password);
  req.checkBody('contact_no','Contact number field is required').notEmpty();
  req.checkBody('years_experience','Years of experience field is required').notEmpty();
  req.checkBody('address','Address field is required').notEmpty();
  
  //checking errors
  var errors = req.validationErrors();

  if(errors) {
    // console.log(errors);
    res.render('registration-pandit', {
      errors: errors
    });
   } else {
    var newUser = new User({
      name: name,
      username: username,
      email: email,
      password: password,
      contact_no: contact_no,
      years_experience: years_experience,
      address: address,
      profile_image: profile_image
    });

    User.createUser(newUser, (err, user) => {
      if(err) throw err;
      console.log(user);
    });

    req.flash('success', 'You are now registered and can login');   //of the 'connect-flash' module

    res.location('/');
    res.redirect('/');    //redirecting to the home page after registration
  }
});
//using the multer for file uploads and the rest of that will be handled by body-parser

//for logout page
router.get('/logout', (req, res) => {
  req.logOut();
  req.flash('success', 'You are now logged out!!');
  res.redirect('/users/login-pandit');
});

//for the billing page
router.get('/billing-form', (req, res, next) => {
  res.render('billing-form', {title: 'Billing'});
});

//for the contact us page
router.get('/contact-us', (req, res, next) => {
  res.render('contact-us', {title: 'Contact us'});
});

//for the 'panditji in bhopal' page
router.get('/pandit-in-bhopal', (req, res, next) => {
  res.render('pandit-in-bhopal', {title: 'Pandit in Bhopal'});
});
//for the 'panditji in indore' page
router.get('/pandit-in-indore', (req, res, next) => {
  res.render('pandit-in-indore', {title: 'Pandit in Indore'});
});

//for the sample 'modal' page
router.get('/modal', (req, res, next) => {
  res.render('modal', {title: 'Sample Modal'});
});

//for the gods/shiv  page
router.get('/shiv', (req, res, next) => {
  res.render('shiv', {title: 'Shiv Ji'});
});
router.get('/laxmi', (req, res, next) => {
  res.render('laxmi', {title: 'Laxmi Ji'});
});
router.get('/vishnu', (req, res, next) => {
  res.render('vishnu', {title: 'Vishnu Ji'});
});
router.get('/durga', (req, res, next) => {
  res.render('durga', {title: 'Durga ji'});
});
router.get('/ganesh', (req, res, next) => {
  res.render('ganesh', {pageTitle: 'Ganesh Ji'});
});
router.get('/saraswati', (req, res, next) => {
  res.render('saraswati', {title: 'Saraswati Ji'});
});

//for the Book pooja page
router.get('/book-puja', (req, res, next) => {
  res.render('book-puja', {title: 'Book Puja'});
});

//for the separate pujas pages
router.get('/bhoomi-puja', (req, res, next) => {
  res.render('bhoomi-puja', {title: 'Bhoomi Puja'});
});
router.get('/annaprashan', (req, res, next) => {
  res.render('annaprashan', {title: 'Annaprashan Puja'});
});
router.get('/gauri-puja', (req, res, next) => {
  res.render('gauri-puja', {title: 'Gauri Puja'});
});

// //for showing a common error page for undefined pages while routing
// app.get('*', function(req, res) {
//   res.render('error');
// });

module.exports = router;
