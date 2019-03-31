import './styles/main.scss';
import { Task, Project, manageList, taskList, projectList } from './modules/listBuilding';
import { sortUpcomingTasks, openModal, closeModal } from './modules/pageDisplay';
import { renderCalendar } from './modules/calendar';
import { generateForm } from './modules/forms';

const getValue = (name) => {
    return document.getElementsByName(name)[0].value;
}

generateForm("Task", "t");
generateForm("Project", "p");

const newTaskButton = document.querySelector(".add-task");
const taskForm = document.querySelector("#task-form-modal");
newTaskButton.onclick = () => {
    openModal("task-form-modal");
}
taskForm.firstElementChild.firstElementChild.onclick = () => {
    closeModal(taskForm);
}

const saveTaskButton = document.querySelector("#save-task");
saveTaskButton.onclick = (e) => {
    e.preventDefault();
    let task = Task(
        `t${taskList.length}`,
        getValue("t-title"),
        getValue("t-description"),
        new Date(`${getValue("t-date")} ${getValue("t-time")}`),
        new Date(getValue("t-due-date")),
        getValue("t-priority"),
        getValue("t-project")
    );
    manageList.addTaskToProject(task);
    closeModal(taskForm);
}

const newProjectButton = document.querySelector("#add-project");
const projectForm = document.querySelector("#project-form-modal");
newProjectButton.onclick = () => {
    openModal("project-form-modal");
}
projectForm.firstElementChild.firstElementChild.onclick = () => {
    closeModal(projectForm);
}

const saveProjectButton = document.querySelector("#save-project");
saveProjectButton.onclick = (e) => {
    e.preventDefault();
    let project = Project(
        `p${projectList.length}`,
        getValue("p-title"),
        getValue("p-description"),
        new Date(getValue("p-date")),
        new Date(getValue("p-due-date")),
        getValue("p-priority")
    );
    manageList.addProject(project);
    closeModal(projectForm);
}

renderCalendar();
sortUpcomingTasks();
