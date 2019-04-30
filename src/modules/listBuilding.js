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
        if (parseInt(t.id.slice(1)) == taskCount) {
            localStorage.setItem('taskCount', taskCount+1);
        }
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

    const deleteTask = (id) => {
        let newTaskList = taskList.filter(task => task.id != id);
        localStorage.setItem('taskList', JSON.stringify(newTaskList));
    }

    const deleteProject = (id) => {
        let newProjList = projectList.filter(project => project.id != id);
        localStorage.setItem('projectList', JSON.stringify(newProjList));
    }

    return { addProject, addTaskToProject, deleteTask, deleteProject }
})();

export { Task, Project, manageList, taskCount, projectCount };