import './styles/main.scss';
import { format, isValid, compareAsc, compareDesc, addDays } from 'date-fns';
import { Task, Project, manageList, taskList, projectList } from './modules/listBuilding';

const showDate = (e, date) => {
    let dateDisplay = date ? date : new Date();
    return e.textContent = format(dateDisplay, 'MMMM Do, YYYY');
}

const addTaskButton = document.querySelector("#add-task");
const form = document.querySelector("form");
addTaskButton.onclick = () => {
    form.style.display = (form.style.display === "none" ? "block" : "none")
}

const getValue = (name) => {
    return document.getElementsByName(name)[0].value;
}

const tasksToday = document.querySelector("#tasks-today")
const compileList = () => {
    while (tasksToday.firstChild) {
        tasksToday.firstChild.remove();
    }
    JSON.parse(window.localStorage.getItem('taskList')).map((task) => {
        let item = document.createElement('li');
        item.textContent = `${format(task.date, 'hh:mm a')}: ${task.title}`;
        tasksToday.appendChild(item);
    })
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
compileList();