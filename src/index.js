import './styles/main.scss';
import { format, isValid, compareAsc, compareDesc, startOfMonth, getDay, getDaysInMonth, startOfDay, parse } from 'date-fns';
import { Task, Project, manageList, taskList, projectList } from './modules/listBuilding';
import { compileList, showDate, sortTasks } from './modules/pageDisplay';
import { selectedDate, renderCalender } from './modules/calendar';


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

renderCalender();
sortTasks();

const calendarDays = document.querySelectorAll(".calendar-day");
calendarDays.forEach(calendarDay => {
    if (new Date(calendarDay.getAttribute("name")).getTime() === parse(taskList[3].date.split('T')[0]).getTime()) {
        let taskDiv = document.createElement("div");
        taskDiv.setAttribute("class", "task-div");
        taskDiv.textContent = taskList[3].title;
        calendarDay.appendChild(taskDiv);
    }
})

/*
calendarDays.filter(calendarDay => {
    console.log(new Date(calendarDay.getAttribute("name")) === new Date(taskList[3].date.split('T')[0]))
})
//console.log(taskList[3])
*/