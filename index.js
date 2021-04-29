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

io.on("connection", socket => {
  socket.on("chat message", msg => {
    console.log("message: " + msg);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
