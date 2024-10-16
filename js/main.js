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

function renderTodos() {
    const todosContainer = document.getElementById('todosContainer');
    todosContainer.innerHTML = ''; // Clear previous todos
    const project = projects[currentProjectIndex];

    if (project) {
        project.todos.forEach((todo, todoIndex) => {
            const todoDiv = document.createElement('div');
            todoDiv.className = `todo-item priority-${todo.priority.toLowerCase()}`;

            // Capitalize the first letter of the description
            const capitalizedDescription = todo.description.charAt(0).toUpperCase() + todo.description.slice(1);

            // Create the buttons container
            const buttonsDiv = document.createElement('div');
            buttonsDiv.className = 'description-container';

            // Create and append the Show Description button
            const expandButton = document.createElement('button');
            expandButton.className = 'expand-description';
            expandButton.textContent = 'Show Description';
            buttonsDiv.appendChild(expandButton);

            // Create and append the Delete button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = () => deleteTodo(todoIndex);
            buttonsDiv.appendChild(deleteButton);

            // Create a div for the description
            const descriptionDiv = document.createElement('div');
            descriptionDiv.className = 'todo-description';
            descriptionDiv.innerHTML = `<small>${capitalizedDescription}</small>`;
            descriptionDiv.style.display = 'none'; // Initially hidden

            // Set up the main todo structure
            todoDiv.innerHTML = `
                <div>
                    <strong>${todo.title}</strong> - ${todo.dueDate} 
                    <span class="priority">${todo.priority}</span>
                    <br>
                    <small>Project: ${project.name}</small>
                    <br>
                </div>
            `;

            // Append the description above the buttons
            todoDiv.appendChild(descriptionDiv);
            todoDiv.appendChild(buttonsDiv);
            todosContainer.appendChild(todoDiv);

            // Add event listener to toggle the description visibility
            expandButton.addEventListener('click', () => {
                if (descriptionDiv.style.display === 'none') {
                    descriptionDiv.style.display = 'block';
                    expandButton.textContent = 'Hide Description';
                } else {
                    descriptionDiv.style.display = 'none';
                    expandButton.textContent = 'Show Description';
                }
            });
        });
    } else {
        todosContainer.innerHTML = `<p>Select a project to view its todos.</p>`;
    }
}


// Toggle Description Function
function toggleDescription(item) {
    const description = item.querySelector('.todo-description');
    if (description.style.display === 'none') {
        description.style.display = 'block'; // Show description
    } else {
        description.style.display = 'none'; // Hide description
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
