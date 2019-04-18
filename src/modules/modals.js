import { format } from 'date-fns';
import { setElemWithAttrs } from './miscTools';
import { manageList } from './listBuilding'

const tasks = JSON.parse(window.localStorage.getItem('taskList'));
const projects = JSON.parse(window.localStorage.getItem('projectList'));

const createModal = (idName, type, form=undefined) => {
    let modal = setElemWithAttrs("div", [
        ["class", "modal"],
        ["id", idName]
    ]);
    addModalContent(modal, type, form);
    modal.firstChild.firstChild.onclick = () => {
        closeModal(modal);
    }
    return modal;
}

const addModalContent = (modal, type, form) => {
    let modalContent = setElemWithAttrs("div", [["class", "modal-content"]]);
    let closer = setElemWithAttrs("span", [["class", "close-modal"]]);
    closer.innerHTML = "&times<br><br>";
    modalContent.appendChild(closer);
    modal.appendChild(modalContent);
    type === "item" ? setItemContent(modal) : modalContent.appendChild(form);
}

const findItem = (modal, list) => {
    return list.filter(i =>  modal.id === i.id)[0];
}

const findProject = (item) => {
    if (item.projectId) { 
        return projects.filter(p => 
            p.id === item.projectId
        )[0] 
    } 
}

const setItemContent = (modal) => {
    let list = (modal.id[0] === "t" ? tasks : projects)
    let item = findItem(modal, list);
    modal.firstChild.innerHTML += setItemText(item);
    if (modal.id[0] === "p") { addTaskButton(modal); }
    addEditButton(modal);
    addDeleteButton(modal);
}

const setItemText = (item) => {
    let project = findProject(item);
    return `<p>Title: ${item.title}</p>
    <p>Larger Project: ${project ? project.title : "---"} </p>
    <p>Start Date: ${format(item.date, 'MMMM Do, YYYY')}</p>
    <p>Due Date: ${item.dueDate ? format(item.dueDate, 'MMMM Do, YYYY') : "---"}</p>
    <p>Description: ${item.description ? item.description : "---"}</p>`;
}

const openModal = (modal) => modal.style.display = "block";

const closeModal = (modal) => {
    event.stopPropagation();
    modal.style.display = "none";
}

const addTaskButton = (modal) => {
    let newTask = setElemWithAttrs("button", [["class", "add-task"]]);
    newTask.textContent = "Add New Task";
    modal.firstChild.appendChild(newTask);
    newTask.onclick = () => {
        closeModal(modal);
        openModal(document.querySelector("#task-form-modal"));
    }
}

const addEditButton = (modal) => {
    let editButton = document.createElement("button");
    editButton.textContent = `Edit ${(modal.id[0] === "t" ? "Task" : "Project")}`;
    modal.firstChild.appendChild(editButton);
}

const addDeleteButton = (modal) => {
    let deleteButton = document.createElement("button");
    deleteButton.textContent = `Delete ${(modal.id[0] === "t" ? "Task" : "Project")}`
    modal.firstChild.appendChild(deleteButton)
    deleteButton.onclick = () => {
        if (confirm("Are you sure you want to delete?")) {
            modal.id[0] === "t" ? 
                manageList.deleteTask(modal.id) : 
                manageList.deleteProject(modal.id);
            location.reload(false);
        }
    }
}

export { createModal, openModal, closeModal }