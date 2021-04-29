const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const { users, addUser, removeUser, bet, resetBet } = require("./server/users");

app.use(express.static("src"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/src/public/index.html");
});

app.get("/room", (req, res) => {
  res.sendFile(__dirname + "/src/public/room.html");
});

io.on("connection", socket => {
  socket.on("join", username => {
    addUser(socket.id, username);
    io.emit("refreshRoom", users);
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
    io.emit("refreshRoom", users);
  });

  socket.on("bet", value => {
    bet(socket.id, value);
    io.emit("refreshRoom", users);
  });

  socket.on("showCards", () => {
    io.emit("showCards", users);
  });

  socket.on("clear", () => {
    resetBet();
    io.emit("refreshRoom", users);
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
