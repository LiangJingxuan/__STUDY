var createError = require('http-errors');
var express = require('express');
var partials = require('express-partials');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var MongoStore = require('connect-mongo');

var settings = require('./settings');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var regRouter = require('./routes/reg');

var app = express();

// 视图助手
/*app.dynamicHelpers({
	user: function(req, res) {
		return req.session.user;
	},
	error: function(req, res) {
		var err = req.flash('error');
		if (err.length)
			return err;
		else
			return null;
	},
	success: function(req, res) {
		var succ = req.flash('success');
		if (succ.length)
			return succ;
		else
			return null;
	},
});*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(partials());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/reg', regRouter);

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
