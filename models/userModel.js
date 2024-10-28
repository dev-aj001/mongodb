const bcrypt = require("bcryptjs");

let users = [
  {
    username: "user 1",
    password: bcrypt.hashSync("12345", 10), // Contraseña encriptada
  },
  {
    username: "user 2",
    password: bcrypt.hashSync("password", 10), // Contraseña encriptada
  },
];


function getUserByUsername(username) {
  return users.find((user) => user.username === username);
}

module.exports = {
  getUserByUsername
}