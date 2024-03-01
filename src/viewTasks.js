import { viewProjects } from "./viewProjects";
import { projects } from "./index.js"

function viewTasks(project) {
    const main = document.querySelector("#main");
    const taskPopup = document.querySelector("#task-popup");
    const heading = document.createElement("h2")
    const buttons = document.createElement("div");
    const addButton = document.createElement("button");
    const projectButton = document.createElement("button");
    const board = document.createElement("div");

    heading.textContent = `${project.name}`;
    addButton.textContent = "Add New Task";
    addButton.id = "task-add";
    projectButton.textContent = "Back To Projects";
    projectButton.id = "projects-return";
    buttons.id = "task-buttons";
    board.classList.add("task-board");

    for (let task of project.tasks) {
        const item = document.createElement("div");
        const name = document.createElement("p");
        const description = document.createElement("p");
        const dueDate = document.createElement("p");
        const completed = document.createElement("input");
        const deleteButton = document.createElement("button");

        name.textContent = task.name;
        description.textContent = task.description;
        dueDate.textContent = task.dueDate;
        completed.type = "checkbox";
        if (task.finished) completed.checked;
        deleteButton.textContent = "X";
        if (task.urgent) item.classList.add("urgent-task");

        completed.addEventListener("change", () => {
            if (!completed.checked) {
                item.classList.add("completed-task");
                task.finished = true;
            }
            else {
                item.classList.remove("completed-task");
                task.finished = false;
            }
        })

        deleteButton.addEventListener("click", () => {
            if (confirm("Are you sure you want to delete this task?")) {
                let index = project.tasks.indexOf(task);
                project.tasks.splice(index, 1);
                board.removeChild(item);
            }
        })

        item.appendChild(name);
        item.appendChild(description);
        item.appendChild(dueDate);
        item.appendChild(completed);
        item.appendChild(deleteButton);
        board.appendChild(item);
    }

    addButton.addEventListener("click", () => {
        taskPopup.showModal();
    })

    projectButton.addEventListener("click", () => {
        main.innerHTML = "";
        viewProjects(projects);
    })

    main.appendChild(heading);
    buttons.appendChild(addButton);
    buttons.appendChild(projectButton);
    main.appendChild(buttons);
    main.appendChild(board);
}

export { viewTasks };