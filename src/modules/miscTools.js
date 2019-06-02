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

export { selectQuery, getLS, setLS, appendChildren, showDate, sortUpcomingTasks, setElemWithAttrs, setValue, getValue, getTime, insertAfter, capitalize, compileOngoingPL }


