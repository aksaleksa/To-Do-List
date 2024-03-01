import "./styles.css"
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

const exampleProject = new Project("Example Project");
exampleProject.addTask("Add features", "Make the app more functional", "Tomorrow", true);
exampleProject.addTask("Write tests", "Make sure the app doesn't break", "Today");
projects.push(exampleProject);


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

projectCreate.addEventListener("click", (e) => {
    let name = projectName.value;
    projects.push(new Project(name));
    projectForm.reset();
    projectPopup.close();
    main.innerHTML = "";
    viewProjects(projects);
    e.preventDefault();
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
    taskForm.reset();
    taskPopup.close();
    main.innerHTML = "";
    viewTasks(project);
    e.preventDefault();
})


viewProjects(projects);

export {projects, projectIndex}