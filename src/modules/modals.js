import { format } from 'date-fns';
import {
  setElemWithAttrs,
  capitalize,
  setValue,
  selectQuery,
  setLS
} from './miscTools';
import { manageList } from './listBuilding';
import { populateForm } from './forms';

const tasks = JSON.parse(window.localStorage.getItem('taskList'));
const projects = JSON.parse(window.localStorage.getItem('projectList'));

const getObjId = modal => {
  return modal.classList[1];
}

const createModal = (objId, form = undefined) => {
  let modal = form ? 
    setElemWithAttrs('div', [['class', 'modal'], ['id', objId]]) :
    setElemWithAttrs('div', [['class', `modal ${objId}`]])
  addModalContent(modal, form);
  modal.firstChild.firstChild.onclick = () => {
    closeModal(modal);
  };
  return modal;
};

const addModalContent = (modal, form) => {
  let modalContent = setElemWithAttrs('div', [['class', 'modal-content']]);
  let closer = setElemWithAttrs('span', [['class', 'close-modal']]);
  closer.innerHTML = '&times<br><br>';
  modalContent.appendChild(closer);
  modal.appendChild(modalContent);
  form ? modalContent.appendChild(form) : setObjContent(modal);
};

const findObj = id => {
  let list = id[0] === 't' ? tasks : projects;
  return list.find(obj => id === obj.id);
};

const findProject = obj => {
  if (obj.projectId) findObj(obj.projectId);
};

const setObjContent = modal => {
  let obj = findObj(getObjId(modal));
  modal.firstChild.innerHTML += setObjText(obj);
  addObjChecklist(modal, obj);
  addObjButton(getObjId(modal)[0] === 'p' ? modal : modal, obj);
  addEditButton(modal, obj);
  addDeleteButton(modal);
};

const setObjText = obj => {
  let project = findProject(obj);
  return `<p>Title: ${obj.title}</p>
    <p>Completed: ${obj.completed ? 'yes' : 'no'}</p>
    <p>Larger Project: ${project ? project.title : '---'} </p>
    <p>Start Date: ${format(obj.date, 'MMMM Do, YYYY')}</p>
    <p>Due Date: ${
      obj.dueDate ? format(obj.dueDate, 'MMMM Do, YYYY') : '---'
    }</p>
    <p>Description: ${obj.description ? obj.description : '---'}</p>
    <p>To Do:</p>`;
};

const projTasks = project => {
  let list = [];
  project.tasks.map(task => {
    list.push(tasks.find(t => task.id === t.id));
  });
  return list;
};

const isCompleted = item => item.completed === true;

const setStatus = (checkbox, item) => {
  checkbox.innerHTML = (item.completed ? '&#9745 ' : '&#9744 ') + item.title;
};

const resetLists = () => {
  setLS('taskList', tasks);
  setLS('projectList', projects);
};

const addObjChecklist = (modal, obj) => {
  let list = obj.subtasks || projTasks(obj);
  let checklist = setElemWithAttrs('ul', [['class', 'checklist']]);
  if (list[0]) buildChecklist(obj, list, checklist);
  modal.firstChild.appendChild(checklist);
};

const buildChecklist = (obj, list, checklist) => {
  list.map(st => {
    let item = st.projectId ? findObj(st.id) : st;
    let checkbox = setElemWithAttrs('li', [['class', 'checkbox']]);
    setStatus(checkbox, item);
    checklist.appendChild(checkbox);
    checkbox.onclick = () => {
      item.completed = !item.completed;
      setStatus(checkbox, item);
      obj.completed = list.every(isCompleted);
      resetLists();
    };
  });
  return checklist;
}

const openModal = modal => modal.style.display = 'block';

const closeModal = modal => {
  event.stopPropagation();
  modal.style.display = 'none';
};

const createButton = (modal, action) => {
  let objName;
  if (getObjId(modal)[0] === 't') {
    objName = 'task';
  } else if (getObjId(modal)[0] === 'p') {
    objName = 'project';
  } else {
    objName = 'subtask';
  }
  let button = setElemWithAttrs('button', 
    [['class', `${action}-${objName}`]],
    `${capitalize(action)} ${capitalize(objName)}`);
  modal.firstChild.appendChild(button);
  return button;
};

const addObjButton = (modal, task=undefined) => {
  let objName = (getObjId(modal)[0] === 'p' ? 'task' : 'subtask');
  let button = createButton(modal, 'add');
  button.textContent = `Add ${capitalize(objName)}`
  button.onclick = () => {
    closeModal(modal);
    selectQuery(`#${objName}-form`).reset();
    if (objName === 'subtask') {
      selectQuery('#s-heading').textContent = `Add subtask for: ${task.title}`;
      setValue('s-taskId', task.id);
    }
    openModal(selectQuery(`#${objName}-form-modal`));
  }
}

const addEditButton = (modal, obj) => {
  let objName = getObjId(modal)[0] === 't' ? 'task' : 'project';
  let editButton = createButton(modal, 'edit');
  let form = selectQuery(`#${objName}-form`);
  editButton.onclick = () => {
    closeModal(modal);
    openModal(form.parentNode.parentNode);
    populateForm(obj);
  };
};

const addDeleteButton = modal => {
  let deleteButton = createButton(modal, 'delete');
  deleteButton.onclick = () => {
    if (confirm('Are you sure you want to delete?')) {
      getObjId(modal)[0] === 't'
        ? manageList.deleteTask(getObjId(modal))
        : manageList.deleteProject(getObjId(modal));
      location.reload();
    }
  };
};

export { createModal, openModal, closeModal };
