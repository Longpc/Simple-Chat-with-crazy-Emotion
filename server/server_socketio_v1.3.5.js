var server = require('http').Server();
var socketIO = require('socket.io');
var io = socketIO.listen(server);
var userHash = {};

io.sockets.on('connection', function(socket){
 
  
  /////////
  console.log("connect " + socket.id);
  //console.log(socket);
  socket.on('join', function(data) {
    userHash[socket.id] = data.name;
    console.log(data.name + " da vao room");
    socket.broadcast.emit('join', {name : data.name});
    var listUser = "";
    for(var key in userHash) {
       listUser += userHash[key] + ", ";
    }
    socket.emit('init', listUser);
    
  });
  
  socket.on('message', function(data){
      console.log("message : " + data);
	  //io.sockets.emit('message', { message: data });
      socket.broadcast.emit('message', { message: data });
  });
  
  socket.on("upload", function(data) {
	  console.log("upload: " + data);
	  socket.broadcast.emit('upload', {upload: data});
  });
  
  socket.on('disconnect', function(){
      console.log("disconnect " + socket.id);
      socket.broadcast.emit('exit', {name: userHash[socket.id]});
      delete userHash[socket.id];
  });
  
  io.sockets.emit('hello', { value: "welcome" });
  ///////////////////////////////////
});
server.listen(8000);
console.log("SErver listening on port 8000");