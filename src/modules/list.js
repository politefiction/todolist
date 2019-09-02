import { format, isSameMonth } from 'date-fns';
import {
  setElemWithAttrs,
  setElemWithText,
  selectQuery,
  capitalize,
  appendChildren,
  sortByDate,
  setSelDate,
  getSelDate,
  clearChildrenFrom
} from './miscTools';
import { generateModal } from './modals';

const tasks = JSON.parse(window.localStorage.getItem('taskList'));
const projects = JSON.parse(window.localStorage.getItem('projectList'));

const container = selectQuery('#container');
let listView = setElemWithAttrs('article', [
  ['id', 'list-view'],
  ['class', 'hidden']
]);
container.appendChild(listView);

const generateProjList = status => {
  let heading = setElemWithText(
    'h3',
    `Projects ${capitalize(status)} This Month`
  );
  let projSection = setElemWithAttrs('section', [['class', 'project-list']]);
  let projList = sortByDate(
    projects.filter(p => {
      return isSameMonth(
        new Date(status === 'starting' ? p.date : p.dueDate),
        getSelDate()
      );
    })
  );
  projSection.appendChild(heading);
  projList.forEach(p => projSection.appendChild(createObjEntry(p)));
  return projSection;
};

const displayProjects = () => {
  let startList = generateProjList('starting');
  let dueList = generateProjList('due');
  appendChildren(listView, [startList, dueList]);
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

  if (new Date(obj.dueDate) != 'Invalid Date')
    title.textContent += ` (Due ${format(obj.dueDate, 'M/DD/YY')})`;
  appendChildren(entry, [dot, title]);

  title.onclick = () => {
    clearChildrenFrom(selectQuery('.modal-text'));
    generateModal(obj.id);
  };

  mainEntry ? mainEntry.lastChild.appendChild(entry) : addTaskList(obj, entry);

  return entry;
};

const renderList = (date = undefined) => {
  if (date) setSelDate(date);
  clearChildrenFrom(listView);
  displayProjects();
};

export { renderList };
