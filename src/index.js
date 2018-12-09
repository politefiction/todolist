import './styles/main.scss';
import { format, isValid, compareAsc, compareDesc, addDays } from 'date-fns';
import { Task, Project, manageList, taskList, projectList } from './modules/listBuilding';

const showDate = (e, date) => {
    let dateDisplay = date ? date : new Date();
    return e.textContent = format(dateDisplay, 'MMMM Do, YYYY');
}

const addTaskButton = document.querySelector("#add-task");
addTaskButton.onclick = () => {
    const form = document.querySelector("form");
    form.style.display = (form.style.display === "none" ? "block" : "none")
}

const getValue = (name) => {
    return document.getElementsByName(name)[0].value;
}

const tasksToday = document.querySelector("#tasks-today")
const compileList = (task) => {
    let item = document.createElement('li');
    item.textContent = `${format(task.date, 'hh:mm a')}: ${task.title}`;
    tasksToday.appendChild(item);
}

const saveTaskButton = document.querySelector("#save-task");
saveTaskButton.onclick = (e) => {
    e.preventDefault();
    let title = getValue("title");
    let description = getValue("description");
    let date = new Date(getValue("date"));
    let priority = getValue("priority");
    let task = Task(title, description, date, priority);
    manageList.addTask(task);
    compileList(task);
}


showDate(document.querySelector("#cont-heading"));
showDate(document.querySelector("#date"));