const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const JWT_SECRET = "claveSecreta";
const JWT_EXPIRES_IN = "60s";

async function login(req, res) {
  const { username, password } = req.body;
  const user = userModel.getUserByUsername(username);
  if (!user)
    return res
      .status(403)
      .json({ code: 403, message: "Usuario no encontrado" });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid)
    return res
      .status(403)
      .json({ code: 403, message: "Contraseña incorrecta" });

  const token = jwt.sign({ username: user.username }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  return res.status(200).json({
    code: 200,
    message: "Inicio de sesión exitoso",
    token,
  });
}

module.exports = { login, JWT_SECRET };
