let tasks = JSON.parse(window.localStorage.getItem('taskList')) || [];
let taskCount = parseInt(window.localStorage.getItem('taskCount')) || 0;

let projects = JSON.parse(window.localStorage.getItem('projectList')) || [];
let projectCount = parseInt(window.localStorage.getItem('projectCount')) || 0;

const Task = (id, title, description, date, dueDate, priority, projectId, completed=false) => {
    return { id, title, description, date, dueDate, priority, projectId, completed }
}

const Project = (id, title, description, date, dueDate, priority, tasks=[], completed=false ) => {
    return { id, title, description, date, dueDate, priority, tasks, completed }
}

const manageList = (() => {
    const addTask = (t) => {
        tasks.push(t);
        localStorage.setItem('taskList', JSON.stringify(tasks));
        localStorage.setItem('taskCount', taskCount+1);
    }

    const addProject = (p) => {
        projects.push(p);
        localStorage.setItem('projectList', JSON.stringify(projects));
        localStorage.setItem('projectCount', projectCount+1);
    }

    const addTaskToProject = (t) => {
        addTask(t);
        let p = projects.filter(p => p.id === t.projectId)[0];
        p.tasks.push(t);
        localStorage.setItem('projectList', JSON.stringify(projects));
    }

    const deleteTask = (id) => {
        tasks = tasks.filter(t => t.id != id);
        localStorage.setItem('taskList', JSON.stringify(tasks));
    }

    const deleteProject = (id) => {
        let p = projects.filter(project => project.id === id)[0];
        p.tasks.forEach(task =>  deleteTask(task.id));
        projects = projects.filter(project => project.id != id);
        localStorage.setItem('projectList', JSON.stringify(projects));
    }

    return { addProject, addTaskToProject, deleteTask, deleteProject }
})();

export { Task, Project, manageList, taskCount, projectCount };