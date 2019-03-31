import { setElemWithAttrs, appendChildren } from './pageDisplay';

let projectList = JSON.parse(window.localStorage.getItem('projectList'));

const addLabelInput = (form, f, t, name) => {
    let label = setElemWithAttrs("label", [["for", f]]);
    let input = setElemWithAttrs("input", [["type", t],["name", name]]);
    label.textContent = f;
    appendChildren(form, [label, input]);
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
}

const addProjectList = (form) => {
    let label = setElemWithAttrs ("label", [["for", "Projects"]]);
    label.textContent = "Choose Project";
    let select = setElemWithAttrs("select", [["name", "t-project"]]);
    projectList.forEach(item => {
        let option = setElemWithAttrs("option", [["value", `${item.projectId}`]])
        option.textContent = item.title;
        select.appendChild(option);
    })
    appendChildren(form, [label, select])
}

const placeBreak = (form) => {
    form.innerHTML += `<br>`;
}

const addSaveButton = (form, objName) => {
    const saveButton = setElemWithAttrs("button", [["id", `save-${objName.toLowerCase()}`]]);
    saveButton.textContent = `Save ${objName}`;
    form.appendChild(saveButton);
}

const generateForm = (objName, prefix) => {
    let form = document.querySelector(`#new-${objName.toLowerCase()}`);
    if (objName === "Task") {
        addProjectList(form)
        placeBreak(form)
    }
    addLabelInput(form, objName, "text", `${prefix}-title`);
    addPriorityList(form, `${prefix}-priority`);
    placeBreak(form);
    addLabelInput(form, "Start Date", "date", `${prefix}-date`);
    addLabelInput(form, "Time", "time", `${prefix}-time`);
    placeBreak(form);
    addLabelInput(form, "Due Date", "date", `${prefix}-due-date`);
    addLabelInput(form, "Due Time", "time", `${prefix}-due-time`);
    placeBreak(form);
    addLabelInput(form, "Description", "text", `${prefix}-description`);
    placeBreak(form);
    addSaveButton(form, objName);
}

export { generateForm };