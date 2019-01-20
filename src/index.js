import './styles/main.scss';
import { format, isValid, compareAsc, compareDesc, startOfMonth, getDay, getDaysInMonth, startOfDay, parse } from 'date-fns';
import { Task, Project, manageList, taskList, projectList } from './modules/listBuilding';
import { compileList, showDate, sortTasks } from './modules/pageDisplay';
import { renderCalendar, calTaskList } from './modules/calendar';


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
    //renderCalendar();
}

renderCalendar();
//displayTasks();
sortTasks();

/*
calendarDays.filter(calendarDay => {
    console.log(new Date(calendarDay.getAttribute("name")) === new Date(taskList[3].date.split('T')[0]))
})
//console.log(taskList[3])

const displayTasks = () => {
    const calendarDays = document.querySelectorAll(".calendar-day");
    taskList.forEach(task => {
        calendarDays.forEach(calendarDay => {
            if (new Date(calendarDay.getAttribute("name")).getTime() === parse(task.date.split('T')[0]).getTime()) {
            let taskDiv = document.createElement("div");
            taskDiv.setAttribute("class", "task-div");
            taskDiv.textContent = task.title;
            calendarDay.appendChild(taskDiv);
            }
        })
    })
}
*/