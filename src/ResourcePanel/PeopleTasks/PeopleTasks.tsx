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
import { PersonTask } from '../../types'

const PeopleTasks = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [personTaskName, setPersonTaskName] = useState('')
  const [editingId, setEditingId] = useState<undefined | string>()

  const [loading, setLoading] = useState(false)
  const [personTasksData, setPersonTasksData] = useState<{ data: PersonTask[] }>({
    data: [],
  })

  const fetchPersonTasks = async () => {
    setLoading(true)
    const { data } = await axios.get(apiRoutes.GET.personTasks)
    setPersonTasksData({ data })
    setLoading(false)
  }

  useAsyncEffect(fetchPersonTasks, [])

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

    await fetchPersonTasks()
    setEditingId(undefined)
    setPersonTaskName('')
    setModalOpen(false)
  }

  const deletePersonTask = async (id: string) => {
    await axios.delete(apiRoutes.DELETE.deletePersonTask(id))

    await fetchPersonTasks()
  }

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

      <List>
        {personTasksData.data.map(({ name, id }) => (
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
    </div>
  )
}

export default PeopleTasks
