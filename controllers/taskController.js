const taskModel = require("../models/taskModel");

async function getAllTasks(req, res) {
  const username = req.user.username;
  
  const tareas = await taskModel.find();

  const tareasPorUsuario = tareas.filter((tarea) => tarea.username === username);

  if(!tareasPorUsuario || tareasPorUsuario.length == 0)
    res.status(404).json({ code:404, message: "No se encontraron tareas" });

  if (tareasPorUsuario.length > 0) 
    res.status(200).json(tareasPorUsuario);
}

async function createTask(req, res) {
  const username = req.user.username;
  //Validaciones de estructura

  if(!req.body.titulo){
    return res.status(400).json({message: "El atributo 'titulo' es requerido! "});
  }

  const nuevaTarea = new taskModel({
    username: username, 
    titulo: req.body.titulo,
    descripcion: req.body.descripcion || "",
    estado: false
  });

  try {
    await nuevaTarea.save();
    res.status(201).json(nuevaTarea);
  } catch (error) {
    res.status(500).json({ message: "Error al guardar la tarea", error: error.message });
  }
}

async function updateTask(req, res) {
  const username = req.user.username;
  const taskId = req.params.id;

  // Validaciones
  if (!req.body.titulo) {
    return res.status(400).json({ message: "El atributo 'titulo' es requerido!" });
  }

  const filter = {
    username,
    _id: taskId,
  };

  const update = {
    titulo: req.body.titulo,
  };

  // Solo agrega `descripcion` si está presente en el body de la solicitud
  if (req.body.descripcion !== undefined) {
    update.descripcion = req.body.descripcion;
  }

  // Solo agrega `estado` si está presente y es de tipo booleano
  if (req.body.estado !== undefined) {
    if (typeof req.body.estado !== "boolean") {
      return res.status(400).json({ message: "El atributo 'estado' debe ser de tipo booleano!" });
    }
    update.estado = req.body.estado;
  }

  try {
    const updatedTask = await taskModel.findOneAndUpdate(filter, update, { new: true });

    if (!updatedTask) {
      return res.status(404).json({ message: "Tarea no encontrada o no autorizada para actualizar" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la tarea", error: error.message });
  }
}


async function deleteTask(req, res) {
  const username = req.user.username;
  const taskId = req.params.id;

  const filter = {
    username,
    _id: taskId,
  };

  try {
    const deletedTask = await taskModel.findOneAndDelete(filter);

    if (!deletedTask) {
      return res.status(404).json({ message: "Tarea no encontrada o no autorizada para eliminar" });
    }

    res.status(200).json(deletedTask);
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la tarea", error: error.message });
  }
}

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
}