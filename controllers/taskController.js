const taskModel = require("../models/taskModel");

async function getAllTasks(req, res) {
  const username = req.user.username;
  
  const tareas = await taskModel.find();

  const tareasPorUsuario = tareas.filter((tarea) => tarea.username === username);

  if(!tareasPorUsuario)
    res.status(404).json({ code:404, message: "No se encontraron tareas" });

  if (tareasPorUsuario.length > 0) 
    res.status(200).json(tareasPorUsuario);
  else 
    res.status(404).json({ code:404, message: "No se encontraron tareas" });
}

async function createTask(req, res) {
  const username = req.user.username;
  //Validaciones de estructura

  const nuevaTarea = new taskModel({
    username: username, 
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    estado: false
  });

  console.log(nuevaTarea);


  await nuevaTarea.save();

  res.status(201).json({message: "Creado existosamente"});
}

async function updateTask(req, res) {
  const username = req.user.username;
  const taskId = req.params.id;
  
  const filter = {
    username,
    _id: taskId
  }
  const update = {
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
      estado: req.body.estado
  }

  await taskModel.findOneAndUpdate(filter, update);
    res.status(201).json({message: "Actualizado existosamente"});
}

async function deleteTask(req, res) {
  const username = req.user.username;
  const taskId = req.params.id;
  
  const filter = {
    username,
    _id: taskId
  }

  await taskModel.findOneAndDelete(filter);
    res.status(201).json({message: "Eliminado existosamente"});
}

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
}