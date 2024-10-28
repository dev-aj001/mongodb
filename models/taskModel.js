const mongoose = require('mongoose');

const tareaSchema = new mongoose.Schema({
  username: { type: String, required: true },
  titulo: { type: String, required: true },
  descripcion: { type: String, required: false },
  estado: { type: Boolean, default: false }
});

const Tarea = mongoose.model('Tarea', tareaSchema);

module.exports = Tarea;