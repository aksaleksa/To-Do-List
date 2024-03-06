import "./styles.css"
import { storeData, retrieveData} from "./storage.js"
import { Project } from "./classes.js"
import { viewProjects } from "./viewProjects.js";
import { viewTasks} from "./viewTasks.js";
import { viewUrgent } from "./viewUrgent.js";
import { viewCompleted } from "./viewCompleted.js"

const main = document.querySelector("#main");
const urgentTasks = document.querySelector("#urgent");
const completedTasks = document.querySelector("#completed");
const allProjects = document.querySelector("#view-projects")
const addProject = document.querySelector("#add-project");
const projectPopup = document.querySelector("#project-popup");
const projectForm = document.querySelector("#project-form");
const projectClose = document.querySelector("#project-close");
const projectName = document.querySelector("#project-name");
const projectCreate = document.querySelector("#project-create")

const taskPopup = document.querySelector("#task-popup");
const taskForm = document.querySelector("#task-form");
const taskClose = document.querySelector("#task-close");
const taskName = document.querySelector("#task-name");
const taskDescription = document.querySelector("#task-description");
const taskDue = document.querySelector("#task-due");
const taskUrgent = document.querySelector("#task-urgent");
const taskCreate = document.querySelector("#task-create");

let projects = [];
let projectIndex;
let taskIndex;

const exampleProject = new Project("Example Project");
exampleProject.addTask("Add features", "Make the app more functional", "2024-03-04", true);
exampleProject.addTask("Write tests", "Make sure the app doesn't break", "2024-03-03");
projects.push(exampleProject);
// storeData(projects);


urgentTasks.addEventListener("click", () => {
    main.innerHTML = "";
    viewUrgent(projects);
})

completedTasks.addEventListener("click", () => {
    main.innerHTML = "";
    viewCompleted(projects);
})

allProjects.addEventListener("click", () => {
    main.innerHTML = "";
    viewProjects(projects);
})

addProject.addEventListener("click", () => {
    projectPopup.showModal();
})

projectClose.addEventListener("click", (e) => {
    projectForm.reset();
    projectPopup.close();
    e.preventDefault();
})

// Simple imperfect form validation. To be improved later, plus validation for new
// tasks.

projectCreate.addEventListener("click", (e) => {
    e.preventDefault();
    if (!projectName.value) {
        projectName.setCustomValidity("Please give your project a name");
    }
    else {
        projectName.setCustomValidity("");
        let name = projectName.value;
        projects.push(new Project(name));
        storeData(projects);
        projectForm.reset();
        projectPopup.close();
        main.innerHTML = "";
        viewProjects(projects);
    }    
})

taskClose.addEventListener("click", (e) => {
    taskForm.reset();
    taskPopup.close();
    e.preventDefault();
})


taskCreate.addEventListener("click", (e) => {
    const project = projects[projectIndex];
    const name = taskName.value;
    const description = taskDescription.value;
    const dueDate = taskDue.value;
    const urgent = taskUrgent.checked;
    project.addTask(name, description, dueDate, urgent);
    storeData(projects);
    taskForm.reset();
    taskPopup.close();
    main.innerHTML = "";
    viewTasks(project);
    e.preventDefault();
})

viewProjects(projects);

// window.addEventListener("load", () => {
//     if (!localStorage.myProjects) {
//         const exampleProject = new Project("Example Project");
//         exampleProject.addTask("Add features", "Make the app more functional", "2024-03-04", true);
//         exampleProject.addTask("Write tests", "Make sure the app doesn't break", "2024-03-03");
//         projects.push(exampleProject);
//         storeData(projects);
//     }
//     projects = retrieveData();
//     viewProjects(projects);
// })

export {projects, projectIndex, taskIndex}