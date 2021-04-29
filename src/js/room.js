const socket = io();

document.addEventListener("DOMContentLoaded", () => {
  const username = getUsername();

  if (!username) {
    window.location.href = window.location.origin;
  }

  socket.emit("join", username);
  socket.on("roomUsers", users => {
    console.log("Users:", users);
  });
});

function getUsername() {
  const pageUrl = new URL(window.location.href);
  return pageUrl.searchParams.get("user") || "";
}
