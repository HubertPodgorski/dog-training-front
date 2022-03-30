import { useDispatch } from 'react-redux'
import { setIsDataFetching } from '../tasksStore'
import axios from 'axios'
import { apiRoutes } from '../helpers/apiRoutes'
import useFetchTaskList from './useFetchTaskList'
import useSelector from './useSelector'

const useAddTask = () => {
  const dispatch = useDispatch()

  const fetchTaskList = useFetchTaskList()

  const taskList = useSelector((s) => s.tasksStore.taskList)

  return async () => {
    dispatch(setIsDataFetching(true))

    await axios.post(apiRoutes.POST.addTask, {
      dogs: [],
      description: '',
      order: taskList.length + 1,
      tasks: [],
      peopleTasks: [],
      index: 0,
    })

    await fetchTaskList()
  }
}

export default useAddTask
