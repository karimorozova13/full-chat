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

// const socketIO = new Server(http, {
//   cors: {
//   origin: "http://localhost:3000",
//   },
// });
io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
});
server.listen(PORT || 8081, () => {
  console.log("Server is running");
});

// socketIO.on("connection", (socket) => {
//   console.log(`⚡: ${socket.id} user just connected!`);
//   socket.on("disconnect", () => {
//     console.log("🔥: A user disconnected");
//   });
// });

console.log("socketIO");

// app.get("/api", (req, res) => {
//   res.json({
//     message: "Hello world",
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server listening on ${PORT}`);
// });
