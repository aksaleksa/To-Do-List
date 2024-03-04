import { viewProjects } from "./viewProjects";
import { projects, projectIndex, taskIndex } from "./index.js"

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

    const editPopup = document.querySelector("#edit-popup");
    const editForm = document.querySelector("#edit-form");
    const editName = document.querySelector("#edit-name");
    const editDescription = document.querySelector("#edit-description");
    const editDue = document.querySelector("#edit-due");
    const editUrgent = document.querySelector("#edit-urgent");
    const editClose = document.querySelector("#edit-close");
    const editCreate = document.querySelector("#edit-create");

    for (let task of project.tasks) {        
        const item = document.createElement("div");
        const leftContainer = document.createElement("div");
        const rightContainer = document.createElement("div");
        const name = document.createElement("p");
        const description = document.createElement("p");
        const dueDate = document.createElement("p");
        const completed = document.createElement("input");
        const completedLabel = document.createElement("p");
        const buttonContainer = document.createElement("div");
        const editButton = document.createElement("button");
        const deleteButton = document.createElement("button");

        name.textContent = task.name;
        name.classList.add("task-name");
        description.textContent = task.description;
        dueDate.textContent = task.dueDate;
        completed.type = "checkbox";
        completedLabel.textContent = "Completed?";
        completedLabel.classList.add("completed-label");
        if (task.finished) completed.checked = true;
        editButton.textContent = "Edit";
        deleteButton.textContent = "Remove";
        if (task.urgent) item.classList.add("urgent-task");

        completed.addEventListener("change", () => {
            if (completed.checked) {
                if (task.urgent) {
                    item.classList.remove("urgent-task");
                    task.urgent = false;
                }
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

        editButton.addEventListener("click", () => {
            taskIndex = project.tasks.indexOf(task);
            editPopup.showModal();
            editName.value = task.name;
            editDescription.value = task.description;
            editDue.value = task.dueDate;
            editUrgent.checked = task.urgent;
        })

        leftContainer.appendChild(name);
        leftContainer.appendChild(description);
        leftContainer.appendChild(dueDate);
        rightContainer.appendChild(completedLabel);
        rightContainer.appendChild(completed);
        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(deleteButton);
        rightContainer.appendChild(buttonContainer);
        item.appendChild(leftContainer);
        item.appendChild(rightContainer)
        board.appendChild(item);
    }

    addButton.addEventListener("click", () => {
        taskPopup.showModal();
    })

    projectButton.addEventListener("click", () => {
        main.innerHTML = "";
        viewProjects(projects);
    })

    editCreate.addEventListener("click", (e) => {
        const editTask = projects[projectIndex].tasks[taskIndex];
        editTask.name = editName.value;
        editTask.description = editDescription.value;
        editTask.dueDate = editDue.value;
        editTask.urgent = editUrgent.checked;
        editPopup.close();
        main.innerHTML = "";
        viewTasks(projects[projectIndex]);
        e.preventDefault();
    })

    editClose.addEventListener("click", (e) => {
        editForm.reset();
        editPopup.close();
        e.preventDefault();
    })

    main.appendChild(heading);
    buttons.appendChild(addButton);
    buttons.appendChild(projectButton);
    main.appendChild(buttons);
    main.appendChild(board);
}

export { viewTasks };