import { format, startOfToday, addHours } from 'date-fns';

const getLS = listName => {
  return JSON.parse(window.localStorage.getItem(listName));
};

const setLS = (listName, list) => {
  return localStorage.setItem(listName, JSON.stringify(list));
};

const noTime = (date) => {
  return new Date(date).toISOString().substr(0,10);
}

const getSelDate = () => {
  let selectedDate = new Date (JSON.parse(window.localStorage.getItem('selectedDate')))
  return addHours(selectedDate, 5);
}

const setSelDate = (date=undefined) => {
  let selectedDate = (date ? noTime(date) : noTime(startOfToday()));
  localStorage.setItem('selectedDate', JSON.stringify(selectedDate))
}

const selectQuery = target => {
  return document.querySelector(target);
};

const capitalize = string => {
  return string[0].toUpperCase() + string.slice(1);
};

const updateMonth = () => {
  let title = selectQuery(".date-title");
  title.textContent = format(getSelDate(), 'MMMM YYYY')
}

const showDate = (elem, date) => {
  let dateDisplay = date ? date : new Date();
  return (elem.textContent = format(dateDisplay, 'MMMM Do, YYYY'));
};

const setElemWithAttrs = (tag, attrs, text = undefined) => {
  let elem = document.createElement(tag);
  attrs.forEach(attr => {
    elem.setAttribute(attr[0], attr[1]);
  });
  if (text) elem.textContent = text;
  return elem;
};

const setElemWithText = (tag, text) => {
  let elem = document.createElement(tag);
  elem.textContent = text;
  return elem;
};

const appendChildren = (elem, children) => {
  children.forEach(child => elem.appendChild(child));
};

const insertAfter = (elem, referenceNode) => {
  referenceNode.parentNode.insertBefore(elem, referenceNode.nextSibling);
};

const setValue = (name, val) => {
  document.getElementsByName(name)[0].value = val;
};

const getValue = name => {
  return document.getElementsByName(name)[0].value;
};

const getTime = name => {
  return getValue(name).length === 0 ? `00:00` : getValue(name);
};

const sortByDate = list => {
  return list.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });
};

const changeMonthYear = (attr, timeDiff, callbacks) => {
  let element = selectQuery(attr);
  element.onclick = () => {
    let date = getSelDate();
    setSelDate(new Date(date.getFullYear(), date.getMonth() + timeDiff));
    updateMonth();
    return callbacks.forEach(cb => cb(getSelDate()));
  };
};

const addMYSelection = (callbacks) => {
  changeMonthYear('.year-back', -12, callbacks);
  changeMonthYear('.month-back', -1, callbacks);
  changeMonthYear('.year-forward', +12, callbacks);
  changeMonthYear('.month-forward', +1, callbacks);
};

export {
  selectQuery,
  getLS,
  setLS,
  appendChildren,
  showDate,
  setElemWithAttrs,
  setElemWithText,
  setValue,
  getValue,
  getTime,
  insertAfter,
  capitalize,
  sortByDate,
  addMYSelection,
  getSelDate,
  setSelDate,
  updateMonth
};

/*
*/