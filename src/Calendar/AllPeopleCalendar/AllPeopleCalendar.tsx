import React, { Fragment } from 'react'
import styles from './AllPeopleCalendar.module.scss'
import { useQuery } from '@apollo/react-hooks'
import { CALENDAR_ALL_EVENTS_QUERY, CalendarAllEventsQuery } from '../../queries/calendarQueries'
import { LinearProgress } from '@material-ui/core'
import classNames from 'classnames'
import { getDogStatus } from '../helpers'
import useAsyncEffect from '../../hooks/useAsyncEffect'

const AllPeopleCalendar = () => {
  const { loading, data: allEventsData, refetch } = useQuery<CalendarAllEventsQuery>(
    CALENDAR_ALL_EVENTS_QUERY,
  )

  console.log('loading => ', loading)
  console.log('allEventsData => ', allEventsData)

  const columnCount = allEventsData
    ? allEventsData.people.reduce((count, { dogs }) => count + dogs.length, 0) + 2
    : 0

  useAsyncEffect(async () => {
    await refetch()
  }, [])

  return (
    <div>
      {loading && <LinearProgress />}
      {allEventsData && (
        <div
          className={styles.grid}
          style={{
            gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
          }}
        >
          {allEventsData.events.map(({ dogs: eventDogs, name }, index) => (
            <Fragment key={index}>
              <div className={styles.cell}>{name}</div>

              {allEventsData.people.map(({ dogs }) =>
                dogs.map(({ id, name }) => {
                  console.log('eventDogs => ', eventDogs)
                  const dogStatus = getDogStatus(id, eventDogs)

                  return (
                    <div
                      className={classNames(styles.cell, styles.presenceCell, {
                        [styles.cellPresent]: dogStatus === 'present',
                        [styles.cellNotPresent]: dogStatus === 'notPresent',
                      })}
                      key={id}
                    >
                      {name}
                    </div>
                  )
                }),
              )}

              <div className={styles.cell}>
                Frekwencja:{' '}
                {eventDogs.reduce((count, { status }) => {
                  if (status === 'present') {
                    return count + 1
                  }
                  return count
                }, 0)}
              </div>
            </Fragment>
          ))}
        </div>
      )}
    </div>
  )
}

export default AllPeopleCalendar
