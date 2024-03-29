import React, { useState } from 'react'
import classNames from 'classnames'
import styles from './PersonCalendar.module.scss'
import { getDogStatus } from '../helpers'
import { LinearProgress, MenuItem, Select } from '@material-ui/core'
import axios from 'axios'
import { apiRoutes } from '../../helpers/apiRoutes'
import { useQuery } from '@apollo/react-hooks'
import {
  CALENDAR_PERSON_EVENT_DOGS,
  CalendarPersonEventsQuery,
} from '../../queries/calendarQueries'
import useAsyncEffect from '../../hooks/useAsyncEffect'
import { formatDate, formatTime, getDayOfWeek, sortByDateDesc } from '../../helpers/date'

interface Props {
  personId: string
}

const PersonCalendar = ({ personId }: Props) => {
  const [saving, setSaving] = useState(false)

  const { loading, data, refetch } = useQuery<CalendarPersonEventsQuery>(
    CALENDAR_PERSON_EVENT_DOGS,
    {
      variables: { personId: personId },
    },
  )

  useAsyncEffect(async () => {
    await refetch()
  }, [])

  return (
    <div>
      {(loading || saving) && <LinearProgress />}

      {data &&
        data.events
          .sort(sortByDateDesc)
          .map(({ name: eventName, time, date, id: eventId, dogs: eventDogs }) => (
            <div key={eventId} className={styles.eventWrapper}>
              <div className={styles.eventLabel}>
                {eventName} <br />
                {formatDate(date)} ({getDayOfWeek(date)}) {formatTime(time)}
              </div>

              <div
                className={classNames(styles.grid)}
                style={{ gridTemplateColumns: `repeat(${data.person.dogs.length}, 1fr)` }}
              >
                {data.person.dogs.map((dog) => {
                  const dogStatus = getDogStatus(dog.id, eventDogs)

                  return (
                    <div
                      className={classNames(
                        styles.cell,
                        styles.presenceCell,
                        {
                          [styles.cellPresent]: dogStatus === 'present',
                          [styles.cellNotPresent]: dogStatus === 'notPresent',
                        },
                        styles.pickPresenceCell,
                      )}
                      key={dog.id}
                    >
                      {dog.name}

                      <Select
                        className={styles.select}
                        value={dogStatus}
                        onChange={async (e) => {
                          setSaving(true)

                          const newDog = {
                            status: e.target.value,
                            dog: { _id: dog.id, name: dog.name },
                          }

                          await axios.put(apiRoutes.PUT.updateEventDog(eventId), newDog)

                          await refetch()
                          setSaving(false)
                        }}
                      >
                        <MenuItem value={'untouched'}>Nie wybrano</MenuItem>
                        <MenuItem value={'present'}>Obecny</MenuItem>
                        <MenuItem value={'notPresent'}>Nie obecny</MenuItem>
                      </Select>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
    </div>
  )
}

export default PersonCalendar
