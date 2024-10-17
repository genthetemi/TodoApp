export function createTodo(title, description, dueDate, priority) {
    
    title = title.charAt(0).toUpperCase() + title.slice(1);
    
    return {
        title: title,
        description: description,
        dueDate: dueDate,
        priority: priority
    };
}


export function addTodoToProject(project, todo) {
    project.todos.push(todo);
}


export function deleteTodoFromProject(project, todoIndex) {
    project.todos.splice(todoIndex, 1);
}