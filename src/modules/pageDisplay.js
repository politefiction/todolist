import { compareAsc, format, isFuture, isValid, parse, startOfToday } from 'date-fns';

const tasks = JSON.parse(window.localStorage.getItem('taskList'));
const taskList = document.querySelector("#task-list");

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
    children.forEach(child => {
        e.appendChild(child);
    })
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
    let list = tasks.filter(task => {
        return task.date.split('T')[0] === date;
    })
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

const displayCalTasks = () => {
    const calendarDays = document.querySelectorAll(".calendar-day");
    tasks.forEach(task => {
        let idName = task.taskID;
        let taskDiv = setElemWithAttrs("div", [
            ["class", `task-div ${task.priority.toLowerCase()}`]
        ])
        taskDiv.textContent = task.title;
        calendarDays.forEach(calendarDay => {
            if (new Date(calendarDay.getAttribute("name")).getTime() === parse(task.date.split('T')[0]).getTime()) {
                calendarDay.appendChild(taskDiv);
                addTaskModal(taskDiv, idName); 
                taskDiv.onclick = () => { openModal(idName); }
            }
        })
    })
}

const addTaskModal = (e, idName) => {
    let modal = setElemWithAttrs("div", [
        ["class", "modal"],
        ["id", idName]
    ]);
    addModalContent(modal);
    e.appendChild(modal);
    modal.firstChild.firstChild.onclick = () => {
        closeModal(modal);
    }
}

const addModalContent = (modal) => {
    let modalContent = setElemWithAttrs("div", [["class", "task-modal-content"]]);
    let closer = setElemWithAttrs("span", [["class", "close-modal"]]);
    closer.innerHTML = "&times<br><br>";
    modalContent.appendChild(closer);
    modal.appendChild(modalContent);
    setModalText(modal);
}

const setModalText = (modal) => {
    let task = tasks.filter(t => { 
        if (t.taskID === modal.id) { return t } 
    })[0]
    modal.firstChild.innerHTML += `<p>Title: ${task.title}</p>
        <p>Start Date: ${format(task.date, 'MMMM Do, YYYY')}</p>
        <p>Due Date: ${ task.dueDate ? format(task.dueDate, 'MMMM Do, YYYY') : "---" }</p>
        <p>Description: ${task.description}</p>`;
}

const openModal = (idName) => {
    let modal = document.querySelector(`#${idName}`);
    modal.style.display = "block";
}

const closeModal = (modal) => {
    event.stopPropagation();
    modal.style.display = "none";
}

export { appendChildren, compileList, showDate, sortUpcomingTasks, displayCalTasks, setElemWithAttrs, openModal, closeModal }