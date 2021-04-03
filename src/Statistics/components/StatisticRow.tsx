import React from 'react'
import styles from './StatisticRow.module.scss'
import { Dog, Statistic } from '../../types'
import { List, ListItem, ListItemIcon } from '@material-ui/core'
import { DeleteOutline } from '@material-ui/icons'
import { apiRoutes } from '../../helpers/apiRoutes'
import axios from 'axios'

interface Props {
  statistic: Statistic
  onClick: () => void
  dogs: Dog[]
  onDelete: () => void
}

const StatisticRow = ({ statistic, onClick, dogs, onDelete }: Props) => {
  const getRunAt = () => {
    if (statistic.runAt === 'asFirst') {
      return 'Jako pierwszy'
    }

    const dogFound = dogs.find(({ id }) => id === statistic.runAt)

    if (!dogFound) {
      return ''
    }

    return `Na: ${dogFound.name}`
  }

  const removeStatistic = async () => {
    await axios.delete(apiRoutes.DELETE.deleteDogStatistics(statistic.id))

    onDelete()
  }

  return (
    <List title='Statystyki psa' className={styles.wrapper}>
      <ListItemIcon onClick={removeStatistic}>
        <DeleteOutline />
      </ListItemIcon>

      <div onClick={onClick}>
        {!!statistic.runAt && <ListItem>{getRunAt()}</ListItem>}

        {!!statistic.startMeter && <ListItem>Metr startowy: {statistic.startMeter}</ListItem>}

        {!!statistic.fullRunTime && (
          <ListItem>Czas pełnego przebiegu: {statistic.fullRunTime}</ListItem>
        )}

        {!!statistic.recallTime && <ListItem>Czas recalla: {statistic.recallTime}</ListItem>}

        {!!statistic.tapTime && <ListItem>Czas tapa: {statistic.tapTime}</ListItem>}
      </div>
    </List>
  )
}

export default StatisticRow
