var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
const session = require('express-session')
require('dotenv').config()
const mongoose = require('mongoose')
const config = require('./config.json')

const authRoutes = require('./routes/auth')

var indexRoutes = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const MONGODB_URI = config.MONGO_URI
// Passport config
require('./config/passport-signup')(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret:'assjdndd',
  resave : false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRoutes);
app.use('/', indexRoutes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
mongoose
  .connect(MONGODB_URI)
  .then(result => {
      app.listen(process.env.PORT || 3000);
  })
  .catch(err => {
    console.log(err);
  });


module.exports = app;
