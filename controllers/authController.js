const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const JWT_SECRET = "claveSecreta";
const JWT_EXPIRES_IN = "60m";

async function login(req, res) {
  const { username, password } = req.body;
  const user = await userModel.findOne({username});
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

async function register(req, res) {
  const { username, password } = req.body;
  const user = await userModel.findOne({username});

  console.log(user);

  if(user){
    return res
      .status(403)
      .json({ code: 403, message: "Este usuario ya existe" });
  }

  const cryptpass = bcrypt.hashSync(password, 10);

  const nuevoUsuario = new userModel({
    username: username, 
    password: cryptpass
  });
  console.log(nuevoUsuario);

  await nuevoUsuario.save();
  return res
      .status(403)
      .json({ code: 403, message: "Registrado exitosamente" });
}

module.exports = { login, JWT_SECRET, register };
