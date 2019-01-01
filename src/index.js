import './styles/main.scss';
import { format, isValid, compareAsc, compareDesc, startOfMonth, getDay, getDaysInMonth } from 'date-fns';
import { Task, Project, manageList, taskList, projectList } from './modules/listBuilding';
import { compileList, showDate, sortTasks } from './modules/pageDisplay';
import { displayMonth, addCalendarDay } from './modules/calendar';


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
    //compileList();
}

displayMonth(new Date());
//showDate(document.querySelector("#cal-heading"));
//showDate(document.querySelector("#date"));
if (window.localStorage.getItem('taskList')) { 
    //compileList();
    sortTasks();
 };

let weekStart = 1 - getDay(startOfMonth(new Date()));

/*
let n;
for (n=0; n<getDay(startOfMonth(new Date())); n++) {
    addCalendarDay();
}
*/

let today = new Date();
 let i;
 for (i=weekStart; i<=getDaysInMonth(new Date()); i++) {
    //i >= 1 ? addCalendarDay(i) : addCalendarDay("");
    addCalendarDay((new Date(today.getFullYear(), today.getMonth(), i).getDate()))
 }