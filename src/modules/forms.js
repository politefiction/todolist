import { Task, Project, taskCount, projectCount, manageList, subtaskCount } from './listBuilding';
import { setElemWithAttrs, appendChildren, insertAfter, capitalize, setValue, getValue, getTime } from './miscTools';
import { createModal, closeModal } from './modals';

let tasks = JSON.parse(window.localStorage.getItem('taskList'));
let projects = JSON.parse(window.localStorage.getItem('projectList'));

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
    ["Low", "Medium", "High"].map(prty => setOptionFor(select, prty))
    appendChildren(form, [label, select]);
    placeBreak(form);
}

const addProjectList = (form) => {
    let label = setElemWithAttrs ("label", [["for", "Projects"]]);
    label.textContent = "Choose Project";
    let select = setElemWithAttrs("select", [["name", "t-project"]]);
    if (projects) {
        projects.map(p => setOptionFor(select, p));
    }
    appendChildren(form, [label, select]);
    placeBreak(form);
}

const setOptionFor = (select, obj) => {
    let option = document.createElement("option");
    if (obj.id) {
        option.setAttribute("value", `${obj.id}`);
        option.textContent = obj.title;
    } else {
        option.textContent = obj;
    }
    return select.appendChild(option);
}

const placeBreak = (form) => form.innerHTML += "<br>";

const addSaveButton = (form, objName) => {
    const saveButton = setElemWithAttrs("button", [["id", `save-${objName}`]]);
    saveButton.textContent = `Save ${capitalize(objName)}`;
    placeBreak(form);
    form.appendChild(saveButton);
}

const addForm = (form, button) => {
    let obj = form.id.split("-")[0];
    let modal = createModal(`${obj}-form-modal`, form);
    insertAfter(modal, button);
}

const generateForm = (objName, button) => {
    let form = setElemWithAttrs("form", [["id", `${objName}-form`]]);
    let dueBool = (objName === "project" ? "required" : undefined);
    let hiddenId = setElemWithAttrs("input", [
        ["type", "hidden"], ["name", `${objName[0]}-id`]
    ])
    form.appendChild(hiddenId);

    if (objName === "task") addProjectList(form);
    addLabelInput(form, objName, "text", `${objName[0]}-title`, "required");
    addPriorityList(form, `${objName[0]}-priority`);
    addLabelInput(form, "Start Date", "date", `${objName[0]}-date`, "required");
    addLabelInput(form, "Time", "time", `${objName[0]}-time`);
    addLabelInput(form, "Due Date", "date", `${objName[0]}-due-date`, dueBool);
    addLabelInput(form, "Due Time", "time", `${objName[0]}-due-time`);
    addLabelInput(form, "Description", "text", `${objName[0]}-description`);
    addSaveButton(form, objName);
    addForm(form, button);
}

const generateSubtaskForm = (button) => {
    let form = setElemWithAttrs("form", [["id", "subtask-form"]]);
    let hiddenTaskId = setElemWithAttrs("input", [
        ["type", "hidden"], ["name", "s-taskId"]
    ]);
    form.appendChild(hiddenTaskId);
    addLabelInput(form, "subtask", "text", "s-title", "required");
    placeBreak(form);
    addSaveButton(form, "subtask");
    addForm(form, button)
}

const createTask = () => {
    return Task(`t${taskCount}`,
        getValue("t-title"),
        getValue("t-description"),
        `${getValue("t-date")} ${getTime("t-time")}`,
        `${getValue("t-due-date")} ${getTime("t-due-time")}`,
        getValue("t-priority"),
        getValue("t-project")
    );
}

const createProject = () => {
    return Project(
        `p${projectCount}`,
        getValue("p-title"),
        getValue("p-description"),
        `${getValue("p-date")} ${getTime("p-time")}`,
        `${getValue("p-due-date")} ${getTime("p-due-time")}`,
        getValue("p-priority")
    );
}

const populateForm = (obj) => {
    let pf = obj.id[0]
    setValue(`${pf}-id`, obj.id);
    if (pf === "t") setValue(`${pf}-project`, obj.projectId);
    setValue(`${pf}-priority`, obj.priority);
    setValue(`${pf}-title`, obj.title);
    setValue(`${pf}-description`, obj.description);
    setValue(`${pf}-date`, obj.date.split(" ")[0]);
    setValue(`${pf}-time`, obj.date.split(" ")[1]);
    setValue(`${pf}-due-date`, obj.dueDate.split(" ")[0]);
    setValue(`${pf}-due-time`, obj.dueDate.split(" ")[1]);
}

const updateObj = (obj) => {
    let pf = obj.id[0];
    let list = (pf === "t" ? tasks : projects);
    let lsList = (pf === "t" ? 'taskList' : 'projectList');

    obj.title = getValue(`${pf}-title`);
    obj.description = getValue(`${pf}-description`);
    obj.date = `${getValue(`${pf}-date`)} ${getTime(`${pf}-time`)}`;
    obj.dueDate = `${getValue(`${pf}-due-date`)} ${getTime(`${pf}-due-time`)}`;
    obj.priority = getValue(`${pf}-priority`);
    if (pf === "t") obj.projectId = getValue(`${pf}-project`);
    localStorage.setItem(lsList, JSON.stringify(list));
}

const saveTask = () => {
    if (tasks) {
        let task = tasks.filter(t => t.id === getValue("t-id"))[0];
        if (task) return updateObj(task);
    }
    let task = createTask();
    manageList.addTaskToProject(task);
}

const saveProject = () => {
    if (projects) {
        let project = projects.filter(p => p.id === getValue("p-id"))[0];
        if (project) return updateObj(project);
    }
    let project = createProject();
    manageList.addProject(project);
}

const saveSubtask = () => {
    let subtask = Subtask(
        `s${subtaskCount}`,
        getValue("s-title"),
        getValue("s-taskId")
    )
    manageList.addSubtaskToTask(subtask);
}

const addFormSubmission = (form) => {
    form.onsubmit = () => {
        form.id === "task-form" ? saveTask() : saveProject();
        closeModal(form.parentElement.parentElement);
    }
}

export { generateForm, generateSubtaskForm, addFormSubmission, populateForm };