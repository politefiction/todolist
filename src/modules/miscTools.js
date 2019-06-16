import { format } from 'date-fns';

const getLS = (listName) => {
    return JSON.parse(window.localStorage.getItem(listName));
}

const setLS = (listName, list) => {
    return localStorage.setItem(listName, JSON.stringify(list));
}

const tasks = getLS('taskList');
const projects = getLS('projectList')

const selectQuery = (target) => {
    return document.querySelector(target);
}

const capitalize = (string) => {
    return string[0].toUpperCase() + string.slice(1);
}

const showDate = (e, date) => {
    let dateDisplay = date ? date : new Date();
    return e.textContent = format(dateDisplay, 'MMMM Do, YYYY');
}

const setElemWithAttrs = (tag, attrs, text=undefined) => {
    let e = document.createElement(tag);
    attrs.forEach(attr => {
        e.setAttribute(attr[0], attr[1]);
    })
    if (text) e.textContent = text;
    return e;
}

const setElemWithText = (tag, text) => {
    let e = document.createElement(tag);
    e.textContent = text;
    return e;
}

const appendChildren = (e, children) => {
    children.forEach(child => e.appendChild(child) );
}

const insertAfter = (e, referenceNode) => {
    referenceNode.parentNode.insertBefore(e, referenceNode.nextSibling);
}

const setValue = (name, val) => {
    document.getElementsByName(name)[0].value = val;
}

const getValue = (name) => {
    return document.getElementsByName(name)[0].value;
}

const getTime = (name) => {
    return getValue(name).length === 0 ? `00:00` : getValue(name);
}

const sortByDate = (list) => {
    return list.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
    })
}

const generateDateControls = (dir) => {
    let controller = setElemWithAttrs("div", [["class", `${dir}-date`]])
    let yearControl = setElemWithAttrs("div", [["class", `year-${dir}`]])
    let monthControl = setElemWithAttrs("div", [["class", `month-${dir}`]])
    if (dir === "back") {
        yearControl.innerHTML = "&#60&#60";
        monthControl.innerHTML = "&#60";
        appendChildren(controller, [yearControl, monthControl]);
    } else {
        monthControl.innerHTML = "&#62";
        yearControl.innerHTML = "&#62&#62";
        appendChildren(controller, [monthControl, yearControl]);
    }
    return controller;
}

const changeMonthYear = ((attr, timeDiff, date, callback) => {
    let element = selectQuery(attr);
    element.onclick = () => {
        date = new Date(date.getFullYear(), date.getMonth()+timeDiff)
        callback(date);
    }
})

const addMYSelection = (date, cb) => {
    changeMonthYear(".year-back", -12, date, cb);
    changeMonthYear(".month-back", -1, date, cb);
    changeMonthYear(".year-forward", +12, date, cb);
    changeMonthYear(".month-forward", +1, date, cb);
}

export { selectQuery, getLS, setLS, appendChildren, showDate, sortUpcomingTasks, setElemWithAttrs, setElemWithText, setValue, getValue, getTime, insertAfter, capitalize, compileOngoingPL, sortByDate, generateDateControls, addMYSelection }

