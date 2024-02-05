var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { Session } = require('inspector');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//below code is written to understand topic named SESSION
app.use(session({
  resave:false, //agar session ki vlaue change na hui ho toh firse save mat krna. Naitoh server pai load hoga agr bar bar resave hoga toh
  saveUninitialized: false, //koi unsaved files or jis file ka naam na ho vo bhejte ho toh vaise files save na ho
  secret:'secret key' //secret k bases pai data encrypted kiya jaega.
}));
//-----------------------------------------------------//


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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


/* Create Session
req.session.randomname = randomvalue;

Read Session
req.session.randomname

Delete Session
req.session.destroy*/

/*--------------------------------------*/

/*Cookie Setup
res.cookie("name", value);

cookie reading
req.cookies.name

cookie delete
res.clearCookie("name")*/