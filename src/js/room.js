const socket = io();

document.addEventListener("DOMContentLoaded", () => {
  const username = _getUsername();

  if (!username) {
    window.location.href = window.location.origin;
  }

  _initUsergramServiceId(username);

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

function _initUsergramServiceId(serviceId) {
  ugattr["serviceId"] = serviceId;
}

function _setUpSeats(users) {
  const table = document.getElementById("table");
  table.innerHTML = "";

  users.forEach(user => {
    const cardClass = user.bet ? "card card--selected" : "card";
    const li = document.createElement("li");
    li.innerHTML = `<div class="${cardClass}"></div><p>${user.name}</p>`;
    table.appendChild(li);
  });
}

function bet(value) {
  socket.emit("bet", value);
  _sendBetEventToUsergram();
}

function _sendBetEventToUsergram() {
  usergram.push(["send", "Ugo97x-1", "event", "poker_bet", ugattr]);
}

function showCards() {
  socket.emit("showCards");
  _sendConversionToUsergram();
}

function _sendConversionToUsergram() {
  usergram.push(["send", "Ugo97x-1", "cv", "poker", ugattr]);
}

function _showCards(users) {
  const table = document.getElementById("table");
  table.innerHTML = "";

  users.forEach(user => {
    const bet = user.bet || "😂";
    const name = user.name;
    const li = document.createElement("li");
    li.innerHTML = `<div class="card card--show"><span>${bet}</span></div><p>${name}</p>`;
    table.appendChild(li);
  });
}

function resetCards() {
  socket.emit("clear");
  _sendResetEventToUsergram();
}

function _sendResetEventToUsergram() {
  usergram.push(["send", "Ugo97x-1", "event", "poker_reset", ugattr]);
}
