// Client side using socket.io

  //var socket = io.connect('http://192.168.2.30');
  var socket = io('192.168.2.30:3001/namespace').connect();
  socket.on('news', function (data) {
    console.log(data);
    $("#news").append(data);
    socket.emit('my other event', { my: 'data' });
  });

  $("#broadcast").bind('click', function(){
     socket.emit("broadcast", {msg: new Date()})
  });

  socket.on('spread', function (data) {
    console.log(data);
    var txt = "<p>" + data.msg + "</p>";
    $("#news").append(txt);
  });

