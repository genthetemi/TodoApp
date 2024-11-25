const express = require('express');
const cors = require('cors'); // Import the cors package
const app = express();
const port = 3000;

// Enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory storage for projects and todos
let projects = [];

// Sample project for initial testing
projects.push({ name: "Project 1", todos: [] });

// Endpoint to get all projects
app.get('/projects', (req, res) => {
    res.json(projects);
});

// Endpoint to create a new project
app.post('/projects', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Project name is required' });
    }

    const newProject = { name, todos: [] };
    projects.push(newProject);
    res.status(201).json(newProject);
});

// Endpoint to delete a project by index
app.delete('/projects/:index', (req, res) => {
    const index = req.params.index;

    if (index < 0 || index >= projects.length) {
        return res.status(404).json({ error: 'Project not found' });
    }

    const deletedProject = projects.splice(index, 1);
    res.json(deletedProject);
});

// Endpoint to get todos for a specific project
app.get('/projects/:index/todos', (req, res) => {
    const index = req.params.index;

    if (index < 0 || index >= projects.length) {
        return res.status(404).json({ error: 'Project not found' });
    }

    res.json(projects[index].todos);
});

// Endpoint to create a new todo for a specific project
app.post('/projects/:index/todos', (req, res) => {
    const index = req.params.index;
    const { title, description, dueDate, priority } = req.body;

    if (index < 0 || index >= projects.length) {
        return res.status(404).json({ error: 'Project not found' });
    }

    if (!title || !description || !dueDate) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const newTodo = { title, description, dueDate, priority };
    projects[index].todos.push(newTodo);
    res.status(201).json(newTodo);
});

// Endpoint to delete a todo from a specific project
app.delete('/projects/:projectIndex/todos/:todoIndex', (req, res) => {
    const projectIndex = req.params.projectIndex;
    const todoIndex = req.params.todoIndex;

    if (projectIndex < 0 || projectIndex >= projects.length) {
        return res.status(404).json({ error: 'Project not found' });
    }

    if (todoIndex < 0 || todoIndex >= projects[projectIndex].todos.length) {
        return res.status(404).json({ error: 'Todo not found' });
    }

    const deletedTodo = projects[projectIndex].todos.splice(todoIndex, 1);
    res.json(deletedTodo);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});