import React from 'react'
import PersonIcon from '@material-ui/icons/Person'
import styles from './PeopleTasks.module.scss'
import { PersonAndPersonTaskPair } from '../../../types'
import classNames from 'classnames'

interface Props {
  peopleTasks: PersonAndPersonTaskPair[]
  hasTwoColumns?: boolean
}

const PeopleTasks = ({ peopleTasks, hasTwoColumns }: Props) => (
  <section
    className={classNames(styles.wrapper, {
      [styles.twoColumnsWrapper]: hasTwoColumns,
    })}
  >
    {peopleTasks.map((personTask: PersonAndPersonTaskPair) => (
      <div
        key={personTask.uuid}
        className={classNames(styles.listRow, {
          [styles.twoColumnsListRow]: hasTwoColumns,
        })}
      >
        <PersonIcon fontSize={hasTwoColumns ? 'small' : 'default'} />
        <strong>{personTask.personName}</strong>: {personTask.taskName}
      </div>
    ))}
  </section>
)

export default PeopleTasks
