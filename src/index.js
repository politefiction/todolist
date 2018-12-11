import './styles/main.scss';
import { format, isValid, compareAsc, compareDesc, addDays } from 'date-fns';
import { Task, Project, manageList, taskList, projectList } from './modules/listBuilding';
import { compileList, showDate } from './modules/pageDisplay'


const addTaskButton = document.querySelector("#add-task");
const form = document.querySelector("form");
addTaskButton.onclick = () => {
    form.style.display = (form.style.display === "none" ? "block" : "none")
}

const getValue = (name) => {
    return document.getElementsByName(name)[0].value;
}

const saveTaskButton = document.querySelector("#save-task");
saveTaskButton.onclick = (e) => {
    e.preventDefault();
    let task = Task(
        getValue("title"),
        getValue("description"),
        new Date(getValue("date")),
        getValue("priority")
    );
    manageList.addTask(task);
    form.style.display = "none";
    compileList();
}


showDate(document.querySelector("#cont-heading"));
showDate(document.querySelector("#date"));
if (window.localStorage.getItem('taskList')) { compileList() };