const form = document.getElementById("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("name").value;
  window.location.href = `${window.location.origin}/room?user=${username}`;
});
