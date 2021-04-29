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

  socket.on("showCards", users => {
    _showCards(users);
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
    const li = document.createElement("li");
    li.innerHTML = `<div class="card hiding"></div><p>${user.name}</p>`;
    table.appendChild(li);
  });
}

function bet(value) {
  socket.emit("bet", value);
}

function showCards() {
  socket.emit("showCards");
}

function _showCards(users) {
  const table = document.getElementById("table");
  table.innerHTML = "";

  users.forEach(user => {
    const bet = user.bet || "😂";
    const name = user.name;
    const li = document.createElement("li");
    li.innerHTML = `<div class="card">${bet}</div><p>${name}</p>`;
    table.appendChild(li);
  });
}

function resetCards() {
  socket.emit("clear");
}
