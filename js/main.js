// main.js
import { projects, addProject, deleteProject } from './project.js';
import { createTodo, addTodoToProject, deleteTodoFromProject } from './todo.js';
import { saveToLocalStorage, loadFromLocalStorage } from './localStorage.js';

// Load Projects from Local Storage
projects.push(...loadFromLocalStorage());

// Add New Project
document.getElementById('addProjectButton').addEventListener('click', addNewProject);

function addNewProject() {
    const projectNameInput = document.getElementById('projectNameInput');
    const projectName = projectNameInput.value.trim();

    if (projectName) {
        addProject(projectName);
        saveToLocalStorage(projects); // Save to local storage
        projectNameInput.value = ''; // Clear the input
        renderProjects();
    } else {
        alert('Please enter a project name.');
    }
}

// Render Projects
function renderProjects() {
    const projectsContainer = document.getElementById('projectsContainer');
    projectsContainer.innerHTML = ''; // Clear previous projects

    projects.forEach((project, index) => {
        const projectDiv = document.createElement('div');
        projectDiv.className = 'project-item';
        projectDiv.innerHTML = `
            <strong>${project.name}</strong>
            <button onclick="selectProject(${index})">Select</button>
            <button onclick="deleteProject(${index})">Delete</button>
        `;
        projectsContainer.appendChild(projectDiv);
    });
}

// Select Project
let currentProjectIndex = null;

window.selectProject = function(index) {
    currentProjectIndex = index;
    renderTodos();
};

// Delete Project
window.deleteProject = function(index) {
    deleteProject(index);
    saveToLocalStorage(projects); // Save to local storage
    renderProjects();
    renderTodos();
};

// Add Todo
document.getElementById('addTodoButton').addEventListener('click', addNewTodo);

function addNewTodo() {
    if (currentProjectIndex === null) {
        alert('Please select a project to add todos.');
        return;
    }

    const titleInput = document.getElementById('todoTitleInput');
    const descriptionInput = document.getElementById('todoDescriptionInput');
    const dueDateInput = document.getElementById('todoDueDateInput');
    const priorityInput = document.getElementById('todoPriorityInput');
    
    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
    const dueDate = dueDateInput.value;
    const priority = priorityInput.value;

    if (title && description && dueDate) {
        const todo = createTodo(title, description, dueDate, priority);
        addTodoToProject(projects[currentProjectIndex], todo);
        saveToLocalStorage(projects); // Save to local storage
        titleInput.value = '';
        descriptionInput.value = '';
        dueDateInput.value = '';
        renderTodos();
    } else {
        alert('Please fill in all fields.');
    }
}

// Render Todos
function renderTodos() {
    const todosContainer = document.getElementById('todosContainer');
    todosContainer.innerHTML = '';
    const project = projects[currentProjectIndex];

    if (project) {
        project.todos.forEach((todo, todoIndex) => {
            const todoDiv = document.createElement('div');
            todoDiv.className = `todo-item priority-${todo.priority.toLowerCase()}`;
            todoDiv.innerHTML = `
                <div>
                    <strong>${todo.title}</strong> - ${todo.dueDate} 
                    <span class="priority">${todo.priority}</span>
                    <br>
                    <small>Project: ${project.name}</small>
                    <br>
                    <button onclick="deleteTodo(${todoIndex})">Delete</button>
                </div>
            `;
            todosContainer.appendChild(todoDiv);
        });
    } else {
        todosContainer.innerHTML = `<p>Select a project to view its todos.</p>`;
    }
}

// Delete Todo
window.deleteTodo = function(todoIndex) {
    const project = projects[currentProjectIndex];
    deleteTodoFromProject(project, todoIndex);
    saveToLocalStorage(projects); // Save to local storage
    renderTodos();
}

// Initial Render
renderProjects();
