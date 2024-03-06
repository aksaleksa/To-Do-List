class Task {
    constructor(name, description, dueDate, urgent) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.urgent = urgent;
        this.finished = false;
    }
}

class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }
    addTask(name, description, dueDate, urgent) {
        this.tasks.push(new Task(name, description, dueDate, urgent));
    }
    deleteTask(name) {
        for (let task of this.tasks) {
            if (task.name === name) {
                let index = this.tasks.indexOf(task);
                this.tasks.splice(index, 1);
            }
        }
    }
}

export {Task, Project}