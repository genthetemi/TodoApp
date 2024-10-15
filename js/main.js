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
})