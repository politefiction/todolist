import './styles/main.scss';
import { format, isValid } from 'date-fns';
// will need to import the date sorting stuff, probably

const showDate = (date) => {
    const heading = document.querySelector("#cont-heading");
    let dateDisplay = date ? date : new Date();
    return heading.textContent = format(dateDisplay, 'MMMM Do, YYYY');
}

const addTaskButton = document.querySelector("#add-task");
addTaskButton.onclick = () => {
    const form = document.querySelector("form");
    form.style.display = (form.style.display === "none" ? "block" : "none")
}

showDate();