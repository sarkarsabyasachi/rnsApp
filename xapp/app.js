var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require("cors");

var index = require('./routes/index');
var users = require('./routes/users');
var consumer = require('./routes/consumer');
var payment = require('./routes/payment');

var app = express();
 
 var allowCrossDomain = function(req, res, next){
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type');
      next();
    }
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
//app.use(allowCrossDomain);
var prefix='/api';
//app.use(prefix+'/', index);
app.use(prefix+'/users', users);
app.use(prefix+'/consumer', consumer);
app.use(prefix+'/payment', payment);


app.use(function(req,res,next){
  console.log('iam listennning');
  //console.log(req);
  res.json(JSON.parse(JSON.stringify(req)));
  
  next();
  console.log('am i still listenning......');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log("req.baseUrl############################");
  console.log(req.baseUrl);
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
