const appendApiPrefix = (suffix: string): string =>
    `${process.env.REACT_APP_API_PREFIX}${suffix}`;

export const apiRoutes = {
           GET: {
               tasks: appendApiPrefix('/tasks'),
               allResources: appendApiPrefix('/resources/all')
           },
           PUT: {
               changeOrder: appendApiPrefix('/tasks/order'),
               updateTaskDescription: (id: string) =>
                   appendApiPrefix(`/task/${id}/task`),
               updateTaskDogs: (id: string) =>
                   appendApiPrefix(`/task/${id}/dogs`),
               updateDogTasks: (id: string) =>
                   appendApiPrefix(`/tasks/${id}/dog-tasks`),
               updatePeopleTasks: (id: string) =>
                   appendApiPrefix(`/tasks/${id}/people-tasks`)
           }
       };
