// const apiPrefix = 'http://localhost:3001/api';
// const apiPrefix = 'https://dog-training-strapi.herokuapp.com'
const apiPrefix = 'http://localhost:1337'
// const apiPrefix = process.env.REACT_APP_API_PREFIX;
const appendApiPrefix = (suffix: string): string => `${apiPrefix}${suffix}`;

export const apiRoutes = {
    GET: {
        tasks: appendApiPrefix('/tasks'),
        dogs: appendApiPrefix('/dogs'),
        people: appendApiPrefix('/people'),
        personTasks: appendApiPrefix('/person-tasks'),
        dogTasks: appendApiPrefix('/dog-tasks'),
    },
    PUT: {
        updatePerson: (id: string) => appendApiPrefix(`/people/${id}`),
        updateTask: (id: string) => appendApiPrefix(`/tasks/${id}`)
    },
    POST: {
        addTask: appendApiPrefix('/tasks'),
        addPerson: appendApiPrefix('/people'),
        addPersonTask: appendApiPrefix('/person-tasks'),
        addDog: appendApiPrefix('/dogs'),
        addDogTask: appendApiPrefix('/dog-tasks'),
    },
    DELETE: {
        deleteTask: (id: string) => appendApiPrefix(`/tasks/${id}`),
        deletePerson: (id: string) =>
            appendApiPrefix(`/people/${id}`),
        deletePersonTask: (id: string) =>
            appendApiPrefix(`/person-tasks/${id}`),
        deleteDog: (id: string) => appendApiPrefix(`/dogs/${id}`),
        deleteDogTask: (id: string) =>
            appendApiPrefix(`/dog-tasks/${id}`),
    },
};
