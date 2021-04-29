const users = [];

function addUser(id, username) {
  const user = {
    id: id,
    name: username,
  };
  users.push(user);
}

function removeUser(id) {
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

function bet(id, value) {
  users.find(u => u.id === id).bet = value;
}

module.exports = {
  users,
  addUser,
  removeUser,
  bet,
};
