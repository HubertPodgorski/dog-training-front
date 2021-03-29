import React from 'react'
import styles from './MainList.module.scss'
import TasksGrid from '../components/TwoColumnsGrid/TasksGrid'
import ButtonBar from '../components/ButtonBar/ButtonBar'

const MainList = () => {
  return (
    <>
      <ButtonBar />

      <div className={styles.wrapper}>
        <TasksGrid />
      </div>
    </>
  )
}

export default MainList
