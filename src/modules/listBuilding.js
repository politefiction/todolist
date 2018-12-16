let taskList = JSON.parse(window.localStorage.getItem('taskList')) || [];
const projectList = [];

const Task = (title, description, date, priority, projectId) => {
    return { title, description, date, priority, projectId }
}

const Project = (title, description, date, priority, tasks=[], projectId=projectList.length ) => {
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