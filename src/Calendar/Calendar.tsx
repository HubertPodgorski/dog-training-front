import React, { useState } from 'react'
import { Card, LinearProgress, MenuItem, Select } from '@material-ui/core'
import styles from './Calendar.module.scss'
import { Person } from '../types'
import ButtonBar from '../components/ButtonBar/ButtonBar'
import AllPeopleCalendar from './AllPeopleCalendar/AllPeopleCalendar'
import PersonCalendar from './PersonCalendar/PersonCalendar'
import { useQuery } from '@apollo/react-hooks'
import { PEOPLE_RESOURCE_QUERY } from '../queries/resourceQueries'

const Calendar = () => {
  const [person, setPerson] = useState<Person | ''>('')
  const { loading, data } = useQuery<{ people: Person[] }>(PEOPLE_RESOURCE_QUERY)

  const showAllPeople = person === ''

  return (
    <>
      <ButtonBar />

      <Card className={styles.wrapper}>
        {loading && <LinearProgress />}

        <Select
          label='Osoba'
          className={styles.select}
          value={showAllPeople ? '' : (person as Person).id}
          onChange={(e) => {
            if (!data) {
              setPerson('')
              return
            }

            const personFound = data.people.find(({ id }) => (e.target.value || '') === id)
            setPerson(personFound || '')
          }}
        >
          <MenuItem value={''}>Wszyscy</MenuItem>

          {data &&
            data.people.map(({ id, name }) => (
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
