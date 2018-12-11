import { format } from 'date-fns';

const showDate = (e, date) => {
    let dateDisplay = date ? date : new Date();
    console.log(date);
    return e.textContent = format(dateDisplay, 'MMMM Do, YYYY');
}

const tasksToday = document.querySelector("#tasks-today")
const compileList = () => {
    while (tasksToday.firstChild) {
        tasksToday.firstChild.remove();
    }
    JSON.parse(window.localStorage.getItem('taskList')).map((task) => {
        let item = document.createElement('li');
        item.textContent = `${format(task.date, 'hh:mm a')}: ${task.title}`;
        tasksToday.appendChild(item);
    })
}

export { compileList, showDate }

