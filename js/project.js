export let projects = [];

// Create Project Object
export function createProject(name) {
    // Capitalize the first letter of the project name
    name = name.charAt(0).toUpperCase() + name.slice(1);
    
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
