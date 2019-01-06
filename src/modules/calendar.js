import { format, getDay, getDaysInMonth, startOfMonth, isToday, startOfToday } from 'date-fns'

let selectedDate = startOfToday();

const selectDate = (date) => {
    selectedDate = new Date(date.getAttribute("name"));
    renderCalender();
}

const displayMonth = (date) => {
    const calHeading = document.querySelector("#cal-heading");
    calHeading.textContent = format(selectedDate, 'MMMM YYYY');
}

const calendar = document.querySelector("#calendar");
const addCalendarDay = (date) => {
    let calDay = document.createElement("div");
    calDay.setAttribute("class", "calendar-day");
    calDay.setAttribute("name", date);
    if (isToday(date)) { calDay.setAttribute("id", "today") }
    if (date.getTime() == selectedDate.getTime()) { 
        calDay.setAttribute("id", "selected-date") 
    }
    if (date.getMonth() != selectedDate.getMonth()) {
        calDay.className += " diff-month";
    }
    calDay.textContent = date.getDate();
    calendar.appendChild(calDay);
}

const clearCalendar = () => {
    calendar.querySelectorAll(".calendar-day").forEach(day => {
        calendar.removeChild(day);
    })
}

const calculateCalendarDays = () => {
    return (getDay(startOfMonth(selectedDate)) > 4 
            && getDaysInMonth(selectedDate) > 29) ?
            41 : 34
}

const addDateSelection = () => {
    const dates = document.querySelectorAll(".calendar-day")
    dates.forEach(date => {
        date.onclick = () => {
            selectDate(date);
        }
    })
}

const renderCalender = () => {
    clearCalendar();
    displayMonth();
    let weekStart = 1 - getDay(startOfMonth(selectedDate));
    for (let i=weekStart; i<=(calculateCalendarDays()+weekStart); i++) {
        addCalendarDay(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i))
    }
    addDateSelection();
}


export { selectedDate, selectDate, renderCalender }