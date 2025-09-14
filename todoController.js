const Todo = require('../models/todo');
const { formatDate } = require('../utils/dateFormatter');

// Create a new todo
exports.createTodo = async (req, res) => {
    const { id, todo, priority, status, category, dueDate } = req.body;

    // Validate input
    if (!['HIGH', 'MEDIUM', 'LOW'].includes(priority)) {
        return res.status(400).json({ message: 'Invalid Todo Priority' });
    }
    if (!['TO DO', 'IN PROGRESS', 'DONE'].includes(status)) {
        return res.status(400).json({ message: 'Invalid Todo Status' });
    }
    if (!['WORK', 'HOME', 'LEARNING'].includes(category)) {
        return res.status(400).json({ message: 'Invalid Todo Category' });
    }
    if (!formatDate(dueDate)) {
        return res.status(400).json({ message: 'Invalid Due Date' });
    }

    try {
        const newTodo = new Todo({
            id,
            todo,
            priority,
            status,
            category,
            due_date: formatDate(dueDate)
        });
        await newTodo.save();
        res.status(201).json({ message: 'Todo Successfully Added' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating todo', error });
    }
};

// Get all todos with optional filters
exports.getTodos = async (req, res) => {
    const { status, priority, category, search_q } = req.query;

    const filters = {};
    if (status) {
        if (!['TO DO', 'IN PROGRESS', 'DONE'].includes(status)) {
            return res.status(400).json({ message: 'Invalid Todo Status' });
        }
        filters.status = status;
    }
    if (priority) {
        if (!['HIGH', 'MEDIUM', 'LOW'].includes(priority)) {
            return res.status(400).json({ message: 'Invalid Todo Priority' });
        }
        filters.priority = priority;
    }
    if (category) {
        if (!['WORK', 'HOME', 'LEARNING'].includes(category)) {
            return res.status(400).json({ message: 'Invalid Todo Category' });
        }
        filters.category = category;
    }
    if (search_q) {
        filters.todo = { $regex: search_q, $options: 'i' }; // Case insensitive search
    }

    try {
        const todos = await Todo.find(filters);
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching todos', error });
    }
};

// Get a specific todo by ID
exports.getTodoById = async (req, res) => {
    const { todoId } = req.params;

    try {
        const todo = await Todo.findById(todoId);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching todo', error });
    }
};

// Update a specific todo by ID
exports.updateTodo = async (req, res) => {
    const { todoId } = req.params;
    const updates = req.body;

    try {
        const todo = await Todo.findById(todoId);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        // Validate updates
        if (updates.status && !['TO DO', 'IN PROGRESS', 'DONE'].includes(updates.status)) {
            return res.status(400).json({ message: 'Invalid Todo Status' });
        }
        if (updates.priority && !['HIGH', 'MEDIUM', 'LOW'].includes(updates.priority)) {
            return res.status(400).json({ message: 'Invalid Todo Priority' });
        }
        if (updates.category && !['WORK', 'HOME', 'LEARNING'].includes(updates.category)) {
            return res.status(400).json({ message: 'Invalid Todo Category' });
        }
        if (updates.dueDate && !formatDate(updates.dueDate)) {
            return res.status(400).json({ message: 'Invalid Due Date' });
        }

        Object.assign(todo, updates);
        await todo.save();
        res.status(200).json({ message: 'Todo Updated' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating todo', error });
    }
};

// Delete a specific todo by ID
exports.deleteTodo = async (req, res) => {
    const { todoId } = req.params;

    try {
        const todo = await Todo.findByIdAndDelete(todoId);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json({ message: 'Todo Deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting todo', error });
    }
};