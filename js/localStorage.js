export function saveToLocalStorage(projects) {
    localStorage.setItem('projects', JSON.stringify(projects));
}

export function loadFromLocalStorage() {
    const projects = JSON.parse(localStorage.getItem(''));
    return projects ? projects : [];
}