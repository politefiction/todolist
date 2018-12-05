// find a way to implement dynamic names, so I can actually retrieve this stuff
// task array and project array; then it can be filtered, too
const taskList = [];
const projectList = [];

const Task = (title, description, date, priority="low", projectId) => {
    return { title, description, date, priority, projectId }
}

const Project = (title, description, date, priority="low", tasks=[], projectId=projectList.length ) => {
    return { title, description, date, priority, tasks, projectId }
}

const Planner = (() => {
    const addTask = (t) => taskList.push(t)
    const addProject = (p) => projectList.push(p)
    const addTaskToProject = (p, t) => {
        t.projectId = p.projectId;
        addTask(t);
        p.tasks.push(t)
    }

    return { addTask, addProject, addTaskToProject }
})();

export default { Task, Project, Planner };