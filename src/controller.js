import { project } from "./project";
import * as todo from "./project.js";
import "./styles.css";
import trashIcon from "./images/trash-can.png";

//

const initStorage = () => {
  if (!localStorage.getItem("projects")) {
    localStorage.setItem("projects", JSON.stringify(todo.projects));
  }

  if (!localStorage.getItem("tasks")) {
    localStorage.setItem("tasks", JSON.stringify(todo.tasks));
  }
};

const addProjectBtn = document.querySelector("#add-project");
const addTaskBtn = document.querySelector("#add-task");

const projectDialog = document.querySelector("#project-dialog");
const taskDialog = document.querySelector("#task-dialog");

const closeTaskDialog = document.querySelector("#close-task-dialog");
const closeProjectDialog = document.querySelector("#close-project-dialog");

const submitTaskForm = document.querySelector("#new-task-form");
const submitProjectForm = document.querySelector("#new-project-form");

const projectListDropdown = document.querySelector(".dropdown-content");

const projectsMenuInAddTaskForm = document.querySelector("#project-list");

const mainContent = document.querySelector("#main-content");

//Diplay current project and its tast in the main content area

projectListDropdown.addEventListener("click", (event) => {
  displayProjectDetails(event.target.textContent);
});

const updateDropDownContent = () => {
  populateProjects();
  populateOptionsInProjectList();
};

const displayProjectDetails = (projectName) => {
  mainContent.textContent = "";
  let projectPreview = document.createElement("div");
  projectPreview.classList.add("font-size-30", "project-Preview");
  let projectHeader = document.createElement("div");
  projectHeader.classList.add("project-title");
  projectHeader.textContent = projectName;
  let projectDeleteBtn = document.createElement("img");
  projectDeleteBtn.src = trashIcon;
  projectDeleteBtn.alt = "delete";
  projectDeleteBtn.title = "delete";
  projectDeleteBtn.classList.add("trash");
  projectDeleteBtn.addEventListener("click", (event) => {
    removeProjectFromList(projectName);
    mainContent.textContent = "";
    for (let task of JSON.parse(localStorage.getItem("tasks"))) {
      removeTaskFromTaskList(task, projectName);
    }

    updateDropDownContent();
  });

  projectPreview.appendChild(projectHeader);
  projectHeader.appendChild(projectDeleteBtn);
  mainContent.appendChild(projectPreview);

  if (getChildrenTasks(projectName).length > 0) {
    displayChildrenTasks(projectName);
  } else if (getChildrenTasks(projectName).length === 0) {
    let emptyMsg = document.createElement("div");
    emptyMsg.textContent = "No tasks yet";
    mainContent.appendChild(emptyMsg);
  }
};

const displayChildrenTasks = (projectName) => {
  for (let task of getChildrenTasks(projectName)) {
    let childTaskContainer = document.createElement("div");
    childTaskContainer.classList.add("childTaskContainer");

    let checkBox1 = document.createElement("input");
    checkBox1.type = "checkbox";
    checkBox1.classList.add("check-box");
    childTaskContainer.appendChild(checkBox1);

    let title = document.createElement("div");
    title.classList.add("task-title");
    title.textContent = task.title;
    childTaskContainer.appendChild(title);

    let description = document.createElement("div");
    description.classList.add("task-description");
    description.textContent = task.description;
    childTaskContainer.appendChild(description);

    let dueDate = document.createElement("div");
    dueDate.classList.add("task-duedate");
    dueDate.textContent = task.dueDate;
    childTaskContainer.appendChild(dueDate);

    let priority = document.createElement("div");
    priority.classList.add("task-priority");
    if (task.priority === "high") priority.classList.add("color-red");
    else if (task.priority === "low") priority.classList.add("color-green");
    priority.textContent = task.priority;
    childTaskContainer.appendChild(priority);

    let trash = document.createElement("img");
    trash.src = trashIcon;
    trash.alt = "trash";
    trash.title = "delete";
    trash.classList.add("trash");
    trash.addEventListener("click", () => {
      removeTaskFromTaskList(task.title, projectName);
      displayProjectDetails(projectName);
    });
    childTaskContainer.appendChild(trash);

    mainContent.appendChild(childTaskContainer);
  }
};

const removeTaskFromTaskList = (taskName, projectName) => {
  let newtasks = JSON.parse(localStorage.getItem("tasks")).filter(
    (item) => !(item.project === projectName && item.title === taskName),
  );
  todo.updateTasks(newtasks);
};

const removeProjectFromList = (projectName) => {
  let newprojects = JSON.parse(localStorage.getItem("projects")).filter(
    (item) => !(item.title === projectName),
  );
  todo.updateProjects(newprojects);
};

const populateOptionsInProjectList = () => {
  projectsMenuInAddTaskForm.textContent = "";
  for (let project of JSON.parse(localStorage.getItem("projects"))) {
    if (project.title !== "") {
      let projectItem = document.createElement("option");
      projectItem.textContent = project.title;
      projectItem.value = project.title;
      projectsMenuInAddTaskForm.appendChild(projectItem);
    }
  }
};

// This function populates the project list of the dropdown in the sidebar
const populateProjects = () => {
  projectListDropdown.textContent = "";
  for (let project of JSON.parse(localStorage.getItem("projects"))) {
    if (project.title !== "") {
      let projectDropdown = document.createElement("div");
      projectDropdown.textContent = project.title;
      projectListDropdown.appendChild(projectDropdown);
    }
  }
};

const getChildrenTasks = (parentName) =>
  JSON.parse(localStorage.getItem("tasks")).filter(
    (task) => task.project === parentName,
  );

addProjectBtn.addEventListener("click", (event) => {
  projectDialog.showModal();
});

addTaskBtn.addEventListener("click", (event) => {
  taskDialog.showModal();
});

closeTaskDialog.addEventListener("click", (event) => {
  taskDialog.close();
});

closeProjectDialog.addEventListener("click", (event) => {
  projectDialog.close();
});

submitTaskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let tasks = JSON.parse(localStorage.getItem("tasks"));

  tasks.push(
    todo.task(
      getInputValue("task-title"),
      getInputValue("project-list"),
      getInputValue("task-description"),
      getInputValue("date"),
      getRadioValue("priority"),
    ),
  );

  localStorage.setItem("tasks", JSON.stringify(tasks));

  submitTaskForm.reset();
  taskDialog.close();
});

submitProjectForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let isValid = true;
  for (let item of JSON.parse(localStorage.getItem("projects"))) {
    if (item.title === getInputValue("project-name")) isValid = false;
  }
  if (isValid) {
    let projects = JSON.parse(localStorage.getItem("projects"));
    projects.push(todo.project(getInputValue("project-name")));
    localStorage.setItem("projects", JSON.stringify(projects));

    console.log(JSON.parse(localStorage.getItem("projects")));
    populateProjects();
    populateOptionsInProjectList();
  }
  submitProjectForm.reset();
  projectDialog.close();
});

const getInputValue = (id) => {
  let input = document.getElementById(id);
  if (input.value === undefined) return "";
  else return input.value;
};

const getRadioValue = (name) => {
  const radios = document.getElementsByName(name);
  for (let radio of radios) {
    if (radio.checked) return radio.value;
  }
  return "";
};

// Load UI
document.addEventListener("DOMContentLoaded", () => {
  initStorage();
  populateProjects();
  populateOptionsInProjectList();
});
