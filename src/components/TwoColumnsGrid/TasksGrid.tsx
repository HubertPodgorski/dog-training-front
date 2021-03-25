import React, { useEffect, useState } from 'react'
import styles from './TasksGrid.module.scss'
import Task from '../Display/Task/Task'
import { ExtendedTask } from '../../types'
import classNames from 'classnames'
import useSelector from '../../hooks/useSelector'
import { useQuery } from '@apollo/react-hooks'
import TASKS_QUERY from '../../queries/tasksQuery'

const TasksGrid = () => {
  const taskList = useSelector((s) => s.tasksStore.taskList)
  const [groupedTaskList, setGroupedTaskList] = useState<{
    [order: number]: ExtendedTask[]
  }>({})

  // const { loading, error, data } = useQuery(TASKS_QUERY)
  // console.log('loading => ', loading)
  // console.log('error => ', error)
  // console.log('data => ', data)

  useEffect(() => {
    setGroupedTaskList(
      taskList.reduce((newGroupedTaskList: { [order: number]: ExtendedTask[] }, task): {
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
  }, [taskList])

  const hasTwoColumns = !!taskList.find(({ column }) => column === 'right')

  return (
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
                className={task.column === 'left' ? styles.leftColumnTask : styles.rightColumnTask}
              />
            </>
          ))}
        </div>
      ))}
    </div>
  )
}

export default TasksGrid
