const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static("src"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/src/public/index.html");
});

app.get("/room", (req, res) => {
  res.sendFile(__dirname + "/src/public/room.html");
});

io.on("connection", socket => {
  socket.on("join", username => {
    console.log(`${username} has joined.`);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
