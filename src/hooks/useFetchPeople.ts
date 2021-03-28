import { useDispatch } from 'react-redux'
import { setIsDataFetching, setPeople } from '../tasksStore'
import axios from 'axios'
import { apiRoutes } from '../helpers/apiRoutes'

const useFetchPeople = () => {
  const dispatch = useDispatch()

  return async () => {
    dispatch(setIsDataFetching(true))

    const { data } = await axios.get(apiRoutes.GET.people)

    dispatch(setPeople(data))
    dispatch(setIsDataFetching(false))
  }
}

export default useFetchPeople
