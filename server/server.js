const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const cors = require("cors");

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
require("dotenv").config();

const { PORT = 8081 } = process.env;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
let users = [];
let messages = [];

io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on("users", () => {
    io.emit("usersResponse", users);
  });
  socket.on("messages", () => {
    io.emit("messagesResponse", messages);
  });
  socket.on("message", (data) => {
    messages.push(data);
    io.emit("messageResponse", data);
  });
  socket.on("newUser", (data) => {
    users.push(data);
    io.emit("newUserResponse", users);
  });
  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
    users = users.filter((user) => user.socketID !== socket.id);
    io.emit("newUserResponse", users);
    socket.disconnect();
  });
});
server.listen(PORT || 8081, () => {
  console.log("Server is running");
});
