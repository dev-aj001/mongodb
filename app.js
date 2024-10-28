const express = require('express');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(bodyParser.json());
app.use('/tareas', taskRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res, next) => {
    res.send(
        `<h1>API RESTFULL de TASK con Firebase</h1> <p> Leer: <a href="docs.com">api-tasks-docs</a> para mas información.</p>`
    );
})

app.use((req, res, next) => {
    res.status(404).json({ code: 404, message: 'Ruta no encontrada' });
});

module.exports = app;