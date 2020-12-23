// const devPrefix = 'http://localhost:3001/api';
const prodPrefix = process.env.REACT_APP_API_PREFIX;
const appendApiPrefix = (suffix: string): string => `${prodPrefix}${suffix}`;

export const apiRoutes = {
    GET: {
        tasks: appendApiPrefix('/tasks'),
        allResources: appendApiPrefix('/resources/all'),
    },
    PUT: {
        changeOrder: appendApiPrefix('/tasks/order'),
        updateTaskDescription: (id: string) =>
            appendApiPrefix(`/tasks/${id}/description`),
        updateTaskDogs: (id: string) => appendApiPrefix(`/tasks/${id}/dogs`),
        updateDogTasks: (id: string) =>
            appendApiPrefix(`/tasks/${id}/dog-tasks`),
        updatePeopleTasks: (id: string) =>
            appendApiPrefix(`/tasks/${id}/people-tasks`),
        updateTaskOrder: (id: string) => appendApiPrefix(`/tasks/${id}/order`),
        updateTaskColumn: (id: string) =>
            appendApiPrefix(`/tasks/${id}/column`),
    },
    POST: {
        addTask: appendApiPrefix('/tasks'),
        addPerson: appendApiPrefix('/resources/people'),
        addPersonTask: appendApiPrefix('/resources/people-tasks'),
        addDog: appendApiPrefix('/resources/dogs'),
        addDogTask: appendApiPrefix('/resources/dog-tasks'),
    },
    DELETE: {
        deleteTask: (id: string) => appendApiPrefix(`/tasks/${id}`),
        deletePerson: (id: string) =>
            appendApiPrefix(`/resources/people/${id}`),
        deletePersonTask: (id: string) =>
            appendApiPrefix(`/resources/people-tasks/${id}`),
        deleteDog: (id: string) => appendApiPrefix(`/resources/dogs/${id}`),
        deleteDogTask: (id: string) =>
            appendApiPrefix(`/resources/dog-tasks/${id}`),
    },
};
