var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var fs = require('fs');     //built in module
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var expressValidator = require('express-validator');
var multer = require('multer');
// var upload = multer({dest: './uploads'});      for multer(handling image uploads)
var flash = require('connect-flash');
var bcrypt = require('bcryptjs');
var mongo = require('mongodb');
var mongoose = require('mongoose');
// var db = mongoose.connection;            database variable

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// var pageRouter = require('./routes/pages');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('views', path.join(__dirname, '.views/gods'));
// app.set('view engine', 'jade');
app.set('view engine', 'pug' );     //changing the view engine to 'pug'

app.use((req, res, next) => {     
  var now = new Date().toString();  //getting the current data in the string format

  //storing all the data in a variable for printing into a log file
  var log = `${now}: ${req.method} ${req.url}`;
  // console.log(log);      for printing in the command prompt
  fs.appendFile('server.log',log+ '\n', (err) => {
    if(err) {
      console.log('Unable to append to server.log')
    }
  });

  //when we do not pass next() then the page will never finish loading because then middleware doesn't call next
  next();
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/page', pageRouter);    adding another routing page

// for showing a common error page for undefined pages while routing
// app.get('*', function(req, res) {
//   res.render('error');
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
