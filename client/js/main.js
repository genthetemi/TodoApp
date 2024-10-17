// client/js/main.js

const API_URL = 'http://localhost:3000';

async function fetchProjects() {
    const response = await fetch(`${API_URL}/projects`);
    return response.json();
}

async function renderProjects() {
    const projects = await fetchProjects();
    const projectsContainer = document.getElementById('projectsContainer');
    projectsContainer.innerHTML = '';

    projects.forEach((project, index) => {
        const projectDiv = document.createElement('div');
        projectDiv.className = 'project-item';
        projectDiv.innerHTML = `
            <strong>${project.name}</strong>
            <button onclick="selectProject(${index})">Select</button>
            <button onclick="deleteProject(${project.id})">Delete</button>
        `;
        projectsContainer.appendChild(projectDiv);
    });
}

let currentProjectIndex = null;

window.selectProject = function(index) {
    currentProjectIndex = index;
    renderTodos();
};

document.getElementById('addProjectButton').addEventListener('click', async () => {
    const projectNameInput = document.getElementById('projectNameInput');
    const projectName = projectNameInput.value.trim();

    if (projectName) {
        await fetch(`${API_URL}/projects`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: projectName })
        });
        projectNameInput.value = '';
        renderProjects();
    } else {
        alert('Please enter a project name.');
    }
});

window.deleteProject = async function(id) {
    await fetch(`${API_URL}/projects/${id}`, { method: 'DELETE' });
    renderProjects();
};

async function fetchTodos() {
    const response = await fetch(`${API_URL}/todos?project=${currentProjectIndex}`);
    return response.json();
}

async function renderTodos() {
    const todos = await fetchTodos();
    const todosContainer = document.getElementById('todosContainer');
    todosContainer.innerHTML = '';

    todos.forEach((todo, todoIndex) => {
        const todoDiv = document.createElement('div');
        todoDiv.className = `todo-item priority-${todo.priority.toLowerCase()}`;
        todoDiv.innerHTML = `
            <strong>${todo.title}</strong> - ${todo.dueDate}
            <span class="priority">${todo.priority}</span>
            <br>
            <small>${todo.description}</small>
            <button onclick="deleteTodo(${todo.id})">Delete</button>
        `;
        todosContainer.appendChild(todoDiv);
    });
}

document.getElementById('addTodoButton').addEventListener('click', async () => {
    if (currentProjectIndex === null) {
        alert('Please select a project to add todos.');
        return;
    }

    const titleInput = document.getElementById('todoTitleInput');
    const descriptionInput = document.getElementById('todoDescriptionInput');
    const dueDateInput = document.getElementById('todoDueDateInput');
    const priorityInput = document.getElementById('todoPriorityInput');

    const todo = {
        title: titleInput.value.trim(),
        description: descriptionInput.value.trim(),
        dueDate: dueDateInput.value,
        priority: priorityInput.value
    };

    if (todo.title && todo.description && todo.dueDate) {
        await fetch(`${API_URL}/todos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...todo, project: currentProjectIndex })
        });
        titleInput.value = '';
        descriptionInput.value = '';
        dueDateInput.value = '';
        renderTodos();
    } else {
        alert('Please fill in all fields.');
    }
});

window.deleteTodo = async function(id) {
    await fetch(`${API_URL}/todos/${id}`, { method: 'DELETE' });
    renderTodos();
};

renderProjects();
