// const apiPrefix = 'http://localhost:3001/api';
// const apiPrefix = 'https://dog-training-strapi.herokuapp.com'
// const apiPrefix = 'http://localhost:1337'
const apiPrefix = process.env.REACT_APP_API_PREFIX
const appendApiPrefix = (suffix: string): string => `${apiPrefix}${suffix}`

export const apiRoutes = {
  GET: {
    tasks: appendApiPrefix('/tasks'),
    dogs: appendApiPrefix('/dogs'),
    people: appendApiPrefix('/people'),
    personTasks: appendApiPrefix('/person-tasks'),
    dogTasks: appendApiPrefix('/dog-tasks'),
    events: appendApiPrefix('/events'),
    dogStatistics: appendApiPrefix('/dog-statistics'),
  },
  PUT: {
    updatePerson: (id: string) => appendApiPrefix(`/people/${id}`),
    updateDog: (id: string) => appendApiPrefix(`/dogs/${id}`),
    updateDogStatistics: (id: string) => appendApiPrefix(`/dog-statistics/${id}`),
    updateDogTask: (id: string) => appendApiPrefix(`/dog-tasks/${id}`),
    updatePersonTask: (id: string) => appendApiPrefix(`/person-tasks/${id}`),
    updateTask: (id: string) => appendApiPrefix(`/tasks/${id}`),
    updateEvent: (id: string) => appendApiPrefix(`/events/${id}`),
    updateEventDog: (id: string) => appendApiPrefix(`/events/${id}/dog`),
  },
  POST: {
    addTask: appendApiPrefix('/tasks'),
    addPerson: appendApiPrefix('/people'),
    addPersonTask: appendApiPrefix('/person-tasks'),
    addDog: appendApiPrefix('/dogs'),
    addDogTask: appendApiPrefix('/dog-tasks'),
    addEvent: appendApiPrefix('/events'),
    addDogStatistics: appendApiPrefix(`/dog-statistics`),
  },
  DELETE: {
    deleteTask: (id: string) => appendApiPrefix(`/tasks/${id}`),
    deletePerson: (id: string) => appendApiPrefix(`/people/${id}`),
    deletePersonTask: (id: string) => appendApiPrefix(`/person-tasks/${id}`),
    deleteDog: (id: string) => appendApiPrefix(`/dogs/${id}`),
    deleteDogTask: (id: string) => appendApiPrefix(`/dog-tasks/${id}`),
    deleteEvent: (id: string) => appendApiPrefix(`/events/${id}`),
    deleteDogStatistics: (id: string) => appendApiPrefix(`/dog-statistics/${id}`),
  },
}
