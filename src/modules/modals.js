import { format } from 'date-fns';
import { setElemWithAttrs } from './miscTools';
import { manageList } from './listBuilding'

const tasks = JSON.parse(window.localStorage.getItem('taskList'));
const projects = JSON.parse(window.localStorage.getItem('projectList'));

const addModal = (e, idName) => {
    let modal = setElemWithAttrs("div", [
        ["class", "modal"],
        ["id", idName]
    ]);
    addModalContent(modal);
    e.appendChild(modal);
    modal.firstChild.firstChild.onclick = () => {
        closeModal(modal);
    }
}

const addModalContent = (modal) => {
    let modalContent = setElemWithAttrs("div", [["class", "modal-content"]]);
    let closer = setElemWithAttrs("span", [["class", "close-modal"]]);
    closer.innerHTML = "&times<br><br>";
    modalContent.appendChild(closer);
    modal.appendChild(modalContent);
    modal.id[0] === "t" ? 
        setModalText(modal, tasks) : 
        setModalText(modal, projects);
}

const setModalText = (modal, list) => {
    let item = list.filter(i => { 
        if (modal.id === i.id) { return i; } 
    })[0]

    let project;
    if (item.projectId) { 
        project = projects.filter(p => 
            p.id === item.projectId
        )[0] 
    } 

    modal.firstChild.innerHTML += `<p>Title: ${item.title}</p>
        <p>Larger Project: ${project ? project.title : "---"} </p>
        <p>Start Date: ${format(item.date, 'MMMM Do, YYYY')}</p>
        <p>Due Date: ${item.dueDate ? format(item.dueDate, 'MMMM Do, YYYY') : "---"}</p>
        <p>Description: ${item.description ? item.description : "---"}</p>`;
    if (modal.id[0] === "p") { addTaskButton(modal); }
    addEditButton(modal);
    addDeleteButton(modal);
}

const openModal = (idName) => {
    let modal = document.querySelector(`#${idName}`);
    modal.style.display = "block";
}

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
        openModal("task-form-modal");
    }
}

const addEditButton = (modal) => {
    let editButton = document.createElement("button");
    editButton.textContent = `Edit ${(modal.id[0] === "t" ? "Task" : "Project")}`
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

export { addModal, openModal, closeModal }