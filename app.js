var express = require('express');
var app = express();
var io_server = require('http').Server(require('express')());
var io = require('socket.io')(io_server);
    io.set('origins', {'localhost:3001':'*', '192.168.2.30:3001': '*'});
    io_server.listen(3001);
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var lands = require('./server/models/lands.js');
var fs = require('fs');
var models = {};
var mlands = require('./server/models/lands');

//var config = require('./config.js');
var mongo = require('mongodb');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;   
mongoose.connect('mongodb://localhost/client1');


client1 = { locals: {} };
client1.locals.optionsCreation = false;
if (client1.locals.optionsCreation){
   var dirModelFiles = __dirname + '/server/models/';
   fs.readdirSync(dirModelFiles).forEach(function(filename){
     if ( ~filename.indexOf('.js')){
       console.log('Loading file: ' + filename);
       modelName = path.basename(filename, '.js');
       var m = require(dirModelFiles + filename);  
     } 
   }); 
} else {
    client1.locals.mlands = mlands;
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico')); 
app.use(logger('dev'));

app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
        next();
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

var routes = require('./routes/mindex');
var users = require('./routes/users');
app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    //debugger;
    console.log("Entering in Error Not Found !");
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    // app.use(session({secret: 'indeveloppement'});
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.send('error', {
            message: err.message,
            error: err
        });
    });
} else {

}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    console.log("Entering in Error Oups...");
    console.log("err = " + JSON.stringify(err));
    res.status(err.status || 500);
    res.send('error', {
        message: err.message,
        error: err
    });
    return;
});


module.exports = app;
