import React from 'react'
import styles from './Select.module.scss'
import { InputLabel, MenuItem, Select } from '@material-ui/core'
import { Dog } from '../../types'

interface Props {
  selectedDog: Dog
  setSelectedDog: (dog: Dog) => void
  dogs: Dog[]
}

const DogSelect = ({ selectedDog, setSelectedDog, dogs }: Props) => {
  return (
    <>
      <InputLabel id='dogSelect'>Pies</InputLabel>
      <Select
        labelId='dogSelect'
        value={selectedDog ? selectedDog.id : ''}
        label='Pies'
        className={styles.select}
        onChange={(e) => {
          const dogFound = dogs.find(({ id }) => id === e.target.value)

          if (dogFound) {
            setSelectedDog(dogFound)
          }
        }}
      >
        {dogs.map((dog) => (
          <MenuItem key={dog.id} value={dog.id}>
            {dog.name}
          </MenuItem>
        ))}
      </Select>
    </>
  )
}

export default DogSelect
