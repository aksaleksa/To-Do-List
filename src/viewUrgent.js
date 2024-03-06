import { viewTasks } from "./viewTasks";

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
                const leftContainer = document.createElement("div");
                const rightContainer = document.createElement("div");
                const name = document.createElement("p");
                const description = document.createElement("p");
                const dueDate = document.createElement("p");
                const completed = document.createElement("input");
                const completedLabel = document.createElement("p");

                // item.classList.add("urgent-task");
                name.textContent = task.name;
                name.classList.add("task-name");
                description.textContent = task.description;
                dueDate.textContent = task.dueDate
                completed.type = "checkbox";
                completedLabel.textContent = "Completed?"
                completed.classList.add("task-complete");

                item.addEventListener("click", (e) => {
                    if (e.target.classList.contains("task-complete")) {
                        task.finished = true;
                        task.urgent = false;
                        board.removeChild(item);
                    }
                    else {
                        main.innerHTML = "";
                        viewTasks(project)
                    }
                })

                completed.addEventListener("change", () => {
                    task.finished = true;
                    task.urgent = false;
                    board.removeChild(item);
                })

                // deleteButton.addEventListener("click", () => {
                //     let index = project.tasks.indexOf(task);
                //     project.tasks.splice(index, 1);
                //     board.removeChild(item)
                // })

                leftContainer.appendChild(name);
                leftContainer.appendChild(description);
                leftContainer.appendChild(dueDate);
                rightContainer.appendChild(completedLabel);
                rightContainer.appendChild(completed)
                item.appendChild(leftContainer);
                item.appendChild(rightContainer);
                board.appendChild(item);
            }
        }
    }

    main.appendChild(heading);
    main.appendChild(board);
}

export { viewUrgent };