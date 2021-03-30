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
import { DOG_TASKS_RESOURCE_QUERY } from '../../queries/resourceQueries'
import { DogTask } from '../../types'

const DogTasks = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [dogTaskName, setDogTaskName] = useState('')
  const [editingId, setEditingId] = useState<string | undefined>()

  const { loading, data, refetch } = useQuery<{ dogTasks: DogTask[] }>(DOG_TASKS_RESOURCE_QUERY)

  const saveDogTask = async () => {
    if (editingId) {
      await axios.put(apiRoutes.PUT.editDogTask(editingId), {
        name: dogTaskName,
      })
    } else {
      await axios.post(apiRoutes.POST.addDogTask, {
        name: dogTaskName,
      })
    }

    //FIXME:  fetch resource type only changed

    // FIXME: fetch people tasks
    await refetch()
    setEditingId(undefined)
    setDogTaskName('')
    setModalOpen(false)
  }

  const deleteDogTask = async (id: string) => {
    await axios.delete(apiRoutes.DELETE.deleteDogTask(id))

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
          setModalOpen(false)
          setEditingId(undefined)
        }}
        aria-labelledby={`Dodaj zadanie psa`}
      >
        <Card className={classNames(styles.wrapper, styles.form)}>
          <TextField
            variant='outlined'
            label='Nazwa'
            onChange={(e) => setDogTaskName(e.target.value)}
            value={dogTaskName}
          />

          <Button onClick={async () => saveDogTask()}>{editingId ? 'Edytuj' : 'Dodaj'}</Button>
        </Card>
      </Modal>

      {loading && <LinearProgress />}
      <h1>Zarządzanie zadaniami psów</h1>

      <Button variant='outlined' color='primary' onClick={() => setModalOpen(true)}>
        Dodaj zadanie psa
      </Button>

      {data && (
        <List>
          {data.dogTasks.map(({ name, id }) => (
            <ListItem component='li' key={id}>
              <ListItemText
                primary={name}
                onClick={() => {
                  setEditingId(id)
                  setDogTaskName(name)
                  setModalOpen(true)
                }}
              />{' '}
              <IconButton onClick={async () => deleteDogTask(id)}>
                <Delete />
              </IconButton>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  )
}

export default DogTasks
