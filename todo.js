const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    todo: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['WORK', 'HOME', 'LEARNING'],
        required: true
    },
    priority: {
        type: String,
        enum: ['HIGH', 'MEDIUM', 'LOW'],
        required: true
    },
    status: {
        type: String,
        enum: ['TO DO', 'IN PROGRESS', 'DONE'],
        required: true
    },
    due_date: {
        type: Date,
        required: true
    }
}, { timestamps: true });

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;