import React, { useState } from 'react'
import styles from './Select.module.scss'
import { InputLabel, LinearProgress, MenuItem, Select } from '@material-ui/core'
import { Dog } from '../../types'
import useAsyncEffect from '../../hooks/useAsyncEffect'
import axios from 'axios'
import { apiRoutes } from '../../helpers/apiRoutes'

interface Props {
  runAt: string
  setRunAt: (runAt: string) => void
}

const RunAtSelect = ({ runAt, setRunAt }: Props) => {
  const [dogs, setDogs] = useState<Dog[]>([])
  const [dataLoading, setDataLoading] = useState(false)

  useAsyncEffect(async () => {
    setDataLoading(true)
    const eventsResponse = await axios.get(apiRoutes.GET.dogs)
    setDogs(eventsResponse.data)
    setDataLoading(false)
  }, [])

  return (
    <>
      {dataLoading && <LinearProgress />}

      <InputLabel id='dogSelect'>Pozycja startowa</InputLabel>
      <Select
        labelId='dogSelect'
        value={runAt}
        label='Pozycja startowa'
        className={styles.select}
        onChange={(e) => {
          if (e.target.value === '' || e.target.value === 'asFirst') {
            setRunAt(e.target.value)
            return
          }

          const dogFound = dogs.find(({ id }) => id === e.target.value)

          if (dogFound) {
            setRunAt(dogFound.id)
          }
        }}
      >
        <MenuItem value=''>Nie dotyczy</MenuItem>
        <MenuItem value='asFirst'>Pierwszy</MenuItem>
        {dogs.map((dog) => (
          <MenuItem key={dog.id} value={dog.id}>
            Na: {dog.name}
          </MenuItem>
        ))}
      </Select>
    </>
  )
}

export default RunAtSelect
