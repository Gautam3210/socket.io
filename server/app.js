const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");
const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // your React app origin
    methods: ["GET", "POST"],
  },
});

app.use(cors());

app.get("/", (req, res) => {
  res.send("hello world");
});

const users = new Map();

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("register", (userId) => {
    users.set(userId, socket.id); // Save the mapping
    console.log(`User ${userId} registered with socket ID ${socket.id}`);
   
  });

  socket.on("userMessage", ({ toUserId, message }) => {
    const targetSocketId = users.get(toUserId);
    console.log(targetSocketId)
    console.log(users)
    if (targetSocketId) {
      io.to(targetSocketId).emit("userMessage", {
        from: socket.id,
        message,
      });
    }
  });

  // socket.on("userMessage", (msg) => {
  //   console.log(socket.id);
  //   console.log("message : " + msg);
  //   io.emit("userMessage", msg);
  // });
});

server.listen(5000, () => {
  console.log("server is running....");
});
