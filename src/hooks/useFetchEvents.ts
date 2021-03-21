import { useDispatch } from 'react-redux';
import { setIsDataFetching, setTaskList } from '../tasksStore';
import axios from 'axios';
import { apiRoutes } from '../helpers/apiRoutes';

const useFetchEvents = ()  => {
    const dispatch = useDispatch()

    return async () => {
        dispatch(setIsDataFetching(true))

        const { data } = await axios.get(apiRoutes.GET.events);

        dispatch(setEvents(data))
        dispatch(setIsDataFetching(false))
    }
};

export default useFetchEvents