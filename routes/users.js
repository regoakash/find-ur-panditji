var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//for the pandit-registration page
router.get('/registration-pandit', (req, res, next) => {
  res.render('registration-pandit', {title:'Register'});
  next();
});

//for the pandit login page
router.get('/login-pandit', (req, res, next) => {
  res.render('login-pandit', {title: 'Login'});
  next();
});

module.exports = router;
