const form = document.getElementById("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("name").value;
  _sendJoinEventToUsergram(username);
  window.location.href = `${window.location.origin}/room?user=${username}`;
});

function _sendJoinEventToUsergram(username) {
  ugattr["serviceId"] = username;
  usergram.push(["send", "Ugo97x-1", "event", "poker_join", ugattr]);
}
