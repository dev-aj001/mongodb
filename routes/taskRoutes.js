const express = require('express');

const taskController 
    = require('../controllers/taskController');

const authenticateToken = 
    require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authenticateToken, taskController.getAllTasks);
router.post('/', authenticateToken, taskController.createTask);
router.put('/:id', authenticateToken, taskController.updateTask);
router.delete('/:id', authenticateToken, taskController.deleteTask);

module.exports = router;
