import './styles/main.scss';
//import { format, isValid, compareAsc, compareDesc, startOfMonth, getDay, getDaysInMonth, startOfDay, parse } from 'date-fns';
import { Task, Project, manageList, taskList, projectList } from './modules/listBuilding';
import { compileList, showDate, sortUpcomingTasks } from './modules/pageDisplay';
import { renderCalendar } from './modules/calendar';

const getValue = (name) => {
    return document.getElementsByName(name)[0].value;
}

const addTaskButton = document.querySelector("#add-task");
const taskForm = document.querySelector("#new-task");
addTaskButton.onclick = () => {
    taskForm.style.display = (taskForm.style.display === "none" ? "block" : "none")
}

const saveTaskButton = document.querySelector("#save-task");
saveTaskButton.onclick = (e) => {
    e.preventDefault();
    let task = Task(
        `t${taskList.length}`,
        getValue("t-title"),
        getValue("t-description"),
        new Date(getValue("t-date")),
        new Date(getValue("t-due-date")),
        getValue("t-priority")
    );
    manageList.addTask(task);
    taskForm.style.display = "none";
}

const addProjectButton = document.querySelector("#add-project");
const projectForm = document.querySelector("#new-project");
addProjectButton.onclick = () => {
    projectForm.style.display = (projectForm.style.display === "none" ? "block" : "none")
}

const saveProjectButton = document.querySelector("#save-project");
saveProjectButton.onclick = (e) => {
    e.preventDefault();
    let project = Project(
        `t${projectList.length}`,
        getValue("p-title"),
        getValue("p-description"),
        new Date(getValue("p-date")),
        new Date(getValue("p-due-date")),
        getValue("p-priority")
    );
    manageList.addProject(project);
    projectForm.style.display = "none";
}

renderCalendar();
sortUpcomingTasks();
