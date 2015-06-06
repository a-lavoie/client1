
var express  = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');

server.listen(3001);

debugger;
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/io_index.html');
});

app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    //debugger;
    console.log("Entering in Error Not Found !");
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

listOfConnexion = new Array();
connectionCount=0;

io.on('connection', function (socket) {
  listOfConnexion.push({id: connectionCount, link: socket});
  connectionCount++;
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) { 
    console.log("Received event: " + data);
  });
  socket.on('disconnect', function () {
    for ( i=0; i < listOfConnexion.length; ++i ){
      var client = listOfConnexion[i];
      if (client.link === socket){
        listOfConnexion.splice(i, 1);
        console.log("One client was disconnected");
      }
    }
  });
  socket.on('broadcast', function (data) { 
    console.log("broadcast message" + data);
    listOfConnexion.forEach(function(client){
      if (client.link != socket) client.link.emit("spread", data);
    });
  });
});


module.exports = app;
