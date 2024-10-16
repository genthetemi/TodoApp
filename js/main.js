
import { projects, addProject, deleteProject } from './project.js';
import { createTodo, addTodoToProject, deleteTodoFromProject } from './todo.js';
import { saveToLocalStorage, loadFromLocalStorage } from './localStorage.js';

projects.push(...loadFromLocalStorage());


document.getElementById('addProjectButton').addEventListener('click', addNewProject);

function addNewProject() {
    const projectNameInput = document.getElementById('projectNameInput');
    const projectName = projectNameInput.value.trim();

    if (projectName) {
        addProject(projectName);
        saveToLocalStorage(projects); 
        projectNameInput.value = ''; 
        renderProjects();
    } else {
        alert('Please enter a project name.');
    }
}

// Render Projects
function renderProjects() {
    const projectsContainer = document.getElementById('projectsContainer');
    projectsContainer.innerHTML = ''; 

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
    saveToLocalStorage(projects); 
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
        saveToLocalStorage(projects); 
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
    todosContainer.innerHTML = ''; 
    const project = projects[currentProjectIndex];

    if (project) {
        project.todos.forEach((todo, todoIndex) => {
            const todoDiv = document.createElement('div');
            todoDiv.className = `todo-item priority-${todo.priority.toLowerCase()}`;

            
            const capitalizedDescription = todo.description.charAt(0).toUpperCase() + todo.description.slice(1);

            
            const buttonsDiv = document.createElement('div');
            buttonsDiv.className = 'description-container';

            
            const expandButton = document.createElement('button');
            expandButton.className = 'expand-description';
            expandButton.textContent = 'Show Description';
            buttonsDiv.appendChild(expandButton);

            
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = () => deleteTodo(todoIndex);
            buttonsDiv.appendChild(deleteButton);

            // Create a div for the description
            const descriptionDiv = document.createElement('div');
            descriptionDiv.className = 'todo-description';
            descriptionDiv.innerHTML = `<small>${capitalizedDescription}</small>`;
            descriptionDiv.style.display = 'none'; // Initially hidden

            
            todoDiv.innerHTML = `
                <div>
                    <strong>${todo.title}</strong> - ${todo.dueDate} 
                    <span class="priority">${todo.priority}</span>
                    <br>
                    <small>Project: ${project.name}</small>
                    <br>
                </div>
            `;

          
            todoDiv.appendChild(descriptionDiv);
            todoDiv.appendChild(buttonsDiv);
            todosContainer.appendChild(todoDiv);

           
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



function toggleDescription(item) {
    const description = item.querySelector('.todo-description');
    if (description.style.display === 'none') {
        description.style.display = 'block'; // Show description
    } else {
        description.style.display = 'none'; // Hide description
    }
}


window.deleteTodo = function(todoIndex) {
    const project = projects[currentProjectIndex];
    deleteTodoFromProject(project, todoIndex);
    saveToLocalStorage(projects); 
    renderTodos();
}


renderProjects();
