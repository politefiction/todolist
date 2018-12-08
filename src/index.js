import './styles/main.scss';
import { format, isValid, compareAsc, compareDesc } from 'date-fns';
import { Task, Project, manageList, taskList, projectList } from './modules/listBuilding';

const showDate = (date) => {
    const heading = document.querySelector("#cont-heading");
    let dateDisplay = date ? date : new Date();
    return heading.textContent = format(dateDisplay, 'MMMM Do, YYYY');
}

const addTaskButton = document.querySelector("#add-task");
addTaskButton.onclick = () => {
    const form = document.querySelector("form");
    form.style.display = (form.style.display === "none" ? "block" : "none")
}

const getValue = (name) => {
    return document.getElementsByName(name)[0].value;
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
    console.log(taskList);
}

showDate();