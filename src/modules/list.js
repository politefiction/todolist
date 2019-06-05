import { format, getDay, getDaysInMonth, isToday, isSameDay, startOfMonth, startOfToday } from 'date-fns';
import { setElemWithAttrs, selectQuery } from './miscTools';

let selectedDate = startOfToday();
const tasks = JSON.parse(window.localStorage.getItem('taskList'));
const projects = JSON.parse(window.localStorage.getItem('projectList'));

const container = selectQuery("#container");
let list = setElemWithAttrs("article", [["id", "list-view"]]);
container.appendChild(list);

const generateListView = () => {
    let heading = document.createElement("h3");
    heading.style.textAlign = "center";
    heading.textContent = format(selectedDate, "MMMM YYYY");
    list.appendChild(heading);
}

const clearList = () => {
    for (let i=0; i<list.children.length; i++) {
        list.removeChild(list.firstChild);
    }
}

export { generateListView, clearList }