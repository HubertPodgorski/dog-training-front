import React from 'react'
import styles from './Select.module.scss'
import { InputLabel, MenuItem, Select } from '@material-ui/core'
import { Event } from '../../types'

interface Props {
  selectedEvent?: Event | 'basicData'
  setSelectedEvent: (event: Event | 'basicData') => void
  events: Event[]
}

const EventSelect = ({ selectedEvent, setSelectedEvent, events }: Props) => {
  return (
    <>
      <InputLabel id='eventSelect'>Wydarzenie</InputLabel>
      <Select
        labelId='eventSelect'
        value={!selectedEvent || selectedEvent === 'basicData' ? 'basicData' : selectedEvent.id}
        label='Wydarzenie'
        className={styles.select}
        onChange={(e) => {
          const eventFound = events.find(({ id }) => id === e.target.value)

          if (eventFound) {
            setSelectedEvent(eventFound)
          } else if (e.target.value == 'basicData') {
            setSelectedEvent('basicData')
          }
        }}
      >
        <MenuItem value={'basicData'}>Dane bazowe</MenuItem>

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
