import { format } from 'date-fns';
import { setElemWithAttrs, capitalize, setValue } from './miscTools';
import { manageList } from './listBuilding'
import { populateForm } from './forms';

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
    addEditButton(modal, list);
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
        document.querySelector("#new-task").reset();
        setValue("t-project", modal.id);
        openModal(document.querySelector("#task-form-modal"));
    }
}

const addEditButton = (modal, list) => {
    let obj = list.filter(item => item.id === modal.id)[0];
    let objName = (modal.id[0] === "t" ? "task" : "project");
    let editButton = setElemWithAttrs("button", [["class", `edit-${objName}`]]);
    let form = document.querySelector(`#new-${objName}`)
    editButton.textContent = `Edit ${capitalize(objName)}`;
    modal.firstChild.appendChild(editButton);
    editButton.onclick = () => {
        closeModal(modal);
        openModal(form.parentNode.parentNode);
        populateForm(obj);
    }
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