import { format, getDay, getDaysInMonth, isToday, isSameDay, startOfMonth, startOfToday } from 'date-fns';
import { setElemWithAttrs, selectQuery } from './miscTools';
import { createModal, openModal } from './modals';

let selectedDate = startOfToday();
const calendar = selectQuery("#calendar");

const tasks = JSON.parse(window.localStorage.getItem('taskList'));
const projects = JSON.parse(window.localStorage.getItem('projectList'));

const firstWeekday = () => {
    return getDay(startOfMonth(selectedDate));
}

const displayMonthYear = () => {
    const calTitle = selectQuery("#cal-title");
    calTitle.textContent = format(selectedDate, 'MMMM YYYY');
}

const setCalDayAttrs = (calDay, date) => {
    if (isToday(date)) calDay.setAttribute("id", "today"); 
    if (isSameDay(date, selectedDate)) { 
        calDay.setAttribute("id", "selected-date"); 
    }
    if (date.getMonth() != selectedDate.getMonth()) {
        calDay.className += " diff-month";
    }
}

const addCalendarDay = (date, week) => {
    let calDay = setElemWithAttrs("div", [["class", "calendar-day"], ["name", date]])
    setCalDayAttrs(calDay, date);
    calDay.innerHTML = `<p>${date.getDate()}</p>`;
    week.appendChild(calDay);
}

const clearCalendar = () => {
    calendar.querySelectorAll(".week").forEach(week => {
        calendar.removeChild(week);
    })
}

const changeMonthYear = ((id, timeDiff) => {
    let element = selectQuery(id);
    element.onclick = () => {
        selectedDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth()+timeDiff)
        renderCalendar();
    }
})

const addMYSelection = () => {
    changeMonthYear("#year-back", -12);
    changeMonthYear("#month-back", -1);
    changeMonthYear("#year-forward", +12);
    changeMonthYear("#month-forward", +1);
}

const isExtendedMonth = () => {
    return ((getDaysInMonth(selectedDate) > 29 && firstWeekday() > 5) || 
        (getDaysInMonth(selectedDate) > 30 && firstWeekday() > 4));
}

const calculateCalendarDays = () => {
    if (getDaysInMonth(selectedDate) < 29 && firstWeekday() < 1) {
        return 27;
    } else {
        return isExtendedMonth() ? 41 : 34; 
    }
}

const selectDate = (date) => {
    selectedDate = new Date(date.getAttribute("name"));
    renderCalendar();
}

const addDateSelection = () => {
    const dates = document.querySelectorAll(".calendar-day")
    dates.forEach(date => {
        if (!isSameDay(selectedDate, date.getAttribute("name"))) {
            date.onclick = () => selectDate(date);
        }
    })
}

const addWeeks = () => {
    let calendar = selectQuery("#calendar");
    for (let i=0; i<(calculateCalendarDays()+1)/7; i++) {
        let week = setElemWithAttrs("div", [["class", "week"]]);
        calendar.appendChild(week);
    }
}

const displayOnCal = (list) => {
    list.forEach(obj => {
        let idName = obj.id;
        let startDiv = createObjDiv(obj);
        addToCalendar(obj, startDiv, idName);
        if (obj.dueDate) { 
            let dueDiv = createObjDiv(obj);
            addToCalendar(obj, dueDiv, idName, true); 
        }
    })
}

const createObjDiv = (obj) => {
    let className = (obj.id[0] === "t" ? "task-div" : "project-div");
    return setElemWithAttrs("div", [
        ["class", `${className} ${obj.priority.toLowerCase()}`]
    ])
}

const addToCalendar = (obj, objDiv, idName, due=false) => {
    const calendarDays = document.querySelectorAll(".calendar-day");
    objDiv.textContent = (due ? "DUE: " : "") + obj.title;
    let objDate = (due ? obj.dueDate : obj.date);
    let compDate = new Date(objDate.split(' ')[0]).setHours(24);
    calendarDays.forEach(calendarDay => {
        if (new Date(calendarDay.getAttribute("name")).getTime() === new Date(compDate).getTime()) {
            calendarDay.appendChild(objDiv);
            let modal = createModal(idName); 
            objDiv.appendChild(modal);
            objDiv.onclick = () => openModal(modal);
        }
    })
}

const setCurrentMonth = () => {
    displayMonthYear();
    addWeeks();
    let weeks = document.querySelectorAll(".week");
    let weekStart = 1 - getDay(startOfMonth(selectedDate));
    let d = 0;
    for (let i=weekStart; i<=(calculateCalendarDays()+weekStart); i++) {
        let date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i);
        addCalendarDay(date, weeks[Math.floor(d/7)]);
        d++;
    }
}

const renderCalendar = () => {
    clearCalendar();
    setCurrentMonth();
    addDateSelection();
    addMYSelection();
    if (projects) displayOnCal(projects);
    if (tasks) displayOnCal(tasks);
}


export { renderCalendar, selectDate }