import { Task, Project, taskCount, projectCount, manageList } from './listBuilding';
import { setElemWithAttrs, appendChildren, insertAfter, capitalize, getValue, getTime } from './miscTools';
import { createModal, closeModal } from './modals';

let projectList = JSON.parse(window.localStorage.getItem('projectList'));

const addLabelInput = (form, f, t, name, required) => {
    let label = setElemWithAttrs("label", [["for", f]]);
    let input = setElemWithAttrs("input", [
        ["type", t], ["name", name], [required, ""]
    ]);
    label.textContent = capitalize(f);
    appendChildren(form, [label, input]);
    if (t != "text" && t != "date") { placeBreak(form) };
}

const addPriorityList = (form, name) => {
    let label = setElemWithAttrs("label", [["for", "Priority"]]);
    label.textContent = "Priority";
    let select = setElemWithAttrs("select", [["name", name]]);
    ["Low", "Medium", "High"].forEach(priority => {
        let option = document.createElement("option");
        option.textContent = priority;
        select.appendChild(option);
    })
    appendChildren(form, [label, select]);
    placeBreak(form);
}

const addProjectList = (form) => {
    let label = setElemWithAttrs ("label", [["for", "Projects"]]);
    label.textContent = "Choose Project";
    let select = setElemWithAttrs("select", [["name", "t-project"]]);
    if (projectList) {
        projectList.forEach(item => {
            let option = setElemWithAttrs("option", [["value", `${item.id}`]])
            option.textContent = item.title;
            select.appendChild(option);
        })
    } else {
        let option = document.createElement("option");
        option.textContent = "[none]";
        select.appendChild(option);
    }
    appendChildren(form, [label, select]);
    placeBreak(form);
}

const placeBreak = (form) => form.innerHTML += `<br>`;

const addSaveButton = (form, objName) => {
    const saveButton = setElemWithAttrs("button", [["id", `save-${objName}`]]);
    saveButton.textContent = `Save ${capitalize(objName)}`;
    placeBreak(form);
    form.appendChild(saveButton);
}

const addForm = (form) => {
    let item = form.id.slice(4);
    let modal = createModal(`${item}-form-modal`, "form", form);
    insertAfter(modal, `.add-${item}`);
}

const generateForm = (objName) => {
    let form = setElemWithAttrs("form", [["id", `new-${objName}`]]);
    let dueBool = (objName === "project" ? "required" : undefined);
    if (objName === "task") { addProjectList(form); }
    addLabelInput(form, objName, "text", `${objName[0]}-title`, "required");
    addPriorityList(form, `${objName[0]}-priority`);
    addLabelInput(form, "Start Date", "date", `${objName[0]}-date`, "required");
    addLabelInput(form, "Time", "time", `${objName[0]}-time`);
    addLabelInput(form, "Due Date", "date", `${objName[0]}-due-date`, dueBool);
    addLabelInput(form, "Due Time", "time", `${objName[0]}-due-time`);
    addLabelInput(form, "Description", "text", `${objName[0]}-description`);
    addSaveButton(form, objName);
    addForm(form)
}


const addSubmitToForm = (form) => {
    form.onsubmit = () => {
        form.id === "new-task" ? saveTask() : saveProject();
        closeModal(form);
    }
}

const saveTask = () => {
    let project = projectList.filter(p => 
        getValue("t-project") === p.id
    )[0];
    
    let task = Task(
        `t${taskCount}`,
        getValue("t-title"),
        getValue("t-description"),
        `${getValue("t-date")} ${getTime("t-time")}`,
        `${getValue("t-due-date")} ${getTime("t-due-time")}`,
        getValue("t-priority"),
        project.id
    );
    manageList.addTaskToProject(project, task);
}

const saveProject = () => {
    let project = Project(
        `p${projectCount}`,
        getValue("p-title"),
        getValue("p-description"),
        `${getValue("p-date")} ${getTime("p-time")}`,
        `${getValue("p-due-date")} ${getTime("p-due-time")}`,
        getValue("p-priority")
    );
    manageList.addProject(project);
}

export { generateForm, addSubmitToForm };