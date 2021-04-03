import React from 'react'
import styles from './StatisticRow.module.scss'
import { Dog, Statistic } from '../../types'
import { List, ListItem } from '@material-ui/core'

interface Props {
  statistic: Statistic
  onClick: () => void
  dogs: Dog[]
}

const StatisticRow = ({ statistic, onClick, dogs }: Props) => {
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
  return (
    <List onClick={onClick} title='Statystyki psa' className={styles.wrapper}>
      {!!statistic.runAt && <ListItem>{getRunAt()}</ListItem>}

      {!!statistic.startMeter && <ListItem>Metr startowy: {statistic.startMeter}</ListItem>}

      {!!statistic.fullRunTime && (
        <ListItem>Czas pełnego przebiegu: {statistic.fullRunTime}</ListItem>
      )}

      {!!statistic.recallTime && <ListItem>Czas recalla: {statistic.recallTime}</ListItem>}

      {!!statistic.tapTime && <ListItem>Czas tapa: {statistic.tapTime}</ListItem>}
    </List>
  )
}

export default StatisticRow
