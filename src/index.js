import './styles/main.scss';
import { format, isValid, compareAsc, compareDesc, startOfMonth, getDay, getDaysInMonth, startOfDay, parse } from 'date-fns';
import { Task, Project, manageList, taskList, projectList } from './modules/listBuilding';
import { compileList, showDate, sortUpcomingTasks } from './modules/pageDisplay';
import { renderCalendar } from './modules/calendar';


const addTaskButton = document.querySelector("#add-task");
const form = document.querySelector("#new-task");
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
        `t${taskList.length}`,
        getValue("title"),
        getValue("description"),
        new Date(getValue("date")),
        getValue("priority")
    );
    manageList.addTask(task);
    form.style.display = "none";
    //renderCalendar();
}

renderCalendar();
sortUpcomingTasks();

/*
*/