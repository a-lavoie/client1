var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var lands = require('./server/models/lands.js');
var fs = require('fs');
var models = {};

//var config = require('./config.js');
var mongo = require('mongodb');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;   
mongoose.connect('mongodb://localhost/client1');

var dirModelFiles = __dirname + '/server/models/';
fs.readdirSync(dirModelFiles).forEach(function(filename){
  if ( ~filename.indexOf('.js')){
    modelName = path.basename(filename, '.js');
    var m = require(dirModelFiles + filename); 
  } 
}); 

var ExSchema = new Schema ({  
  id: Number,
  name: String,
  details: String,
  updated: Date,
  other: String,
  username: String,
  email: String,
  commercialName: String,
  size: Number,
  updatedDescription: Date
});


var LandModel = mongoose.model('LandModel', ExSchema, 'landcollection');
client1 = { locals: {} };
client1.locals.LandModel = LandModel;

// LandModel.findOne(function(err, doc){
//    console.log('error: ' + err); 
//    console.log('doc: ' + doc);
//    debugger;
//    console.log('détails:' + doc.name); 
// });


// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico')); 
app.use(logger('dev'));
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
    console.log("Entering in Error Not Found !");
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
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
