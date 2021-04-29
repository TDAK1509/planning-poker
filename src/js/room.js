const socket = io();

document.addEventListener("DOMContentLoaded", () => {
  const username = getUsername();

  if (!username) {
    window.location.href = window.location.origin;
  }

  socket.emit("join", username);
});

function getUsername() {
  const pageUrl = new URL(window.location.href);
  return pageUrl.searchParams.get("user") || "";
}
