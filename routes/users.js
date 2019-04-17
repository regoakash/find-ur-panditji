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

//for the billing page
router.get('/billing-form', (req, res, next) => {
  res.render('billing-form', {title: 'Billing'});
  next();
});

//for the contact us page
router.get('/contact-us', (req, res, next) => {
  res.render('contact-us', {title: 'Contact us'});
  next();
});

//for the annaprashan pooja page
router.get('/annaprashan', (req, res, next) => {
  res.render('annaprashan', {title: 'Annaprashan Puja'});
  next();
});

//for the 'panditji in bhopal' page
router.get('/pandit-in-bhopal', (req, res, next) => {
  res.render('pandit-in-bhopal', {title: 'Pandit in Bhopal'});
  next();
});

//for the sample 'modal' page
router.get('/modal', (req, res, next) => {
  res.render('modal', {title: 'Sample Modal'});
  next();
});

//for the gods/shiv  page
router.get('/shiv', (req, res, next) => {
  res.render('shiv', {title: 'Shiv Ji'});
  next();
});
router.get('/laxmi', (req, res, next) => {
  res.render('laxmi', {title: 'Laxmi Ji'});
  next();
});
router.get('/vishnu', (req, res, next) => {
  res.render('vishnu', {title: 'Vishnu Ji'});
  next();
});
router.get('/durga', (req, res, next) => {
  res.render('durga', {title: 'Durga ji'});
  next();
});
router.get('/ganesh', (req, res, next) => {
  res.render('ganesh', {title: 'Ganesh Ji'});
  next();
});
router.get('/saraswati', (req, res, next) => {
  res.render('saraswati', {title: 'Saraswati Ji'});
  next();
});

//for showing a common error page for undefined pages while routing
// app.get('*', function(req, res) {
//   res.render('error');
// });

module.exports = router;
