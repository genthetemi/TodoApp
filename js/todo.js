// todo.js

export function createTodo(title, description, dueDate, priority) {
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
