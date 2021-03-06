import React, { useState } from 'react'
import styles from './Dogs.module.scss'
import CustomMultiselect from './CustomMultiselect/CustomMultiselect'
import { Dog } from '../../types'
import useSelector from '../../hooks/useSelector'
import { mapDogsToSelectShape } from '../helpers'

interface Props {
  saveDogs: (dogs: Dog[]) => void
  selectedDogs: Dog[]
}

const Dogs = ({ saveDogs, selectedDogs }: Props) => {
  const { dogs } = useSelector((s) => s.tasksStore)

  const [innerSelectedDogs, setInnerSelectedDogs] = useState(selectedDogs.map((dog) => dog.id))

  return (
    <section className={styles.wrapper}>
      <CustomMultiselect
        onChange={(newSelectedDogs: string[]) => {
          setInnerSelectedDogs(newSelectedDogs)

          const newDogs: Dog[] = dogs.filter((dog) => newSelectedDogs.includes(dog.id))

          saveDogs(newDogs)
        }}
        options={mapDogsToSelectShape(dogs)}
        selectLabel='Psy'
        selectedValues={innerSelectedDogs}
      />
    </section>
  )
}

export default Dogs
