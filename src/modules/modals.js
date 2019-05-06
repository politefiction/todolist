import { format } from 'date-fns';
import { setElemWithAttrs, capitalize, setValue, selectQuery } from './miscTools';
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
    type === "obj" ? setObjContent(modal) : modalContent.appendChild(form);
}

const findObj = (modal, list) => {
    return list.filter(i =>  modal.id === i.id)[0];
}

const findProject = (obj) => {
    if (obj.projectId) { 
        return projects.filter(p => 
            p.id === obj.projectId
        )[0] 
    } 
}

const setObjContent = (modal) => {
    let list = (modal.id[0] === "t" ? tasks : projects)
    let obj = findObj(modal, list);
    modal.firstChild.innerHTML += setObjText(obj);
    if (modal.id[0] === "p") { addTaskButton(modal); }
    addEditButton(modal, list);
    addDeleteButton(modal);
}

const setObjText = (obj) => {
    let project = findProject(obj);
    return `<p>Title: ${obj.title}</p>
    <p>Larger Project: ${project ? project.title : "---"} </p>
    <p>Start Date: ${format(obj.date, 'MMMM Do, YYYY')}</p>
    <p>Due Date: ${obj.dueDate ? format(obj.dueDate, 'MMMM Do, YYYY') : "---"}</p>
    <p>Description: ${obj.description ? obj.description : "---"}</p>`;
}

const setObjChecklist = (obj) => {}

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
        selectQuery("#new-task").reset();
        setValue("t-project", modal.id);
        openModal(selectQuery("#task-form-modal"));
    }
}

const addEditButton = (modal, list) => {
    let obj = list.filter(obj => obj.id === modal.id)[0];
    let objName = (modal.id[0] === "t" ? "task" : "project");
    let editButton = setElemWithAttrs("button", [["class", `edit-${objName}`]]);
    let form = selectQuery(`#new-${objName}`)
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
            location.reload();
        }
    }
}

export { createModal, openModal, closeModal }