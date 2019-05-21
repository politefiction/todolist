import './styles/main.scss';
import { sortUpcomingTasks, selectQuery } from './modules/miscTools';
import { generateForm, generateSubtaskForm, addFormSubmission } from './modules/forms';
import { openModal } from './modules/modals';
import { renderCalendar } from './modules/calendar';

let projectList = JSON.parse(window.localStorage.getItem('projectList'));

let newTaskButton = selectQuery("#new-task-button");
generateForm("task", newTaskButton);
const taskForm = selectQuery("#task-form");
const tfModal = selectQuery("#task-form-modal");

const newProjectButton = selectQuery("#new-project-button");
generateForm("project", newProjectButton);
const projectForm = selectQuery("#project-form");
const pfModal = selectQuery("#project-form-modal");

const newSubtaskButton = selectQuery("#new-subtask-button");
generateSubtaskForm(newSubtaskButton);

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
//sortUpcomingTasks();

/*

*/