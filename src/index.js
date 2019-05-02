import './styles/main.scss';
import { sortUpcomingTasks } from './modules/miscTools';
import { generateForm, addFormSubmission } from './modules/forms';
import { openModal } from './modules/modals';
import { renderCalendar } from './modules/calendar';

let projectList = JSON.parse(window.localStorage.getItem('projectList'));

const newTaskButton = document.querySelector(".add-task");
generateForm("task", newTaskButton);
const taskForm = document.querySelector("#new-task");
const tfModal = document.querySelector("#task-form-modal");

const newProjectButton = document.querySelector("#add-project");
generateForm("project", newProjectButton);
const projectForm = document.querySelector("#new-project");
const pfModal = document.querySelector("#project-form-modal");

newTaskButton.onclick = () => {
    if (projectList === null || projectList.length === 0) {
        return alert("Please start a new project first.") 
    }
    taskForm.reset();
    openModal(tfModal);
}

newProjectButton.onclick = () => {
    projectForm.reset();
    openModal(pfModal);
}

addFormSubmission(taskForm);
addFormSubmission(projectForm);

renderCalendar();
sortUpcomingTasks();