const appendApiPrefix = (suffix: string): string =>
    `${process.env.REACT_APP_API_PREFIX}${suffix}`;

export const apiRoutes = {
    GET: {
        trainingDogs: appendApiPrefix('/training-dogs')
    },
    PUT: {
        changeOrder: appendApiPrefix('/training-dogs/order'),
        updateTrainingDescription: (id: string) =>
            appendApiPrefix(`/training-dogs/${id}/people-data`)
    }
};
