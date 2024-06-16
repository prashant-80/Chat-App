const express = require('express');
const { createServer } = require('node:http');
const app = express();
const server = createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const connect = require('./config/db-config')

app.set('view engine', 'ejs')
app.use('/', express.static(__dirname + '/public'));

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('join_room', (data) => {
    console.log('joining the room with room id', data.roomid)
    socket.join(data.roomid)
  });

  socket.on('new_msg', (data) => {
    io.to(data.roomid).emit('msg_rcvd', data);
  })

});




app.get('/chat/:roomid/:user', async (req, res) => {
  res.render('index', {
      roomid: req.params.roomid,
      user:req.params.user 
    })
})

app.get('/group',async (req,res)=>{
  res.render('group')
})

server.listen(3000, async () => {
  console.log('server running at http://localhost:3000');
  await connect();
  console.log('db connected')
});