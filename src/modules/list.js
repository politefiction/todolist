import { format, isSameMonth } from 'date-fns';
import {
  setElemWithAttrs,
  setElemWithText,
  selectQuery,
  appendChildren,
  sortByDate,
  setSelDate,
  getSelDate
} from './miscTools';
import { createModal, openModal } from './modals';

const tasks = JSON.parse(window.localStorage.getItem('taskList'));
const projects = JSON.parse(window.localStorage.getItem('projectList'));
const modalDiv = selectQuery('#modal-div');
//const modals = document.querySelectorAll('.modals');

const container = selectQuery('#container');
let listView = setElemWithAttrs('article', [['id', 'list-view'], ['class', 'hidden']]);
container.appendChild(listView);

const clearList = () => {
  if (listView.firstChild) {
    let children = Array.from(listView.children);
    children.map(child => listView.removeChild(child));
  }
};

const displayProjects = () => {
  let startHeading = setElemWithText('h3', 'Projects Starting This Month');
  let startList = setElemWithAttrs('section', [['class', 'project-list']]);
  let startingProjects = sortByDate(
    projects.filter(p => {
      return isSameMonth(new Date(p.date), getSelDate());
    })
  );
  startList.appendChild(startHeading);
  startingProjects.forEach(p => startList.appendChild(createObjEntry(p)));

  let dueHeading = setElemWithText('h3', 'Projects Due This Month');
  let dueList = setElemWithAttrs('section', [['class', 'project-list']]);
  let dueProjects = sortByDate(
    projects.filter(p => {
      return isSameMonth(new Date(p.dueDate), getSelDate());
    })
  );
  dueList.appendChild(dueHeading);
  dueProjects.forEach(p => dueList.appendChild(createObjEntry(p)));

  appendChildren(listView, [startList, dueList]);
};

const addModal = (id) => {
  let modal = createModal(`${id}`);
  modalDiv.appendChild(modal);
  return modal;
};

const addTaskList = (obj, entry) => {
  let listOfTasks = setElemWithAttrs('div', [['class', 'task-list']]);
  obj.tasks.forEach(task => {
    let t = tasks.find(obj => obj.id === task.id);
    listOfTasks.appendChild(createObjEntry(t, entry));
  });
  entry.appendChild(listOfTasks);
};

const createObjEntry = (obj, mainEntry = undefined) => {
  let objName = obj.id[0] === 't' ? 'task' : 'project';
  let entry = setElemWithAttrs('div', [['class', `${objName}-entry`]]);
  let dot = setElemWithAttrs('div', [
    ['class', `dot ${obj.priority.toLowerCase()}`]
  ]);
  let title = setElemWithAttrs('div', [['class', 'title']], obj.title);
  let modal = selectQuery(`.modal ${obj.id}`) || addModal(obj.id);
  if (new Date(obj.dueDate) != 'Invalid Date')
    title.textContent += ` (Due ${format(obj.dueDate, 'M/DD/YY')})`;
  appendChildren(entry, [dot, title]);

  title.onclick = () => openModal(modal);

  if (mainEntry) {
    return mainEntry.lastChild.appendChild(entry);
  } else {
    addTaskList(obj, entry);
  }

  return entry;
};

const renderList = (date = undefined) => {
  if (date) setSelDate(date);
  clearList();
  displayProjects();
};

export { renderList, clearList };

/*
const sortProjects = (due=false) => {
  sortByDate(projects.filter(p => {
      return isSameMonth(new Date((due ? p.dueDate : p.date)), getSelDate());
    }))
}
*/