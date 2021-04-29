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

module.exports = {
  users,
  addUser,
  removeUser,
};
