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
import { EVENTS_RESOURCE_QUERY } from '../../queries/resourceQueries'

const Events = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [eventName, setEventName] = useState('')
  const [editingId, setEditingId] = useState<string | undefined>()

  const { loading, data, refetch } = useQuery<{ events: { name: string; id: string }[] }>(
    EVENTS_RESOURCE_QUERY,
  )

  const saveEvent = async () => {
    if (editingId) {
      await axios.put(apiRoutes.PUT.updateEvent(editingId), {
        name: eventName,
      })
    } else {
      await axios.post(apiRoutes.POST.addEvent, {
        name: eventName,
      })
    }

    //FIXME:  fetch resource type only changed

    // FIXME: fetch people tasks
    await refetch()
    setModalOpen(false)
    setEventName('')
    setEditingId(undefined)
  }

  const deleteEvent = async (id: string) => {
    await axios.delete(apiRoutes.DELETE.deleteEvent(id))

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
          setEventName('')
          setEditingId(undefined)
        }}
        aria-labelledby={`Dodaj wydarzenie`}
      >
        <Card className={classNames(styles.wrapper, styles.form)}>
          <TextField
            variant='outlined'
            label='Nazwa'
            onChange={(e) => setEventName(e.target.value)}
            value={eventName}
          />

          <Button onClick={async () => saveEvent()}>{editingId ? 'Edytuj' : 'Dodaj'}</Button>
        </Card>
      </Modal>

      {loading && <LinearProgress />}
      <h1>Zarządzanie wydarzeniami</h1>
      <Button variant='outlined' color='primary' onClick={() => setModalOpen(true)}>
        Dodaj wydarzenie
      </Button>

      {data && (
        <List>
          {data.events.map(({ name, id }) => (
            <ListItem component='li' key={id}>
              <ListItemText
                primary={name}
                onClick={() => {
                  setEventName(name)
                  setEditingId(id)
                  setModalOpen(true)
                }}
              />{' '}
              <IconButton onClick={async () => deleteEvent(id)}>
                <Delete />
              </IconButton>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  )
}

export default Events
