import { format, isFuture } from 'date-fns';
import { setElemWithAttrs, getLS, selectQuery, appendChildren } from './miscTools'
import { openModal, createModal } from './modals';


const tasks = getLS('taskList');
const projects = getLS('projectList');

const compileOngoingPL = () => {
    let list = selectQuery("#project-list");
    let ongoingPL = projects.filter(p => isFuture(p.dueDate)).sort((a, b) => { 
        return new Date(a.date) - new Date(b.date); 
    });
    ongoingPL.forEach(p => {
        let projectEntry = createEntry(p, "h4");
        let ogList = selectQuery("#ongoing-list");
        ogList.insertBefore(projectEntry, list);
        projectEntry.onclick = () => openEntry(p, ogList);
    });
}

const createEntry = (obj, elem) => {
    let objName = (obj.id[0] === "p" ? "project" : "task");
    let entry = setElemWithAttrs("div", [["class", `${objName}-entry`]]);
    let priority = setElemWithAttrs("div", [["class", `dot ${obj.priority.toLowerCase()}`]]);
    let heading = document.createElement(`${elem}`);
    heading.textContent = obj.title;
    appendChildren(entry, [priority, heading]);
    return entry;
}

const openEntry = (p, list) => {
    let modal = selectQuery(`#${p.id}`);
    if (!modal) { 
        modal = createModal(`${p.id}`); 
        list.appendChild(modal);
    }
    openModal(modal);
}

export { compileOngoingPL }