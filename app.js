var express = require('express');
var session = require('express-session');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var settings = require('./config/application');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: settings.secret,
  resave: true,
  saveUninitialized: false,
  unset: 'destroy'
})); // session middleware
app.use(require('flash')());
app.use(express.static(path.join(__dirname, 'public')));

// router
var routes = require('./config/routes');
routes(app);

// socket.io
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var socket_io = require('./socket/index');
socket_io(io);

// start server
app.set('port', process.env.PORT || settings.port);
server.listen(app.get('port'), '0.0.0.0', function(){
  console.log('Express server listening on port ' + app.get('port'));
});
