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
import { Event } from '../../types'
import { KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers'

const Events = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [eventName, setEventName] = useState('')
  const [eventDate, setEventDate] = useState(new Date())
  const [eventTime, setEventTime] = useState(new Date())

  const [editingId, setEditingId] = useState<string | undefined>()

  const [loading, setLoading] = useState(false)
  const [eventsData, setEventsData] = useState<{ data: Event[] }>({ data: [] })

  const fetchEvents = async () => {
    setLoading(true)
    const { data } = await axios.get(apiRoutes.GET.events)
    setEventsData({ data })
    setLoading(false)
  }

  useAsyncEffect(fetchEvents, [])

  const saveEvent = async () => {
    const data = {
      name: eventName,
      time: eventTime.toISOString(),
      date: eventDate.toISOString(),
    }

    if (editingId) {
      await axios.put(apiRoutes.PUT.updateEvent(editingId), data)
    } else {
      await axios.post(apiRoutes.POST.addEvent, data)
    }

    //FIXME:  fetch resource type only changed

    // FIXME: fetch people tasks
    await fetchEvents()
    setModalOpen(false)
    setEventName('')
    setEditingId(undefined)
  }

  const deleteEvent = async (id: string) => {
    await axios.delete(apiRoutes.DELETE.deleteEvent(id))

    // FIXME: fetch people tasks
    await fetchEvents()
  }

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

          <KeyboardDatePicker
            margin='normal'
            label='Data'
            format='MM/dd/yyyy'
            value={eventDate}
            onChange={(e) => setEventDate(e || new Date())}
            KeyboardButtonProps={{
              'aria-label': 'Zmień datę',
            }}
          />

          <KeyboardTimePicker
            margin='normal'
            label='Godzina'
            value={eventTime}
            onChange={(e) => setEventTime(e || new Date())}
            KeyboardButtonProps={{
              'aria-label': 'Zmień godzinę',
            }}
            ampm={false}
            autoOk
          />

          <Button onClick={async () => saveEvent()}>{editingId ? 'Edytuj' : 'Dodaj'}</Button>
        </Card>
      </Modal>

      {loading && <LinearProgress />}
      <h1>Zarządzanie wydarzeniami</h1>
      <Button variant='outlined' color='primary' onClick={() => setModalOpen(true)}>
        Dodaj wydarzenie
      </Button>

      <List>
        {eventsData.data.map(({ name, id, time, date }) => (
          <ListItem component='li' key={id}>
            <ListItemText
              primary={name}
              onClick={() => {
                setEventName(name)
                setEventTime(new Date(time))
                setEventDate(new Date(date))
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
    </div>
  )
}

export default Events
