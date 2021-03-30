import React, { useState } from 'react'
import { Button, Card, IconButton, LinearProgress, Modal } from '@material-ui/core'
import classNames from 'classnames'
import styles from '../ResourcePanel.module.scss'
import TextField from '@material-ui/core/TextField'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import { Delete } from '@material-ui/icons'
import ListItemText from '@material-ui/core/ListItemText'
import { apiRoutes } from '../../helpers/apiRoutes'
import axios from 'axios'
import useAsyncEffect from '../../hooks/useAsyncEffect'
import { useQuery } from '@apollo/react-hooks'
import { PEOPLE_TASKS_RESOURCE_QUERY } from '../../queries/resourceQueries'

const PeopleTasks = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [personTaskName, setPersonTaskName] = useState('')
  const [editingId, setEditingId] = useState<undefined | string>()

  const { loading, data, refetch } = useQuery<{ personTasks: { name: string; id: string }[] }>(
    PEOPLE_TASKS_RESOURCE_QUERY,
  )

  const savePersonTask = async () => {
    if (editingId) {
      await axios.put(apiRoutes.PUT.updatePersonTask(editingId), {
        name: personTaskName,
      })
    } else {
      await axios.post(apiRoutes.POST.addPersonTask, {
        name: personTaskName,
      })
    }

    await refetch()
    setEditingId(undefined)
    setPersonTaskName('')
    setModalOpen(false)
  }

  const deletePersonTask = async (id: string) => {
    await axios.delete(apiRoutes.DELETE.deletePersonTask(id))

    // FIXME: fetch people tasks
    await refetch()
  }

  useAsyncEffect(async () => {
    // FIXME: fetch people tasks
    await refetch()
  }, [])

  return (
    <div className={styles.resourceWrapper}>
      <Modal
        open={modalOpen}
        onClose={() => {
          setEditingId(undefined)
          setPersonTaskName('')
          setModalOpen(false)
        }}
        aria-labelledby={`Dodaj zadanie osoby`}
      >
        <Card className={classNames(styles.wrapper, styles.form)}>
          <TextField
            variant='outlined'
            label='Nazwa'
            onChange={(e) => setPersonTaskName(e.target.value)}
            value={personTaskName}
          />

          <Button onClick={async () => savePersonTask()}>{editingId ? 'Edytuj' : 'Dodaj'}</Button>
        </Card>
      </Modal>

      {loading && <LinearProgress />}

      <h1>Zarządzanie zadaniami osób</h1>

      <Button variant='outlined' color='primary' onClick={() => setModalOpen(true)}>
        Dodaj zadanie osoby
      </Button>

      {data && (
        <List>
          {data.personTasks.map(({ name, id }) => (
            <ListItem component='li' key={id}>
              <ListItemText
                primary={name}
                onClick={() => {
                  setEditingId(id)
                  setPersonTaskName(name)
                  setModalOpen(true)
                }}
              />{' '}
              <IconButton onClick={async () => deletePersonTask(id)}>
                <Delete />
              </IconButton>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  )
}

export default PeopleTasks
