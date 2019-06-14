import { format, getDay, isToday, isSameDay, startOfToday, isSameMonth } from 'date-fns';
import { setElemWithAttrs, selectQuery, appendChildren, sortByDate } from './miscTools';
import { createModal, openModal } from './modals';

let selectedDate = startOfToday();
const tasks = JSON.parse(window.localStorage.getItem('taskList'));
const projects = JSON.parse(window.localStorage.getItem('projectList'));

const container = selectQuery("#container");
let listView = setElemWithAttrs("article", [["id", "list-view"]]);
container.appendChild(listView);

const generateListView = () => {
    let heading = document.createElement("h2");
    heading.style.textAlign = "center";
    heading.textContent = format(selectedDate, "MMMM YYYY");
    listView.appendChild(heading);
}

const clearList = () => {
    if (listView.firstChild) {
        listView.removeChild(listView.firstChild);
        listView.removeChild(listView.firstChild);
    }

}

const displayProjects = () => {
    let startingList = setElemWithAttrs("section", [["class", "project-list"]]);
    let selectedProjects = sortByDate(projects.filter(p => {
        return isSameMonth(new Date(p.date), selectedDate);
     }))
     selectedProjects.forEach(p => {
         startingList.appendChild(createObjEntry(p));
     })
     listView.appendChild(startingList);
}

const addModal = (id, entry) => {
    let modal = selectQuery(`#${id}`);
    if (!modal) { 
        modal = createModal(`${id}`); 
        entry.appendChild(modal);
    }
    return modal;
}

const addTaskList = (obj, entry) => {
    let listOfTasks = setElemWithAttrs("div", [["class", "task-list"]]);
    obj.tasks.forEach(task => {
        let t = tasks.find(obj => obj.id === task.id);
        listOfTasks.appendChild(createObjEntry(t, entry));
    })
    entry.appendChild(listOfTasks);
}

const createObjEntry = (obj, mainEntry=undefined) => {
    let objName = (obj.id[0] === "t" ? "task" : "project")
    let entry = setElemWithAttrs("div", [["class", `${objName}-entry`]]);
    let dot = setElemWithAttrs("div", [["class", `dot ${obj.priority.toLowerCase()}`]])
    let title = setElemWithAttrs("div", [["class", "title"]]);
    let modal = addModal(obj.id, entry);
    title.textContent = obj.title;
    appendChildren(entry, [dot, title]);

    title.onclick = () => openModal(modal);

    if (mainEntry) {
        return mainEntry.lastChild.appendChild(entry);
    } else {
        addTaskList(obj, entry);
    }

    return entry;
}

const renderList = () => {
    clearList();
    generateListView();
    displayProjects();
}

export { renderList, clearList }