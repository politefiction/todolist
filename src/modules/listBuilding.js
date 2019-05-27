let subtaskCount = parseInt(window.localStorage.getItem('subtaskCount')) || 0;

let tasks = JSON.parse(window.localStorage.getItem('taskList')) || [];
let taskCount = parseInt(window.localStorage.getItem('taskCount')) || 0;

let projects = JSON.parse(window.localStorage.getItem('projectList')) || [];
let projectCount = parseInt(window.localStorage.getItem('projectCount')) || 0;

const Subtask = (id, title, taskId, completed=false) => {
    return { id, title, taskId, completed };
}

const Task = (id, title, description, date, dueDate, priority, projectId, subtasks=[],completed=false) => {
    return { id, title, description, date, dueDate, priority, projectId, subtasks,completed }
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
        let p = projects.find(p => p.id === t.projectId);
        p.tasks.push(t);
        localStorage.setItem('projectList', JSON.stringify(projects));
    }

    const addSubtaskToTask = (s) => {
        let t = tasks.find(t => t.id === s.taskId);
        t.subtasks.push(s);
        localStorage.setItem('subtaskCount', subtaskCount+1)
        localStorage.setItem('taskList', JSON.stringify(tasks));
    }

    const deleteTask = (id) => {
        tasks = tasks.filter(t => t.id != id);
        localStorage.setItem('taskList', JSON.stringify(tasks));
    }

    const deleteProject = (id) => {
        let p = projects.find(project => project.id === id);
        p.tasks.forEach(task =>  deleteTask(task.id));
        projects = projects.filter(project => project.id != id);
        localStorage.setItem('projectList', JSON.stringify(projects));
    }

    return { addProject, addTaskToProject, addSubtaskToTask, deleteTask, deleteProject }
})();

export { Task, Project, Subtask, manageList, taskCount, projectCount, subtaskCount };