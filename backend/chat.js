const app = require('express')
const http = require('http').createServer(app);
var io = require('socket.io')(http);


const chatInit = () => {


io.on('connection', (socket) => {
  console.log('new client connected', socket.id);

  socket.on('user_join', (name, room) => {
    console.log(name, room)
    socket.join(room)
    socket.to(room).emit('user_join', name);
  });

  // socket.on()

  socket.on('message', ({room, name, message}) => {
    // console.log(name, message, socket.id);
    io.to(room).emit('message', {name, message});
  });

  socket.on('disconnect', () => {
    console.log('Disconnect Fired');
  });
  
});

http.listen(4000, () => {
    console.log(`listening on *:${4000}`);
  });
}

module.exports={
    chatInit
}