import ToDo from "./todo";
import Project from "./project";
import { saveToLocalStorage, loadFromLocalStorage } from './localStorage';

let projects = loadFromLocalStorage();
let currentProject = projects.length > 0 ? projects[0] : Project('Deafult Project'); projects.push(currentProject);

document.getElementById('add-project-btn').addEventListener('click', () => {
    const projectName = document.getElementById('new-project-name').value;
    if (projectName) {
        const newProject = Project(projectName);
        projects.push(newProject);
        renderProjects();
        saveToLocalStorage(projects);
    }
});

document.getElementById('add-todo-btn').addEventListener('click', () => {
    const title = document.getElementById('todo-title').value;
    const description = document.getElementById('todo-desc').value;
    const dueDate = document.getElementById('todo-due-date').value;
    const priority = document.getElementById('todo-priority').value;

    if (title && description && dueDate && priority){
        const todo = ToDo(title, description, dueDate, priority);
        currentProject.addTodo(todo);
        renderTodos(currentProject.getTodos());
        saveToLocalStorage(projects);
    }
});

function renderProjects() {
    const projectList = document.getElementById('project-list');
    projectList.innerHTML = '';
    projects.foreach((project, index) => {
        const li = document.createElement('li');
        li.addEventListener('click', () =>{
            currentProject = project;
            renderTodos(currentProject.getTodos());
        });
        projectList.appendChild(li);
    });
}

function renderTodos(todos){
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';
    todos.foreach((todo, index) => {
        const li = document.createElement('li');
        li.textContent = '${todo,title} - Due: ${todo.DueDate} - Priority: ${todo.priority}';
        todoList.appendChild(li);
    });
}

renderProjects();
renderTodos(currentProject.getTodos());