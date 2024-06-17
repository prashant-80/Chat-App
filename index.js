const express = require('express');
const { createServer } = require('node:http');
const app = express();
const server = createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const connect = require('./config/db-config')
const Group = require('./model/group')
const Chat = require('./model/chat')

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))




// app.use('/', express.static(__dirname + '/public'));

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('join_room', (data) => {
    console.log('joining the room with room id', data.roomid)
    socket.join(data.roomid)
  });

  socket.on('new_msg', async (data) => {
    console.log('fine')
    const chat  = await Chat.create({
      roomid:data.roomid,
      sender:data.sender,
      content:data.message
    })
    io.to(data.roomid).emit('msg_rcvd', data);
  })

});




app.get('/chat/:roomid/:user', async (req, res) => {
  const group = await Group.findById(req.params.roomid)
  console.log('fine')
  const chats = await Chat.find({
    roomid:req.params.roomid
  })
  console.log('fine')
  res.render('index', {
      roomid: req.params.roomid,
      user:req.params.user,
      groupname:group.name,
      previousmsgs:chats
    })
})

app.get('/group',async (req,res)=>{
  res.render('group')
})

app.post('/group',async (req,res)=>{
  console.log(req.body)
  await Group.create({
    name:req.body.name
  })
  res.redirect('/group')
  
})

server.listen(3000, async () => {
  console.log('server running at http://localhost:3000');
  await connect();
  console.log('db connected')
});