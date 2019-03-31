import { compareAsc, format, isFuture, isValid, parse, startOfToday } from 'date-fns';

const tasks = JSON.parse(window.localStorage.getItem('taskList'));
const taskList = document.querySelector("#task-list");

const projects = JSON.parse(window.localStorage.getItem('projectList'));

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

const displayCalItems = (list) => {
    const calendarDays = document.querySelectorAll(".calendar-day");
    list.forEach(item => {
        let idName = (item.taskID || item.projectId);
        let className = (item.taskID ? "task-div" : "project-div");
        let itemDiv = setElemWithAttrs("div", [
            ["class", `${className} ${item.priority.toLowerCase()}`]
        ])
        itemDiv.textContent = item.title;
        calendarDays.forEach(calendarDay => {
            if (new Date(calendarDay.getAttribute("name")).getTime() === parse(item.date.split('T')[0]).getTime()) {
                calendarDay.appendChild(itemDiv);
                addModal(itemDiv, idName); 
                itemDiv.onclick = () => { openModal(idName); }
            }
        })
    })
}

const addModal = (e, idName) => {
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
    let modalContent = setElemWithAttrs("div", [["class", "modal-content"]]);
    let closer = setElemWithAttrs("span", [["class", "close-modal"]]);
    closer.innerHTML = "&times<br><br>";
    modalContent.appendChild(closer);
    modal.appendChild(modalContent);
    modal.id[0] === "t" ? 
        setModalText(modal, tasks) : 
        setModalText(modal, projects);
}

const setModalText = (modal, list) => {
    let item = list.filter(i => { 
        if (modal.id === (i.taskID || i.projectId) ) { return i; } 
    })[0]

    let project;
    if (modal.id[0] === "t") { projects.filter(p => {
        if (item.projectId === p.projectId) { return project = p.title; }
    }) }

    modal.firstChild.innerHTML += `<p>Title: ${item.title}</p>
        <p>Larger Project: ${project ? project : "---"} </p>
        <p>Start Date: ${format(item.date, 'MMMM Do, YYYY')}</p>
        <p>Due Date: ${item.dueDate ? format(item.dueDate, 'MMMM Do, YYYY') : "---"}</p>
        <p>Description: ${item.description ? item.description : "---"}</p>`;
    if (modal.id[0] === "p") { addTaskButton(modal); }
}

const openModal = (idName) => {
    let modal = document.querySelector(`#${idName}`);
    modal.style.display = "block";
}

const closeModal = (modal) => {
    event.stopPropagation();
    modal.style.display = "none";
}

const addTaskButton = (modal) => {
    let newTask = setElemWithAttrs("button", ["class", "add-task"]);
    newTask.textContent = "Add New Task";
    modal.firstChild.appendChild(newTask);
    newTask.onclick = () => {
        closeModal(modal);
        openModal("task-form-modal");
    }
}

export { appendChildren, compileList, showDate, sortUpcomingTasks, displayCalItems, setElemWithAttrs, openModal, closeModal }

/*
let project = () => {
    if (modal.id[0] === "t") { return projects.filter(p => {
        if (item.projectId === p.projectId) { p }
    })[0] }
}
*/