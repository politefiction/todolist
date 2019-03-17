let taskList = JSON.parse(window.localStorage.getItem('taskList')) || [];
const projectList = [];

// will need to add dueDate to this and projects
const Task = (taskID, title, description, date, priority, projectId) => {
    return { taskID, title, description, date, priority, projectId }
}

// projectID should probably be alphanumeric
const Project = (projectId, title, description, date, priority, tasks=[] ) => {
    return { title, description, date, priority, tasks, projectId }
}

const manageList = (() => {
    const addTask = (t) => {
        taskList.push(t)
        window.localStorage.setItem('taskList', JSON.stringify(taskList))
    }
    const addProject = (p) => projectList.push(p)
    const addTaskToProject = (p, t) => {
        t.projectId = p.projectId;
        addTask(t);
        p.tasks.push(t)
    }

    return { addTask, addProject, addTaskToProject }
})();

export { Task, Project, manageList, taskList, projectList };