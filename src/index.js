import './styles/main.scss';
import { format, isValid } from 'date-fns';

const showDate = (date) => {
    const heading = document.querySelector("#cont-heading");
    let dateDisplay = date ? date : new Date();
    return heading.textContent = format(dateDisplay, 'MMMM Do, YYYY');
}

showDate();