import React, { useEffect, useState } from 'react'
import styles from './TasksGrid.module.scss'
import Task from '../Display/Task/Task'
import { ExtendedTask } from '../../types'
import classNames from 'classnames'
import { useQuery } from '@apollo/react-hooks'
import { MAIN_LIST_TASKS_QUERY, MainListTasksQuery } from '../../queries/tasksQuery'
import useAsyncEffect from '../../hooks/useAsyncEffect'
import { LinearProgress } from '@material-ui/core'

const TasksGrid = () => {
  const { loading, data: taskListData, refetch } = useQuery<MainListTasksQuery>(
    MAIN_LIST_TASKS_QUERY,
  )

  useAsyncEffect(async () => {
    await refetch()
  }, [])

  const [groupedTaskList, setGroupedTaskList] = useState<{
    [order: number]: ExtendedTask[]
  }>({})

  useEffect(() => {
    if (loading || !taskListData) {
      return
    }

    setGroupedTaskList(
      taskListData.tasks.reduce((newGroupedTaskList: { [order: number]: ExtendedTask[] }, task): {
        [order: number]: ExtendedTask[]
      } => {
        if (newGroupedTaskList[task.order]) {
          return {
            ...newGroupedTaskList,
            [task.order]: [...newGroupedTaskList[task.order], task],
          }
        }

        return { ...newGroupedTaskList, [task.order]: [task] }
      }, {}),
    )
  }, [taskListData, loading])

  const hasTwoColumns = taskListData
    ? !!taskListData.tasks.find(({ column }) => column === 'right')
    : false

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
              <>
                <Task
                  key={task.id}
                  task={task}
                  hasTwoColumns={hasTwoColumns}
                  className={
                    task.column === 'left' ? styles.leftColumnTask : styles.rightColumnTask
                  }
                />
              </>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}

export default TasksGrid
