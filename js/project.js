// project.js

export let projects = [];

// Create Project Object
export function createProject(name) {
    return {
        name: name,
        todos: []
    };
}

// Add New Project
export function addProject(name) {
    const newProject = createProject(name);
    projects.push(newProject);
}

// Delete Project
export function deleteProject(index) {
    projects.splice(index, 1);
}
