import { format, getDay, getDaysInMonth, isToday, isSameDay, startOfMonth, startOfToday } from 'date-fns';
import { setElemWithAttrs, selectQuery, appendChildren, generateDateControls, addMYSelection } from './miscTools';
import { createModal, openModal } from './modals';

const tasks = JSON.parse(window.localStorage.getItem('taskList'));
const projects = JSON.parse(window.localStorage.getItem('projectList'));

let selectedDate = startOfToday();
const container = selectQuery("#container");
const calendar = setElemWithAttrs("article", [["id", "calendar"]]);
container.appendChild(calendar);

const generateCalTop = () => {
    const calHeading = generateCalHeading();
    const weekdays = generateWeekdays();
    appendChildren(calendar, [calHeading, weekdays]);
}

const generateCalHeading = () => {
    const calHeading = setElemWithAttrs("section", [["id", "calendar-heading"]]);
    const backDate = generateDateControls("back");
    const fwdDate = generateDateControls("forward");
    const calTitle = setElemWithAttrs("h2", [["id", "cal-title"]]);
    calTitle.textContent = format(selectedDate, 'MMMM YYYY');

    appendChildren(calHeading, [backDate, fwdDate, calTitle]);
    return calHeading;
}

const generateWeekdays = () => {
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
    const weekdays = setElemWithAttrs("div", [["id", "weekdays"]]);
    dayNames.forEach(name => {
        let day = document.createElement("div");
        day.textContent = name;
        weekdays.appendChild(day);
    })
    return weekdays;
}

const firstWeekday = () => {
    return getDay(startOfMonth(selectedDate));
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
    if (calendar.firstChild) {
        calendar.removeChild(calendar.firstChild)
        calendar.removeChild(calendar.firstChild)
    }
    calendar.querySelectorAll(".week").forEach(week => {
        calendar.removeChild(week);
    })
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

const renderCalendar = (date=undefined) => {
    if (date) selectedDate = date;
    clearCalendar();
    generateCalTop();
    setCurrentMonth();
    addDateSelection();
    addMYSelection(selectedDate, renderCalendar);
    if (projects) displayOnCal(projects);
    if (tasks) displayOnCal(tasks);
}


export { renderCalendar, selectDate, clearCalendar }