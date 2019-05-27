import { format } from 'date-fns';
import { setElemWithAttrs, capitalize, setValue, selectQuery, setLS } from './miscTools';
import { manageList } from './listBuilding'
import { populateForm } from './forms';

const tasks = JSON.parse(window.localStorage.getItem('taskList'));
const projects = JSON.parse(window.localStorage.getItem('projectList'));

const createModal = (idName, form=undefined) => {
    let modal = setElemWithAttrs("div", [
        ["class", "modal"],
        ["id", idName]
    ]);
    addModalContent(modal, form);
    modal.firstChild.firstChild.onclick = () => {
        closeModal(modal);
    }
    return modal;
}

const addModalContent = (modal, form) => {
    let modalContent = setElemWithAttrs("div", [["class", "modal-content"]]);
    let closer = setElemWithAttrs("span", [["class", "close-modal"]]);
    closer.innerHTML = "&times<br><br>";
    modalContent.appendChild(closer);
    modal.appendChild(modalContent);
    form ? modalContent.appendChild(form) : setObjContent(modal);
}

const findObj = (id) => {
    let list = (id[0] === "t" ? tasks : projects);
    return list.find(obj => id === obj.id);
}

const findProject = (obj) => {
    if (obj.projectId) findObj(obj.projectId);
}

const setObjContent = (modal) => {
    let obj = findObj(modal.id);
    modal.firstChild.innerHTML += setObjText(obj);
    setObjChecklist(modal, obj);
    modal.id[0] === "p" ? addTaskButton(modal) : addSubtaskButton(modal, obj);
    addEditButton(modal, obj);
    addDeleteButton(modal);
}

const setObjText = (obj) => {
    let project = findProject(obj);
    return `<p>Title: ${obj.title}</p>
    <p>Completed: ${obj.completed ? "yes" : "no"}</p>
    <p>Larger Project: ${project ? project.title : "---"} </p>
    <p>Start Date: ${format(obj.date, 'MMMM Do, YYYY')}</p>
    <p>Due Date: ${obj.dueDate ? format(obj.dueDate, 'MMMM Do, YYYY') : "---"}</p>
    <p>Description: ${obj.description ? obj.description : "---"}</p>
    <p>To Do:</p>`;
}

const projTasks = (project) => {
    let list = [];
    project.tasks.map(task => {
        list.push(tasks.find(t => task.id === t.id));
    })
    return list;
}

const isCompleted = (item) => item.completed === true;

const setStatus = (checkbox, item) => {
    checkbox.innerHTML = (item.completed ? "&#9745 " : "&#9744 ") + item.title;
}

const resetLists = () => {
    setLS('taskList', tasks);
    setLS('projectList', projects);
}

const setObjChecklist = (modal, obj) => {
    let list = obj.subtasks || projTasks(obj);
    if (list[0]) {
        let checklist = setElemWithAttrs("ul", [["class", "checklist"]]);
        list.map(st => {
            let i = (st.projectId ? findObj(st.id) : st);
            let checkbox = setElemWithAttrs("li", [["class", "checkbox"]]);
            setStatus(checkbox, i);
            checklist.appendChild(checkbox);
            checkbox.onclick = () => { 
                i.completed = !i.completed;
                setStatus(checkbox, i);
                obj.completed = list.every(isCompleted);
                resetLists();
            }
        })
        modal.firstChild.appendChild(checklist);
    }
}

const openModal = (modal) => modal.style.display = "block";

const closeModal = (modal) => {
    event.stopPropagation();
    modal.style.display = "none";
}

const createButton = (modal, action) => {
    let objName;
    if (modal.id[0] === "t") { objName = "task"; } 
        else if (modal.id[0] === "t") { objName = "project"; } 
        else { objName = "subtask"; }
    let newButton = setElemWithAttrs("button", [["class", `${action}-${objName}`]]);
    modal.firstChild.appendChild(newButton);
    return newButton;
}

const addTaskButton = (modal) => {
    let newTask = createButton(modal, "add");
    newTask.textContent = "Add New Task";
    newTask.onclick = () => {
        closeModal(modal);
        selectQuery("#task-form").reset();
        setValue("t-project", modal.id);
        openModal(selectQuery("#task-form-modal"));
    }
}

const addSubtaskButton = (modal, task) => {
    let newSubtask = createButton(modal, "add");
    newSubtask.textContent = "Add Subtask";
    let form = selectQuery("#subtask-form");
    let heading = document.createElement("h3");
    heading.textContent = task.title;
    newSubtask.onclick = () => {
        closeModal(modal);
        form.parentNode.insertBefore(heading, form);
        setValue("s-taskId", task.id);
        openModal(selectQuery("#subtask-form-modal"));
    }
}

const addEditButton = (modal, obj) => {
    let objName = (modal.id[0] === "t" ? "task" : "project");
    let editButton = createButton(modal, "edit");
    let form = selectQuery(`#${objName}-form`);
    editButton.textContent = `Edit ${capitalize(objName)}`;
    editButton.onclick = () => {
        closeModal(modal);
        openModal(form.parentNode.parentNode);
        populateForm(obj);
    }
}

const addDeleteButton = (modal) => {
    let deleteButton = createButton(modal, "delete");
    deleteButton.textContent = `Delete ${(modal.id[0] === "t" ? "Task" : "Project")}`
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