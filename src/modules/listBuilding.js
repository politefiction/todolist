let taskList = JSON.parse(window.localStorage.getItem('taskList')) || [];
let projectList = JSON.parse(window.localStorage.getItem('projectList')) || [];
let taskCount = parseInt(window.localStorage.getItem('taskCount')) || 0;
let projectCount = parseInt(window.localStorage.getItem('projectCount')) || 0;

const Task = (id, title, description, date, dueDate, priority, projectId) => {
    return { id, title, description, date, dueDate, priority, projectId }
}

const Project = (id, title, description, date, dueDate, priority, tasks=[] ) => {
    return { id, title, description, date, dueDate, priority, tasks }
}

const manageList = (() => {
    const addTask = (t) => {
        taskList.push(t);
        localStorage.setItem('taskList', JSON.stringify(taskList));
        localStorage.setItem('taskCount', taskCount+1);
    }
    const addProject = (p) => {
        projectList.push(p);
        localStorage.setItem('projectList', JSON.stringify(projectList));
        localStorage.setItem('projectCount', projectCount+1);
    }
    const addTaskToProject = (p, t) => {
        addTask(t);
        p.tasks.push(t);
        localStorage.setItem('projectList', JSON.stringify(projectList));
    }

    return { addTask, addProject, addTaskToProject }
})();

export { Task, Project, manageList, taskList, projectList, taskCount, projectCount };