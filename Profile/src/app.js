// require our dependencies
var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(cookieParser());

// use favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// use static content
app.use(express.static(path.join(__dirname, 'public')));

// use express layout
app.use(expressLayouts);

// route declaration
var index = require('./routes/index');
var policy = require('./routes/policy');
var terms = require('./routes/terms');

// use the route
app.use('/', index);
app.use('/policy', policy);
app.use('/terms', terms);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
