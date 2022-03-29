import React, { useEffect, useState } from 'react'
import styles from './TasksGrid.module.scss'
import Task from '../Display/Task/Task'
import { ExtendedTask } from '../../types'
import classNames from 'classnames'
import useAsyncEffect from '../../hooks/useAsyncEffect'
import { LinearProgress } from '@material-ui/core'
import { apiRoutes } from '../../helpers/apiRoutes'
import axios from 'axios'

const TasksGrid = () => {
  const [loading, setLoading] = useState(false)
  const [tasksData, setTasksData] = useState<{ data: ExtendedTask[] }>({ data: [] })
  const [groupedTaskList, setGroupedTaskList] = useState<{
    [order: number]: ExtendedTask[]
  }>({})

  useAsyncEffect(async () => {
    setLoading(true)
    const { data } = await axios.get(apiRoutes.GET.tasks)
    setTasksData({ data })

    setLoading(false)
  }, [])

  useEffect(() => {
    if (loading || !tasksData) {
      return
    }

    setGroupedTaskList(
      tasksData.data.reduce(
        (
          newGroupedTaskList: { [order: number]: ExtendedTask[] },
          task,
        ): {
          [order: number]: ExtendedTask[]
        } => {
          if (newGroupedTaskList[task.order]) {
            const newTasksForOrder = [...newGroupedTaskList[task.order], task]

            const newer = newTasksForOrder.sort((a, b) => {
              if (b.column === 'left') {
                return 1
              } else {
                return -1
              }
            })

            return {
              ...newGroupedTaskList,
              [task.order]: newTasksForOrder,
            }
          }

          return { ...newGroupedTaskList, [task.order]: [task] }
        },
        {},
      ),
    )
  }, [tasksData, loading])

  const hasTwoColumns = !!tasksData.data.find(({ column }) => column === 'right')

  return (
    <>
      {loading && <LinearProgress />}

      <div className={styles.mainGrid}>
        {Object.entries(groupedTaskList).map(([order, tasks]) => (
          <div
            key={order}
            className={classNames(styles.innerGrid, {
              [styles.singleColumn]: !hasTwoColumns,
            })}
            style={{
              gridRow: `${+order} / ${+order + 1}`,
            }}
          >
            {tasks.map((task) => (
              <Task
                key={task.id}
                task={task}
                hasTwoColumns={hasTwoColumns}
                className={task.column === 'left' ? styles.leftColumnTask : styles.rightColumnTask}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  )
}

export default TasksGrid
