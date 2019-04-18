import { compareAsc, format, isFuture } from 'date-fns';

const tasks = JSON.parse(window.localStorage.getItem('taskList'));
const taskList = document.querySelector("#task-list");

const capitalize = (string) => {
    return string[0].toUpperCase() + string.slice(1);
}

const showDate = (e, date) => {
    let dateDisplay = date ? date : new Date();
    return e.textContent = format(dateDisplay, 'MMMM Do, YYYY');
}

const setElemWithAttrs = (tag, attrs) => {
    let e = document.createElement(tag);
    attrs.forEach(attr => {
        e.setAttribute(attr[0], attr[1]);
    })
    return e;
}

const appendChildren = (e, children) => {
    children.forEach(child => e.appendChild(child) );
}

const insertAfter = (e, classOrId) => {
    let referenceNode = document.querySelector(classOrId);
    referenceNode.parentNode.insertBefore(e, referenceNode.nextSibling);
}

const getValue = (name) => {
    return document.getElementsByName(name)[0].value;
}

const getTime = (attr) => {
    return getValue(attr).length === 0 ? `00:00` : getValue(attr);
}

const compileList = () => {
    while (taskList.firstChild) {
        taskList.firstChild.remove();
    }
    tasks.map((task) => {
        let item = document.createElement('li');
        item.textContent = `${format(task.date, 'hh:mm a')}: ${task.title}`;
        taskList.appendChild(item);
    })
}

const getTasksForDay = (date) => {
    let list = tasks.filter(task => 
        task.date.split('T')[0] === date
    )
    return list;
}

const collectTaskDates = () => {
    let dates = [];
    tasks.map(task => { 
        let date = task.date.split('T')[0];
        if (!dates.includes(date) && isFuture(date)) { dates.push(date) };
    });
    return dates.sort(compareAsc);
}

const sortUpcomingTasks = () => {
    let dates = collectTaskDates();
    dates.map(date => {
        let dateForDisplay = document.createElement('h4');
        showDate(dateForDisplay, date);
        taskList.appendChild(dateForDisplay);

        let dayList = document.createElement('ul');
        taskList.appendChild(dayList);

        getTasksForDay(date).map((task) => {
            let item = document.createElement('li');
            item.innerHTML = `${format(task.date, 'hh:mm a')}: ${task.title}`;
            dayList.appendChild(item);
        })
    })
}

export { appendChildren, compileList, showDate, sortUpcomingTasks, setElemWithAttrs, getValue, getTime, insertAfter, capitalize }