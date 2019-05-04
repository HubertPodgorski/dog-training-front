// const apiPrefix = 'http://localhost:3001/api';
const apiPrefix = 'https://dog-training-back.herokuapp.com/api';
const appendApiPrefix = (suffix: string): string => `${apiPrefix}${suffix}`;

export const apiRoutes = {
    GET: {
        trainingDogs: appendApiPrefix('/training-dogs')
    },
    PUT: {
        changeOrder: appendApiPrefix('/training-dogs/order')
    }
};
