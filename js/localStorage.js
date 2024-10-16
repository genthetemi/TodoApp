// localstorage.js

export function saveToLocalStorage(projects) {
    localStorage.setItem('projects', JSON.stringify(projects));
}

export function loadFromLocalStorage() {
    const projectsData = localStorage.getItem('projects');
    return projectsData ? JSON.parse(projectsData) : [];
}
