const devPrefix = 'http://localhost:3001/api';
const appendApiPrefix = (suffix: string): string => `${devPrefix}${suffix}`;

export const apiRoutes = {
    GET: {
        tasks: appendApiPrefix('/tasks'),
        allResources: appendApiPrefix('/resources/all')
    },
    PUT: {
        changeOrder: appendApiPrefix('/tasks/order'),
        updateTaskDescription: (id: string) =>
            appendApiPrefix(`/tasks/${id}/description`),
        updateTaskDogs: (id: string) => appendApiPrefix(`/tasks/${id}/dogs`),
        updateDogTasks: (id: string) =>
            appendApiPrefix(`/tasks/${id}/dog-tasks`),
        updatePeopleTasks: (id: string) =>
            appendApiPrefix(`/tasks/${id}/people-tasks`)
    },
    POST: {
        addTask: appendApiPrefix('/tasks')
    },
    DELETE: {
        deleteTask: (id: string) => appendApiPrefix(`/tasks/${id}`)
    }
};
