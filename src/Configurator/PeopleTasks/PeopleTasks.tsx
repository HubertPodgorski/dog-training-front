import React, { useState } from 'react'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import styles from './PeopleTasks.module.scss'
import CustomSelect from './CustomSelect/CustomSelect'
import getUuid from 'uuid/v4'
import { Person, PersonAndPersonTaskPair } from '../../types'
import { canAddNewTaskPair, isPersonAlreadyInTheList } from '../helpers'
import useSelector from '../../hooks/useSelector'

interface Props {
  savePeopleTasks: (peopleTasks: PersonAndPersonTaskPair[]) => void
  peopleTasks: PersonAndPersonTaskPair[]
}

const PeopleTasks = ({ savePeopleTasks, peopleTasks }: Props) => {
  const { people: peopleList, peopleTasks: peopleTaskList } = useSelector((s) => s.tasksStore)

  const [peopleTaskPairs, setPeopleTaskPairs] = useState<PersonAndPersonTaskPair[]>(peopleTasks)

  const getPeopleListWithoutAlreadyChosenExceptCurrent = (personTask: PersonAndPersonTaskPair) =>
    peopleList.filter(
      (person: Person): boolean =>
        !isPersonAlreadyInTheList(person.id, peopleTaskPairs) || person.id === personTask.personId,
    )

  const addNewTaskPair = (): void => {
    setPeopleTaskPairs([
      ...peopleTaskPairs,
      {
        uuid: getUuid(),
        personId: '',
        taskId: '',
        taskName: '',
        personName: '',
      },
    ])
  }

  const deletePersonTaskRow = (uuid: string): void => {
    const newPeopleTasks = peopleTaskPairs.filter(
      (personTask: PersonAndPersonTaskPair): boolean => personTask.uuid !== uuid,
    )

    setPeopleTaskPairs(newPeopleTasks)
    savePeopleTasks(newPeopleTasks)
  }

  const getNameById = (id: string, target: 'person' | 'task') => {
    if (target === 'person') {
      const person = peopleList.find((person) => person.id === id)
      return person ? person.name : ''
    } else if (target === 'task') {
      const personTask = peopleTaskList.find((personTask) => personTask.id === id)
      return personTask ? personTask.name : ''
    }

    return ''
  }

  const setByUuid = (uuid: string, id: string, target: 'person' | 'task') => {
    const newPeopleTasks = peopleTaskPairs.map(
      (personTask: PersonAndPersonTaskPair): PersonAndPersonTaskPair => {
        if (personTask.uuid === uuid) {
          let dataToReturn = { ...personTask }

          if (target === 'task') {
            dataToReturn = {
              ...dataToReturn,
              taskId: id,
              taskName: getNameById(id, 'task'),
            }
          } else if (target === 'person') {
            dataToReturn = {
              ...dataToReturn,
              personId: id,
              personName: getNameById(id, 'person'),
            }
          }

          return dataToReturn
        }

        return personTask
      },
    )

    setPeopleTaskPairs(newPeopleTasks)

    if (canAddNewTaskPair(newPeopleTasks)) {
      savePeopleTasks(newPeopleTasks)
    }
  }

  return (
    <section className={styles.wrapper}>
      {peopleTaskPairs.map((personTask: PersonAndPersonTaskPair) => (
        <div key={personTask.uuid} className={styles.rowWrapper}>
          <CustomSelect
            selectedValue={personTask.personId}
            options={getPeopleListWithoutAlreadyChosenExceptCurrent(personTask)}
            selectLabel='Osoba'
            onChange={(newPersonId: string) => setByUuid(personTask.uuid, newPersonId, 'person')}
          />

          <CustomSelect
            selectedValue={personTask.taskId}
            options={peopleTaskList}
            selectLabel='Zadanie'
            onChange={(newTaskId: string) => setByUuid(personTask.uuid, newTaskId, 'task')}
          />

          <IconButton onClick={() => deletePersonTaskRow(personTask.uuid)}>
            <DeleteIcon />
          </IconButton>
        </div>
      ))}

      <IconButton onClick={addNewTaskPair} disabled={!canAddNewTaskPair(peopleTaskPairs)}>
        <AddIcon />
      </IconButton>
    </section>
  )
}

export default PeopleTasks
