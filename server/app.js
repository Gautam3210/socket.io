
const express = require('express')
const cors = require('cors')
const { Server } = require("socket.io");
const http = require('http')
const app = express();


const server = http.createServer(app)

const io = new Server(server,{
  cors: {
    origin: "http://localhost:5173", // your React app origin
    methods: ["GET", "POST"]
  }
});

app.use(cors())

app.get('/', (req, res)=>{
  res.send('hello world')
})

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('userMessage', (msg)=>{
    console.log(socket.id)
    console.log('message : '+ msg)
    io.emit('userMessage',msg)
  })
});

// socket.on('userMessage', (msg)=>{
//   console.log('message : '+ msg)})

server.listen(5000, ()=>{
  console.log('server is running....')
})
