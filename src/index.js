import './styles/main.scss';
import { Task, Project, manageList, projectList, taskCount, projectCount } from './modules/listBuilding';
import { sortUpcomingTasks, getValue, getTime } from './modules/miscTools';
import { generateForm } from './modules/forms';
import { openModal, closeModal } from './modules/modals';
import { renderCalendar, selectDate } from './modules/calendar';

generateForm("Task", "t");
generateForm("Project", "p");

const newTaskButton = document.querySelector(".add-task");
const taskForm = document.querySelector("#task-form-modal");
newTaskButton.onclick = () => {
    (projectList === undefined || projectList.length === 0) ? 
        alert("Please start a new project first.") :
        openModal("task-form-modal");
}
taskForm.firstElementChild.firstElementChild.onclick = () => {
    closeModal(taskForm);
}

taskForm.onsubmit = () => {
    let project = projectList.filter(p => 
        getValue("t-project") === p.id
    )[0];
    
    let task = Task(
        `t${taskCount}`,
        getValue("t-title"),
        getValue("t-description"),
        `${getValue("t-date")} ${getTime("t-time")}`,
        `${getValue("t-due-date")} ${getTime("t-due-time")}`,
        getValue("t-priority"),
        project.id
    );
    manageList.addTaskToProject(project, task);
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

projectForm.onsubmit = () => {
    let project = Project(
        `p${projectCount}`,
        getValue("p-title"),
        getValue("p-description"),
        `${getValue("p-date")} ${getTime("p-time")}`,
        `${getValue("p-due-date")} ${getTime("p-due-time")}`,
        getValue("p-priority")
    );
    manageList.addProject(project);
    closeModal(projectForm);
    selectDate(project.date);
}

renderCalendar();
sortUpcomingTasks();
