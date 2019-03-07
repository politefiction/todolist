import { format, compareAsc, startOfToday, parse } from 'date-fns';

const tasks = JSON.parse(window.localStorage.getItem('taskList'));
const taskList = document.querySelector("#task-list");

const showDate = (e, date) => {
    let dateDisplay = date ? date : new Date();
    return e.textContent = format(dateDisplay, 'MMMM Do, YYYY');
}

/*
const setAttributes = (e, attrs) => {
    attrs.forEach(attr => {
        e.setAttribute(attr[0], attr[1]);
    })
}
*/

const setElemWithAttrs = (tag, attrs) => {
    let e = document.createElement(tag);
    attrs.forEach(attr => {
        e.setAttribute(attr[0], attr[1]);
    })
    return e;
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
        if (!dates.includes(date) && new Date(date) >= startOfToday()) { dates.push(date) };
    });
    return dates.sort(compareAsc);
}

const sortUpcomingTasks = () => {
    let dates = collectTaskDates();
    dates.map(date => {
        let dateForDisplay = document.createElement('h4');
        showDate(dateForDisplay, date);
        taskList.appendChild(dateForDisplay);

        let list = document.createElement('ul');
        taskList.appendChild(list);

        getTasksForDay(date).map((task) => {
            let item = document.createElement('li');
            item.innerHTML = `${format(task.date, 'hh:mm a')}: ${task.title}`;
            list.appendChild(item);
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
                taskDiv.onclick = () => {
                    openModal(idName);
                }
            }
        })
    })
}

const addTaskModal = (e, idName) => {
    let modal = setElemWithAttrs("div", [
        ["class", "task-modal"],
        ["id", idName]
    ]);
    let modalContent = setElemWithAttrs("div", [["class", "task-modal-content"]]);
    let closer = setElemWithAttrs("span", [["class", "close-modal"]]);
    closer.innerHTML = "&times<br><br>";
    //closer.onclick = () => { closeModal() }
    modalContent.appendChild(closer);
    modalContent.innerHTML += "Testing, testing";
    modal.appendChild(modalContent);
    e.appendChild(modal);
    modal.firstChild.firstChild.addEventListener("click", () => {
        event.stopPropagation();
        modal.style.display = "none";
    })
}

const openModal = (idName) => {
    let modal = document.querySelector(`#${idName}`);
    modal.style.display = "block";
    console.log(modal.firstChild.firstChild)
}

const closeModal = (closer) => {
    closer.parentElement.parentElement.style.display = "none";
    console.log("hello?");
}

export { compileList, showDate, sortUpcomingTasks, displayCalTasks, setElemWithAttrs }