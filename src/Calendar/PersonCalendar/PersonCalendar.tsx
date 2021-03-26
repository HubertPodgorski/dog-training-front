import React, { Fragment, useState } from 'react'
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

      {data && (
        <div
          className={classNames(styles.grid)}
          style={{ gridTemplateColumns: `repeat(${data.person.dogs.length + 1}, 1fr)` }}
        >
          {data.events.map(({ name: eventName, id: eventId, dogs: eventDogs }) => (
            <Fragment key={eventId}>
              <div className={styles.cell}>{eventName}</div>

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
                        const newEventDogs = eventDogs.filter(
                          (dogWithStatus) => dogWithStatus && dogWithStatus.dog.id !== dog.id,
                        )

                        const dataToSet = {
                          dogs: [
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            ...newEventDogs.map(({ status, dog }) => ({
                              status,
                              dog: { name: dog.name, _id: dog.id },
                            })),
                            { status: e.target.value, dog: { _id: dog.id, name: dog.name } },
                          ],
                        }

                        await axios.put(apiRoutes.PUT.updateEvent(eventId), dataToSet)
                        setSaving(false)

                        await refetch()
                      }}
                    >
                      <MenuItem value={'untouched'}>Nie wybrano</MenuItem>
                      <MenuItem value={'present'}>Obecny</MenuItem>
                      <MenuItem value={'notPresent'}>Nie obecny</MenuItem>
                    </Select>
                  </div>
                )
              })}
            </Fragment>
          ))}
        </div>
      )}
    </div>
  )
}

export default PersonCalendar
