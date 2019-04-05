let taskList = JSON.parse(window.localStorage.getItem('taskList')) || [];
let projectList = JSON.parse(window.localStorage.getItem('projectList')) || [];

const Task = (id, title, description, date, dueDate, priority, projectId) => {
    return { id, title, description, date, dueDate, priority, projectId }
}

const Project = (id, title, description, date, dueDate, priority, tasks=[] ) => {
    return { id, title, description, date, dueDate, priority, tasks }
}

const manageList = (() => {
    const addTask = (t) => {
        taskList.push(t)
        window.localStorage.setItem('taskList', JSON.stringify(taskList))
    }
    const addProject = (p) => {
        projectList.push(p)
        window.localStorage.setItem('projectList', JSON.stringify(projectList))
    }
    const addTaskToProject = (p, t) => {
        addTask(t);
        p.tasks.push(t)
        window.localStorage.setItem('projectList', JSON.stringify(projectList))
    }

    return { addTask, addProject, addTaskToProject }
})();

export { Task, Project, manageList, taskList, projectList };