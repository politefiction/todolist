import './styles/main.scss';
import { format } from 'date-fns';

const showDate = () => {
    return format(new Date(2014, 20, 2), 'MMMM Do, YYYY');
}

console.log(showDate());