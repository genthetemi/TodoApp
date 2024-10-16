export let projects = [];


export function createProject(name) {

    name = name.charAt(0).toUpperCase() + name.slice(1);
    
    return {
        name: name,
        todos: []
    };
}

export function addProject(name) {
    const newProject = createProject(name);
    projects.push(newProject);
}


export function deleteProject(index) {
    projects.splice(index, 1);
}
