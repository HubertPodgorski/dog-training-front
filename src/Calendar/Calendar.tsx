import React, { useState } from 'react'
import { Card, MenuItem, Select } from '@material-ui/core'
import useSelector from '../hooks/useSelector'
import styles from './Calendar.module.scss'
import { Person } from '../types'
import ButtonBar from '../components/ButtonBar/ButtonBar'
import AllPeopleCalendar from './AllPeopleCalendar/AllPeopleCalendar'
import PersonCalendar from './PersonCalendar/PersonCalendar'

const Calendar = () => {
  const { people } = useSelector((s) => s.tasksStore)
  const [person, setPerson] = useState<Person | ''>('')

  const showAllPeople = person === ''

  return (
    <>
      <ButtonBar />

      <Card className={styles.wrapper}>
        <Select
          label='Osoba'
          className={styles.select}
          value={showAllPeople ? '' : (person as Person).id}
          onChange={(e) => {
            const personFound = people.find(({ id }) => (e.target.value || '') === id)
            setPerson(personFound || '')
          }}
        >
          <MenuItem value={''}>Wszyscy</MenuItem>

          {people.map(({ id, name }) => (
            <MenuItem value={id} key={id}>
              {name}
            </MenuItem>
          ))}
        </Select>

        {showAllPeople && <AllPeopleCalendar />}

        {!showAllPeople && <PersonCalendar personId={(person as Person).id} />}
      </Card>
    </>
  )
}

export default Calendar
