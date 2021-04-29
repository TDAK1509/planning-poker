const socket = io();

document.addEventListener("DOMContentLoaded", () => {
  const username = _getUsername();

  if (!username) {
    window.location.href = window.location.origin;
  }

  socket.emit("join", username);
  socket.on("refreshRoom", users => {
    _setUpSeats(users);
  });
});

function _getUsername() {
  const pageUrl = new URL(window.location.href);
  return pageUrl.searchParams.get("user") || "";
}

function _setUpSeats(users) {
  const table = document.getElementById("table");
  table.innerHTML = "";

  users.forEach(user => {
    const bet = user.bet || "?";
    const name = user.name;
    const li = document.createElement("li");
    li.innerHTML = `<div>${bet}</div><p>${name}</p>`;
    table.appendChild(li);
  });
}

function bet(value) {
  socket.emit("bet", value);
}
