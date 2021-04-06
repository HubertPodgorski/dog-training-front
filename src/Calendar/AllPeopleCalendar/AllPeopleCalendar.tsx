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

  const columnCount = allEventsData
    ? allEventsData.people.reduce((count, { dogs }) => count + dogs.length, 0)
    : 0

  useAsyncEffect(async () => {
    await refetch()
  }, [])

  return (
    <div>
      {loading && <LinearProgress />}
      {allEventsData &&
        allEventsData.events.map(({ dogs: eventDogs, name, id: eventId }) => (
          <div key={eventId} className={styles.eventWrapper}>
            <div className={styles.eventLabel}>
              <div>
                {name} <br />
                Frekwencja:{' '}
                {eventDogs.reduce((count, dogWithStatus) => {
                  if (dogWithStatus && dogWithStatus.status === 'present') {
                    return count + 1
                  }
                  return count
                }, 0)}
              </div>
            </div>

            <div
              className={styles.grid}
              style={{
                gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
              }}
            >
              {allEventsData.people.map(({ dogs }) =>
                dogs.map(({ id, name }) => {
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
            </div>
          </div>
        ))}
    </div>
  )
}

export default AllPeopleCalendar
