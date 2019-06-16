import { format, getDay, isToday, isSameDay, startOfToday, isSameMonth, isDate } from 'date-fns';
import { setElemWithAttrs, setElemWithText, selectQuery, appendChildren, sortByDate, generateDateControls, addMYSelection } from './miscTools';
import { createModal, openModal } from './modals';

let selectedDate = startOfToday();
const tasks = JSON.parse(window.localStorage.getItem('taskList'));
const projects = JSON.parse(window.localStorage.getItem('projectList'));

const container = selectQuery("#container");
let listView = setElemWithAttrs("article", [["id", "list-view"]]);
container.appendChild(listView);

const generateHeading = () => {
    let heading = setElemWithAttrs("section", [["id", "list-heading"]])
    let listTitle = setElemWithAttrs("h2", 
        [["id", "list-title"]],
        format(selectedDate, "MMMM YYYY"));
    const backDate = generateDateControls("back");
    const fwdDate = generateDateControls("forward");
    appendChildren(heading, [backDate, fwdDate, listTitle])
    heading.appendChild(listTitle)
    listView.appendChild(heading);
}

const clearList = () => {
    if (listView.firstChild) {
        for (let i=0; i<3; i++) {
            listView.removeChild(listView.firstChild);
        }
    }

}

const displayProjects = () => {
    let startHeading = setElemWithText("h3", "Projects Starting This Month");
    let startList = setElemWithAttrs("section", [["class", "project-list"]]);
    let selectedProjects = sortByDate(projects.filter(p => {
        return isSameMonth(new Date(p.date), selectedDate);
     }))
     startList.appendChild(startHeading);
     selectedProjects.forEach(p => startList.appendChild(createObjEntry(p)));

     let dueHeading = setElemWithText("h3", "Projects Due This Month");
     let dueList = setElemWithAttrs("section", [["class", "project-list"]]);
     let dueProjects = sortByDate(projects.filter(p => {
        return isSameMonth(new Date(p.dueDate), selectedDate);
     }))
     dueList.appendChild(dueHeading);
     dueProjects.forEach (p => dueList.appendChild(createObjEntry(p)));

     appendChildren(listView, [startList, dueList])
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
    let title = setElemWithAttrs("div", [["class", "title"]], obj.title)
    let modal = addModal(obj.id, entry);
    if (new Date(obj.dueDate) != "Invalid Date") title.textContent += ` (Due ${format(obj.dueDate, 'M/DD/YY')})`

    appendChildren(entry, [dot, title]);

    title.onclick = () => openModal(modal);

    if (mainEntry) {
        return mainEntry.lastChild.appendChild(entry);
    } else {
        addTaskList(obj, entry);
    }

    return entry;
}

const renderList = (date=undefined) => {
    if (date) selectedDate = date;
    clearList();
    generateHeading();
    addMYSelection(selectedDate, renderList)
    displayProjects();
}

export { renderList, clearList }