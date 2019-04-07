import './styles/main.scss';
import { Task, Project, manageList, taskList, projectList } from './modules/listBuilding';
import { sortUpcomingTasks, openModal, closeModal } from './modules/pageDisplay';
import { renderCalendar, selectDate } from './modules/calendar';
import { generateForm } from './modules/forms';

const getValue = (name) => {
    return document.getElementsByName(name)[0].value;
}

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

taskForm.onsubmit = (e) => {
    let project = projectList.filter(p => 
        getValue("t-project") === p.id
    )[0];
    let task = Task(
        `t${taskList.length}`,
        getValue("t-title"),
        getValue("t-description"),
        `${getValue("t-date")} ${getValue("t-time")}`,
        getValue("t-due-date"),
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

projectForm.onsubmit = (e) => {
    let project = Project(
        `p${projectList.length}`,
        getValue("p-title"),
        getValue("p-description"),
        `${getValue("p-date")} ${getValue("t-time")}`,
        getValue("p-due-date"),
        getValue("p-priority")
    );
    manageList.addProject(project);
    closeModal(projectForm);
    selectDate(project.date);
}

renderCalendar();
sortUpcomingTasks();
