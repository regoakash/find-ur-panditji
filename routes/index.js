var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', ensureAuthenticated, (req, res, next) => {
  res.render('index', { title: 'Bookings' });
});

function ensureAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/users/login-pandit');
}

module.exports = router;

//for the gods/shiv  page
// router.get('/shiv', (req, res, next) => {
//   res.render('shiv', {title: 'Shiv Ji'});
// });
// router.get('/laxmi', (req, res, next) => {
//   res.render('laxmi', {title: 'Laxmi Ji'});
// });
// router.get('/vishnu', (req, res, next) => {
//   res.render('vishnu', {title: 'Vishnu Ji'});
// });
// router.get('/durga', (req, res, next) => {
//   res.render('durga', {title: 'Durga ji'});
// });
// router.get('/ganesh', (req, res, next) => {
//   res.render('ganesh', {pageTitle: 'Ganesh Ji'});
// });
// router.get('/saraswati', (req, res, next) => {
//   res.render('saraswati', {title: 'Saraswati Ji'});
// });

