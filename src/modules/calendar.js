import { format, getDay, getDaysInMonth, startOfMonth, isToday, startOfToday } from 'date-fns'

let selectedDate = startOfToday();

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
        calDay.setAttribute("class", "calendar-day diff-month");
    }
    calDay.textContent = date.getDate();
    calendar.appendChild(calDay);
}

// calendar too short for most months starting Fri/Sat; fix
const renderCalender = () => {
    clearCalendar();
    displayMonth();
    let weekStart = 1 - getDay(startOfMonth(selectedDate));
    for (let i=weekStart; i<=34+weekStart; i++) {
        addCalendarDay(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i))
    }
}

const clearCalendar = () => {
    calendar.querySelectorAll(".calendar-day").forEach(day => {
        calendar.removeChild(day);
    })
}

// onclick, only re-renders calendar once
const selectDate = (date) => {
    selectedDate = new Date(date.getAttribute("name"));
    date.setAttribute("id", "selected-date") 
    renderCalender();
}

export { selectedDate, selectDate, renderCalender }