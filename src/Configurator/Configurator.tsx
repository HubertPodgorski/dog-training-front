import React from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { apiRoutes } from '../helpers/apiRoutes'
import ConfiguratorTaskList from './ConfiguratorTaskList/ConfiguratorTaskList'
import { Column, ExtendedTask } from '../types'
import styles from './Configurator.module.scss'
import { getOrderList } from './helpers'
import ButtonBar from '../components/ButtonBar/ButtonBar'
import useSelector from '../hooks/useSelector'
import { useDispatch } from 'react-redux'
import { setSelectedEvent, setTaskList } from '../tasksStore'
import axios from 'axios'
import { LinearProgress, MenuItem, Select } from '@material-ui/core'
import classNames from 'classnames'
import useAsyncEffect from '../hooks/useAsyncEffect'
import useFetchResourceData from '../hooks/useFetchResourceData'
import useFetchTaskList from '../hooks/useFetchTaskList'
import { formatDate, formatTime, getDayOfWeek } from '../helpers/date'

const dogNotUsed = (taskList: ExtendedTask[], dogId: string) =>
  !taskList.some(({ dogs }) => dogs.some(({ id }) => id === dogId))

const Configurator = () => {
  const fetchResourceData = useFetchResourceData()
  const fetchTaskList = useFetchTaskList()

  useAsyncEffect(async () => {
    await fetchResourceData()
    await fetchTaskList()
  }, [])

  const dispatch = useDispatch()
  const { taskList, events, selectedEvent, isDataFetching } = useSelector((s) => s.tasksStore)

  const onDragEnd = async (result: DropResult): Promise<void> => {
    const { source, destination, draggableId } = result

    if (!destination) {
      return
    }

    // FIXME: logix for same container reorder

    // Item on the same place
    if (source.droppableId === destination.droppableId && destination.index === source.index) {
      return
    }

    const [draggableIdentifier, extractedDraggableId] = draggableId.split('-')

    if (draggableIdentifier === 'task') {
      const taskToUpdate = taskList.find(({ id }) => id === extractedDraggableId)

      if (!taskToUpdate) {
        return
      }

      const [identifier, destinationOrder, destinationColumn] = destination.droppableId.split('-')

      if (identifier === 'order') {
        const newOrder = +destinationOrder

        const updatedTaskList: ExtendedTask[] = [
          ...taskList.filter(({ id }) => id !== taskToUpdate.id),
          {
            ...taskToUpdate,
            order: newOrder,
            column: destinationColumn as Column,
          },
        ]
        dispatch(setTaskList(updatedTaskList))

        await axios.put(apiRoutes.PUT.updateTask(taskToUpdate.id), {
          order: newOrder,
          column: destinationColumn as Column,
        })
      }
    }
  }

  return (
    <>
      <ButtonBar />

      {isDataFetching && <LinearProgress />}

      <div className={styles.wrapper}>
        <Select
          value={selectedEvent ? selectedEvent.id : ''}
          label='Wydarzenie'
          className={styles.select}
          onChange={(e) => {
            const eventFound = events.find(({ id }) => id === e.target.value)

            if (eventFound) {
              dispatch(setSelectedEvent(eventFound))
            }
          }}
        >
          {events.map((event) => (
            <MenuItem key={event.id} value={event.id}>
              {formatDate(event.date)} ({getDayOfWeek(event.date)}) {formatTime(event.time)}{' '}
              {event.name}
            </MenuItem>
          ))}
        </Select>

        {selectedEvent && (
          <div className={styles.eventDogs}>
            {!selectedEvent.dogs.length && 'Nie ma psów wybranych na to wydarzenie'}

            {selectedEvent.dogs
              .filter(({ status }) => status === 'present')
              .map(({ dog }) => (
                <div
                  className={classNames(styles.dog, {
                    [styles.dogNotUsed]: dogNotUsed(taskList, dog.id),
                  })}
                  key={dog.id}
                >
                  {dog.name}
                </div>
              ))}
          </div>
        )}

        <DragDropContext
          onDragEnd={async (values) => {
            await onDragEnd(values)
          }}
        >
          {getOrderList(taskList).map((order, index) => (
            <div key={order} className={styles.grid}>
              <ConfiguratorTaskList order={order} column='left' index={index} />

              <ConfiguratorTaskList order={order} column='right' index={index} />
            </div>
          ))}
        </DragDropContext>
      </div>
    </>
  )
}

export default Configurator
