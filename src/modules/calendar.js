import {
  getDay,
  getDaysInMonth,
  isToday,
  isSameDay,
  startOfMonth,
} from 'date-fns';
import {
  setElemWithAttrs,
  selectQuery,
  appendChildren,
  getLS,
  setElemWithText,
  getSelDate,
  setSelDate,
  updateMonth,
} from './miscTools';
import { createModal, openModal } from './modals';

const tasks = getLS('taskList');
const projects = getLS('projectList');

const container = selectQuery('#container');
const calendar = setElemWithAttrs('article', [['id', 'calendar']]);
container.appendChild(calendar);

const generateCalTop = () => {
  const weekdays = generateWeekdays();
  appendChildren(calendar, [weekdays]);
};

const generateWeekdays = () => {
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat'];
  const weekdays = setElemWithAttrs('div', [['id', 'weekdays']]);
  dayNames.forEach(name => {
    let weekday = setElemWithText('div', name);
    weekdays.appendChild(weekday);
  });
  return weekdays;
};

const setCalDayAttrs = (calDay, date) => {
  if (isToday(date)) calDay.setAttribute('id', 'today');
  if (isSameDay(date, getSelDate())) {
    calDay.setAttribute('id', 'selected-date');
  }
  if (date.getMonth() !== getSelDate().getMonth()) {
    calDay.className += ' diff-month';
  }
};

const addCalendarDay = (date, week) => {
  let calDay = setElemWithAttrs('div', [
    ['class', 'calendar-day'],
    ['name', date]
  ]);
  setCalDayAttrs(calDay, date);
  calDay.innerHTML = `<p>${date.getDate()}</p>`;
  week.appendChild(calDay);
};

const clearCalendar = () => {
  if (calendar.firstChild) {
    calendar.removeChild(calendar.firstChild);
    calendar.removeChild(calendar.firstChild);
  }
  calendar.querySelectorAll('.week').forEach(week => {
    calendar.removeChild(week);
  });
};

const firstWeekday = () => getDay(startOfMonth(getSelDate()));

const isExtendedMonth = () => {
  return (
    (getDaysInMonth(getSelDate()) > 29 && firstWeekday() > 5) ||
    (getDaysInMonth(getSelDate()) > 30 && firstWeekday() > 4)
  );
};

const calculateCalendarDays = () => {
  if (getDaysInMonth(getSelDate()) < 29 && firstWeekday() < 1) {
    return 27;
  } else {
    return isExtendedMonth() ? 41 : 34;
  }
};

const getDateFor = (calDay) => calDay.getAttribute('name');

const selectDate = calDay => {
  setSelDate(getDateFor(calDay));
  updateMonth();
  return renderCalendar(getSelDate());
};

const addDateSelection = () => {
  const calDays = document.querySelectorAll('.calendar-day');
  calDays.forEach(cd => {
    if (!isSameDay(getSelDate(), getDateFor(cd))) {
      cd.onclick = () => selectDate(cd);
    }
  });
};

const addWeeks = () => {
  const calendar = selectQuery('#calendar');
  for (let i = 0; i < (calculateCalendarDays() + 1) / 7; i++) {
    let week = setElemWithAttrs('div', [['class', 'week']]);
    calendar.appendChild(week);
  }
};

const displayOnCal = list => {
  list.forEach(obj => {
    let idName = obj.id;
    addToCalendar(obj, createObjDiv(obj), idName);
    if (obj.dueDate) {
      addToCalendar(obj, createObjDiv(obj), idName, true);
    }
  });
};

const createObjDiv = obj => {
  let className = obj.id[0] === 't' ? 'task-div' : 'project-div';
  return setElemWithAttrs('div', [
    ['class', `${className} ${obj.priority.toLowerCase()}`]
  ]);
};

const addToCalendar = (obj, objDiv, idName, due = false) => {
  const calendarDays = document.querySelectorAll('.calendar-day');
  objDiv.textContent = (due ? 'DUE: ' : '') + obj.title;
  let objDate = due ? obj.dueDate : obj.date;
  let compDate = new Date(objDate.split(' ')[0]).setHours(24);
  calendarDays.forEach(calDay => {
    if (new Date(getDateFor(calDay)).getTime() === new Date(compDate).getTime()) {
      calDay.appendChild(objDiv);
      let modal = createModal(idName);
      objDiv.appendChild(modal);
      objDiv.onclick = () => openModal(modal);
    }
  });
};

const setCurrentMonth = () => {
  addWeeks();
  let weeks = document.querySelectorAll('.week');
  let weekStart = 1 - getDay(startOfMonth(getSelDate()));
  let d = 0;
  for (let i = weekStart; i <= calculateCalendarDays() + weekStart; i++) {
    let date = new Date(getSelDate().getFullYear(), getSelDate().getMonth(), i);
    addCalendarDay(date, weeks[Math.floor(d / 7)]);
    d++;
  }
};

const renderCalendar = (date=undefined) => {
  if (date) setSelDate(date);
  clearCalendar();
  generateCalTop();
  setCurrentMonth();
  addDateSelection();
  if (projects) displayOnCal(projects);
  if (tasks) displayOnCal(tasks);
};

export { renderCalendar, clearCalendar };
