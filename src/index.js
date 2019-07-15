import './styles/main.scss';
import { selectQuery, getLS, setSelDate, addMYSelection, updateMonth } from './modules/miscTools';
import {
  generateForm,
  generateSubtaskForm,
  addFormSubmission
} from './modules/forms';
import { openModal } from './modules/modals';
import { renderCalendar } from './modules/calendar';
import { compileOngoingPL } from './modules/sidebar';
import { renderList } from './modules/list';

let projectList = getLS('projectList');

const newTaskButton = selectQuery('#new-task-button');
generateForm('task', newTaskButton);
const taskForm = selectQuery('#task-form');
const tfModal = selectQuery('#task-form-modal');

const newProjectButton = selectQuery('#new-project-button');
generateForm('project', newProjectButton);
const projectForm = selectQuery('#project-form');
const pfModal = selectQuery('#project-form-modal');

const newSubtaskButton = selectQuery('#new-subtask-button');
generateSubtaskForm(newSubtaskButton);
const subtaskForm = selectQuery('#subtask-form');

newTaskButton.onclick = () => {
  if (projectList === null || projectList.length === 0) {
    return alert('Please start a new project first.');
  }
  taskForm.reset();
  openModal(tfModal);
};

newProjectButton.onclick = () => {
  projectForm.reset();
  openModal(pfModal);
};

addFormSubmission(taskForm);
addFormSubmission(projectForm);
addFormSubmission(subtaskForm);

const changeViewBtn = selectQuery('#change-view-btn');
const articles = document.querySelectorAll('article');

changeViewBtn.onclick = () => {
  changeViewBtn.textContent =
    changeViewBtn.textContent === 'List View' ? 'Calendar View' : 'List View';
  articles.forEach(art => art.classList.toggle('hidden'));
};

setSelDate();
updateMonth();
// works with calendar! not with list though
addMYSelection([renderCalendar, renderList])


compileOngoingPL();
renderList();
renderCalendar();
