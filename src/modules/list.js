import { format, getDay, isToday, isSameDay, startOfToday, isSameMonth } from 'date-fns';
import { setElemWithAttrs, selectQuery, appendChildren, sortByDate } from './miscTools';
import { createModal, openModal } from './modals';

let selectedDate = startOfToday();
const tasks = JSON.parse(window.localStorage.getItem('taskList'));
const projects = JSON.parse(window.localStorage.getItem('projectList'));

const container = selectQuery("#container");
let list = setElemWithAttrs("article", [["id", "list-view"]]);
container.appendChild(list);

const generateListView = () => {
    let heading = document.createElement("h2");
    heading.style.textAlign = "center";
    heading.textContent = format(selectedDate, "MMMM YYYY");
    list.appendChild(heading);
}

const clearList = () => {
    if (list.firstChild) {
        list.removeChild(list.firstChild);
        list.removeChild(list.firstChild);
    }

}

const displayProjects = () => {
    let projList = setElemWithAttrs("section", [["class", "project-list"]]);
    let selectedProjects = sortByDate(projects.filter(p => {
        return isSameMonth(new Date(p.date), selectedDate);
     }))
     selectedProjects.forEach(p => {
         projList.appendChild(createProjEntry(p));
     })
     list.appendChild(projList);
}

const createProjEntry = (p) => {
    let entry = setElemWithAttrs("div", [["class", "project-entry"]]);
    let dot = setElemWithAttrs("div", [["class", `dot ${p.priority.toLowerCase()}`]])
    let title = document.createElement("div");
    title.textContent = p.title;
    appendChildren(entry, [dot, title]);
    entry.onclick = () => {
        let modal = selectQuery(`#${p.id}`);
        if (!modal) { 
            modal = createModal(`${p.id}`); 
            entry.appendChild(modal);
        }
        openModal(modal);
    }
    return entry;
}

const renderList = () => {
    clearList();
    generateListView();
    displayProjects();
}

export { renderList, clearList }