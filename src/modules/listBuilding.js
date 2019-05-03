let taskList = JSON.parse(window.localStorage.getItem('taskList')) || [];
let taskCount = parseInt(window.localStorage.getItem('taskCount')) || 0;

let projectList = JSON.parse(window.localStorage.getItem('projectList')) || [];
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

    const addTaskToProject = (t) => {
        addTask(t);
        let p = projectList.filter(p => p.id === t.projectId)[0];
        p.tasks.push(t);
        localStorage.setItem('projectList', JSON.stringify(projectList));
    }

    const deleteTask = (id) => {
        taskList = taskList.filter(t => t.id != id);
        localStorage.setItem('taskList', JSON.stringify(taskList));
    }

    const deleteProject = (id) => {
        let p = projectList.filter(project => project.id === id)[0];
        p.tasks.forEach(task =>  deleteTask(task.id));
        projectList = projectList.filter(project => project.id != id);
        localStorage.setItem('projectList', JSON.stringify(projectList));
    }

    return { addProject, addTaskToProject, deleteTask, deleteProject }
})();

export { Task, Project, manageList, taskCount, projectCount };