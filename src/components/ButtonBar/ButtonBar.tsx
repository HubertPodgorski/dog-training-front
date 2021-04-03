import React from 'react'
import ResourcePanelButton from '../buttons/ResourcePanelButton/ResourcePanelButton'
import LockButton from '../buttons/LockButton/LockButton'
import styles from './ButtonBar.module.scss'
import AddNewTaskButton from '../buttons/AddNewTaskButton/AddNewTaskButton'
import { useHistory } from 'react-router-dom'
import { routePaths } from '../../Router'
import CalendarButton from '../buttons/CalendarButton/CalendarButton'
import ListingButton from '../buttons/ListingButton/ListingButton'
import StatisticsButton from '../buttons/StatisticsButton/StatisticsButton'

const ButtonBar = () => {
  const history = useHistory()

  // const isInCalendar = history.location.pathname.includes(routePaths.calendar)
  const isInConfigurator = history.location.pathname.includes(routePaths.configurator)
  const isInListing =
    history.location.pathname.includes(routePaths.list) || history.location.pathname === '/'
  return (
    <div className={styles.wrapper}>
      <div className={styles.buttonsGrid}>
        <CalendarButton />
        <ListingButton />
        <StatisticsButton />
      </div>

      <div className={styles.buttonsGrid}>
        {isInConfigurator && <ResourcePanelButton />}
        {isInConfigurator && <AddNewTaskButton />}
        {isInConfigurator && <LockButton variant='configurator' />}
        {isInListing && <LockButton variant='listing' />}
      </div>
    </div>
  )
}

export default ButtonBar
