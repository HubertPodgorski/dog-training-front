// const apiPrefix = 'http://localhost:3001/api';
const apiPrefix = 'https://dog-training-back.herokuapp.com/api';

const apiRoutes = {
    GET: {
        trainingDogs: `${apiPrefix}/training-dogs`
    }
};

export default apiRoutes;
