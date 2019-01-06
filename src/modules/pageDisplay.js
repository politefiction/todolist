import { format, compareAsc } from 'date-fns';

const tasks = JSON.parse(window.localStorage.getItem('taskList'));

const showDate = (e, date) => {
    let dateDisplay = date ? date : new Date();
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

const getTasksForDay = function(date) {
    let list = tasks.filter(function(task) {
        return task.date.split('T')[0] === date;
    })
    return list
}

const sortTasks = () => {
    let dates = [];
    tasks.map((task) => { 
        let date = task.date.split('T')[0]
        if (!dates.includes(date)) { dates.push(date) };
        dates = dates.sort(compareAsc);
    });
    dates.map((date) => {
        let dateForDisplay = document.createElement('h4');
        showDate(dateForDisplay, date);
        document.querySelector('#task-list').appendChild(dateForDisplay);

        let list = document.createElement('ul')
        document.querySelector('#task-list').appendChild(list);

        getTasksForDay(date).map((task) => {
            let item = document.createElement('li')
            item.innerHTML = `${format(task.date, 'hh:mm a')}: ${task.title}`;
            list.appendChild(item)
        })
    })
}

export { compileList, showDate, sortTasks }