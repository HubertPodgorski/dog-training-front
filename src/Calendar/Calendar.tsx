import React, { useState } from 'react'
import { Card, LinearProgress, MenuItem, Select } from '@material-ui/core'
import styles from './Calendar.module.scss'
import { Person } from '../types'
import ButtonBar from '../components/ButtonBar/ButtonBar'
import AllPeopleCalendar from './AllPeopleCalendar/AllPeopleCalendar'
import PersonCalendar from './PersonCalendar/PersonCalendar'
import useAsyncEffect from '../hooks/useAsyncEffect'
import axios from 'axios'
import { apiRoutes } from '../helpers/apiRoutes'

const Calendar = () => {
  const [person, setPerson] = useState<Person | ''>('')
  const [loading, setLoading] = useState(false)
  const [peopleData, setPeopleData] = useState<{ data: Person[] }>({ data: [] })

  useAsyncEffect(async () => {
    setLoading(true)
    const { data } = await axios.get(apiRoutes.GET.people)
    setPeopleData({ data })
    setLoading(false)
  }, [])

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
            const personFound = peopleData.data.find(({ id }) => (e.target.value || '') === id)
            setPerson(personFound || '')
          }}
        >
          <MenuItem value={''}>Wszyscy</MenuItem>

          {peopleData.data.map(({ id, name }) => (
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
