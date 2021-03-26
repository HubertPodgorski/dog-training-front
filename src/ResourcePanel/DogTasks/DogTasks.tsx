import React, { useState } from 'react'
import { Button, Card, IconButton, LinearProgress, Modal } from '@material-ui/core'
import classNames from 'classnames'
import styles from '../ResourcePanel.module.scss'
import TextField from '@material-ui/core/TextField'
import ButtonBar from '../../components/ButtonBar/ButtonBar'
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
  const [addResourceModalOpem, setAddResourceModalOpem] = useState(false)
  const [newResourceValue, setNewResourceValue] = useState('')

  const { loading, data, refetch } = useQuery<{ dogTasks: DogTask[] }>(DOG_TASKS_RESOURCE_QUERY)

  const addDogTask = async () => {
    await axios.post(apiRoutes.POST.addDogTask, {
      name: newResourceValue,
    })

    //FIXME:  fetch resource type only changed

    // FIXME: fetch people tasks
    await refetch()
    setNewResourceValue('')
    setAddResourceModalOpem(false)
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
    <div>
      <Modal
        open={addResourceModalOpem}
        onClose={() => setAddResourceModalOpem(false)}
        aria-labelledby={`Dodaj zadanie psa`}
      >
        <Card className={classNames(styles.wrapper, styles.form)}>
          <TextField
            variant='outlined'
            label='Nazwa'
            onChange={(e) => setNewResourceValue(e.target.value)}
            value={newResourceValue}
          />

          <Button onClick={async () => addDogTask()}>Dodaj</Button>
        </Card>
      </Modal>

      {loading && <LinearProgress />}
      <h1>Zarządzanie zadaniami psów</h1>

      <Button variant='outlined' color='primary' onClick={() => setAddResourceModalOpem(true)}>
        Dodaj zadanie psa
      </Button>

      {data && (
        <List>
          {data.dogTasks.map(({ name, id }) => (
            <ListItem component='li' key={id}>
              <ListItemText primary={name} />{' '}
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
