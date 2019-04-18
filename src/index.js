import './styles/main.scss';
import { sortUpcomingTasks } from './modules/miscTools';
import { generateForm, addSubmitToForm } from './modules/forms';
import { openModal } from './modules/modals';
import { renderCalendar } from './modules/calendar';

let projectList = JSON.parse(window.localStorage.getItem('projectList'));

generateForm("task");
generateForm("project");

const taskForm = document.querySelector("#new-task");
const newTaskButton = document.querySelector(".add-task");
const tfModal = document.querySelector("#task-form-modal");

const projectForm = document.querySelector("#new-project");
const newProjectButton = document.querySelector(".add-project");
const pfModal = document.querySelector("#project-form-modal");

newTaskButton.onclick = () => {
    (projectList === undefined || projectList.length === 0) ? 
        alert("Please start a new project first.") :
        openModal(tfModal);
}

newProjectButton.onclick = () => openModal(pfModal);

addSubmitToForm(taskForm);
addSubmitToForm(projectForm);

renderCalendar();
sortUpcomingTasks();