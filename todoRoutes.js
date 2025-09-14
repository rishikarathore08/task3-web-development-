const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

// GET all todos with optional query parameters
router.get('/', todoController.getTodos);

// GET a specific todo by ID
router.get('/:todoId/', todoController.getTodoById);

// GET todos by due date
router.get('/agenda/', todoController.getTodosByDueDate);

// POST a new todo
router.post('/', todoController.createTodo);

// PUT to update a specific todo by ID
router.put('/:todoId/', todoController.updateTodo);

// DELETE a specific todo by ID
router.delete('/:todoId/', todoController.deleteTodo);

module.exports = router;