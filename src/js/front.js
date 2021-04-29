const socket = io();

const form = document.getElementById("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("name").value;
  socket.emit("join", username);
});
