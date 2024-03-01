function viewCompleted(projects) {
    const main = document.querySelector("#main");
    const heading = document.createElement("h2");
    const board = document.createElement("div");

    heading.textContent = "Completed Tasks";
    board.classList.add("task-board");

    for (let project of projects) {
        for (let task of project.tasks) {
            if (task.finished) {
                const item = document.createElement("div");
                const name = document.createElement("p");
                const description = document.createElement("p");
                const deleteButton = document.createElement("button");

                item.classList.add("completed-task");
                name.textContent = task.name;
                description.textContent = task.description;
                deleteButton.textContent = "X";

                deleteButton.addEventListener("click", () => {
                    let index = project.tasks.indexOf(task);
                    project.tasks.splice(index, 1);
                    board.removeChild(item)
                })

                item.appendChild(name);
                item.appendChild(description);
                item.appendChild(deleteButton);
                board.appendChild(item);
            }
        }
    }

    main.appendChild(heading);
    main.appendChild(board);
}

export { viewCompleted };