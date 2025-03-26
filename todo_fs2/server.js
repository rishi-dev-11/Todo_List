// // server.js
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bodyParser = require('body-parser');

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // MongoDB connection
// mongoose.connect('mongodb://localhost:27017/todo-app', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

// const todoSchema = new mongoose.Schema({
//     text: String,
//     completed: { type: Boolean, default: false },
// });

// const Todo = mongoose.model('Todo', todoSchema);

// // CRUD operations
// app.get('/todos', async (req, res) => {
//     const todos = await Todo.find();
//     res.json(todos);
// });

// app.post('/todos', async (req, res) => {
//     const newTodo = new Todo(req.body);
//     await newTodo.save();
//     res.json(newTodo);
// });

// app.put('/todos/:id', async (req, res) => {
//     const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updatedTodo);
// });

// app.delete('/todos/:id', async (req, res) => {
//     await Todo.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Todo deleted' });
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });



// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/todo-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const todoSchema = new mongoose.Schema({
    text: String,
    completed: { type: Boolean, default: false },
});

const Todo = mongoose.model('Todo', todoSchema);

// CRUD operations
app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

app.post('/todos', async (req, res) => {
    const newTodo = new Todo(req.body);
    await newTodo.save();
    res.json(newTodo);
});

app.put('/todos/:id', async (req, res) => {
    const { id } = req.params;
    const { text, completed } = req.body;

    try {
        const updatedTodo = await Todo.findByIdAndUpdate(id, { text, completed }, { new: true });
        if (!updatedTodo) {
            return res.status(404).send('Todo not found');
        }
        res.json(updatedTodo);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

app.delete('/todos/:id', async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo deleted' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});