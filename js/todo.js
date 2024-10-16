export function createTodo(title, description, dueDate, priority) {
    // Capitalize the first letter of the title
    title = title.charAt(0).toUpperCase() + title.slice(1);
    
    return {
        title: title,
        description: description,
        dueDate: dueDate,
        priority: priority
    };
}

// Add Todo to Project
export function addTodoToProject(project, todo) {
    project.todos.push(todo);
}

// Delete Todo from Project
export function deleteTodoFromProject(project, todoIndex) {
    project.todos.splice(todoIndex, 1);
}