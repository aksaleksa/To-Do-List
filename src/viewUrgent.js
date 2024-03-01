function viewUrgent(projects) {
    const main = document.querySelector("#main");
    const heading = document.createElement("h2");
    const board = document.createElement("div");

    heading.textContent = "Urgent Tasks";
    board.classList.add("task-board");

    for (let project of projects) {
        for (let task of project.tasks) {
            if (task.urgent) {
                const item = document.createElement("div");
                const name = document.createElement("p");
                const description = document.createElement("p");
                const dueDate = document.createElement("p");
                const completed = document.createElement("input");
                const deleteButton = document.createElement("button");

                item.classList.add("urgent-task");
                name.textContent = task.name;
                description.textContent = task.description;
                dueDate.textContent = task.dueDate
                completed.type = "checkbox";
                deleteButton.textContent = "X";

                completed.addEventListener("change", () => {
                    task.finished = true;
                    task.urgent = false;
                    board.removeChild(item);
                })

                deleteButton.addEventListener("click", () => {
                    let index = project.tasks.indexOf(task);
                    project.tasks.splice(index, 1);
                    board.removeChild(item)
                })

                item.appendChild(name);
                item.appendChild(description);
                item.appendChild(dueDate);
                item.appendChild(completed);
                item.appendChild(deleteButton);
                board.appendChild(item);
            }
        }
    }

    main.appendChild(heading);
    main.appendChild(board);
}

export { viewUrgent };