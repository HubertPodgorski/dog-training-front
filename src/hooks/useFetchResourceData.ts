import { useDispatch } from 'react-redux';
import { setDogs, setDogTasks, setIsDataFetching, setPeople, setPeopleTasks } from '../tasksStore';
import axios from 'axios';
import { apiRoutes } from '../helpers/apiRoutes';

const useFetchResourceData = () => {
    const dispatch = useDispatch()

    return async () => {
        dispatch(setIsDataFetching(true))

        const dogsResponse = await axios.get(apiRoutes.GET.dogs);
        const peopleResponse = await axios.get(apiRoutes.GET.people);
        const personTasksResponse = await axios.get(apiRoutes.GET.personTasks);
        const dogTasksResponse = await axios.get(apiRoutes.GET.dogTasks);

        dispatch(setDogs(dogsResponse.data))
        dispatch(setPeople(peopleResponse.data))
        dispatch(setPeopleTasks(personTasksResponse.data))
        dispatch(setDogTasks(dogTasksResponse.data))
        dispatch(setIsDataFetching(false))
    }
};

export default useFetchResourceData