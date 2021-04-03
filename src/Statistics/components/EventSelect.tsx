import React from 'react'
import styles from './Select.module.scss'
import { InputLabel, MenuItem, Select } from '@material-ui/core'
import { Event } from '../../types'

interface Props {
  selectedEvent: Event
  setSelectedEvent: (event: Event) => void
  events: Event[]
}

const EventSelect = ({ selectedEvent, setSelectedEvent, events }: Props) => {
  return (
    <>
      <InputLabel id='eventSelect'>Wydarzenie</InputLabel>
      <Select
        labelId='eventSelect'
        value={selectedEvent ? selectedEvent.id : ''}
        label='Wydarzenie'
        className={styles.select}
        onChange={(e) => {
          const eventFound = events.find(({ id }) => id === e.target.value)

          if (eventFound) {
            setSelectedEvent(eventFound)
          }
        }}
      >
        {events.map((event) => (
          <MenuItem key={event.id} value={event.id}>
            {event.name}
          </MenuItem>
        ))}
      </Select>
    </>
  )
}

export default EventSelect
