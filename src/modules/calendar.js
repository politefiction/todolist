import { format, getDay, getDaysInMonth, startOfMonth, isToday, startOfToday } from 'date-fns'

let selectedDate = startOfToday();

const firstWeekday = () => {
    return getDay(startOfMonth(selectedDate));
}

const displayMonth = (date) => {
    const calTitle = document.querySelector("#cal-title");
    calTitle.textContent = format(selectedDate, 'MMMM YYYY');
}

const setSpecAttrs = (calDay, date) => {
    if (isToday(date)) { calDay.setAttribute("id", "today") }
    if (date.getTime() === selectedDate.getTime()) { 
        calDay.setAttribute("id", "selected-date") 
    }
    if (date.getMonth() != selectedDate.getMonth()) {
        calDay.className += " diff-month";
    }
}

const calendar = document.querySelector("#calendar");
const addCalendarDay = (date) => {
    let calDay = document.createElement("div");
    calDay.setAttribute("class", "calendar-day");
    calDay.setAttribute("name", date);
    setSpecAttrs(calDay, date);
    calDay.textContent = date.getDate();
    calendar.appendChild(calDay);
}

const clearCalendar = () => {
    calendar.querySelectorAll(".calendar-day").forEach(day => {
        calendar.removeChild(day);
    })
}

const changeMonthYear = () => {
    document.querySelector("#year-back").onclick = () => {
        selectedDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth()-12);
        renderCalender();
    }
    document.querySelector("#month-back").onclick = () => {
        selectedDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth()-1);
        renderCalender();
    }
    document.querySelector("#year-forward").onclick = () => {
        selectedDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth()+12);
        renderCalender();
    }
    document.querySelector("#month-forward").onclick = () => {
        selectedDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth()+1);
        renderCalender();
    }
}

const isExtendedMonth = () => {
    return ((getDaysInMonth(selectedDate) > 29 && firstWeekday() > 5) || 
    (getDaysInMonth(selectedDate) > 30 && firstWeekday() > 4))
}

const calculateCalendarDays = () => {
    if (getDaysInMonth(selectedDate) < 29 && firstWeekday() < 1) {
        return 27
    } else {
        return isExtendedMonth() ? 41 : 34; 
    }
}

const selectDate = (date) => {
    selectedDate = new Date(date.getAttribute("name"));
    renderCalender();
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
    changeMonthYear();
}


export { selectedDate, renderCalender }