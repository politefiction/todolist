import { format, isValid, getDaysInMonth } from 'date-fns'

const displayMonth = (date) => {
    const calHeading = document.querySelector("#cal-heading");
    let display = date ? date : new Date();
    calHeading.textContent = format(display, 'MMMM YYYY');
}

// note, will need to keep track of current day/month/year

const calendar = document.querySelector("#calendar");
const addCalendarDay = (num) => {
    let calDay = document.createElement("div");
    calDay.setAttribute("class", "calendar-day");
    calDay.textContent = num;
    calendar.appendChild(calDay);
}


export { displayMonth, addCalendarDay }

/*
calHeading.textContent = format(
    (date && isValid(date)) ? (date, 'MMMM') : (new Date(), 'MMMM')
)
*/