import { viewTasks}  from "./viewTasks";
import { projectIndex } from "./index.js";

function viewProjects(projects) {
    const main = document.querySelector("#main");
    const heading = document.createElement("h2");
    const board = document.createElement("div");
    heading.textContent = "Your Projects";
    board.classList.add("project-board");

    for (let project of projects) {
        const item = document.createElement("div");
        const name = document.createElement("p");
        const tasks = document.createElement("p")
        const deleteButton = document.createElement("button");

        name.textContent = project.name;
        tasks.textContent = `Tasks remaining: ${project.tasks.length}`;
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-button");

        item.addEventListener("click", (e) => {
            if (e.target.classList.contains("delete-button")) {
                if (confirm("Are you sure you want to delete this project?")) {
                    let index = projects.indexOf(project);
                    projects.splice(index, 1);
                    board.removeChild(item);
                }
            }
            else {
                projectIndex = projects.indexOf(project);
                main.innerHTML = "";
                viewTasks(project);
            }
        })

        item.appendChild(name);
        item.appendChild(tasks);
        item.appendChild(deleteButton);
        board.append(item);
    }
    main.appendChild(heading);
    main.appendChild(board);
}

export { viewProjects }