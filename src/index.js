import './styles/main.scss';
import { sortUpcomingTasks, selectQuery } from './modules/miscTools';
import { generateForm, addFormSubmission } from './modules/forms';
import { openModal } from './modules/modals';
import { renderCalendar } from './modules/calendar';

let projectList = JSON.parse(window.localStorage.getItem('projectList'));

let newTaskButton = selectQuery(".add-task");
generateForm("task", newTaskButton);
const taskForm = selectQuery("#new-task");
const tfModal = selectQuery("#task-form-modal");

const newProjectButton = selectQuery("#add-project");
generateForm("project", newProjectButton);
const projectForm = selectQuery("#new-project");
const pfModal = selectQuery("#project-form-modal");

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