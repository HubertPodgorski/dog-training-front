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
import { Dog } from '../../types'

const Dogs = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [dogName, setDogName] = useState('')
  const [editingId, setEditingId] = useState<string | undefined>()

  const [loading, setLoading] = useState(false)
  const [dogsData, setDogsData] = useState<{ data: Dog[] }>({ data: [] })

  const fetchDogs = async () => {
    setLoading(true)
    const { data } = await axios.get(apiRoutes.GET.dogs)
    setDogsData({ data })
    setLoading(false)
  }

  useAsyncEffect(fetchDogs, [])

  const saveDog = async () => {
    if (editingId) {
      await axios.put(apiRoutes.PUT.updateDog(editingId), {
        name: dogName,
      })
    } else {
      await axios.post(apiRoutes.POST.addDog, {
        name: dogName,
      })
    }

    await fetchDogs()
    setDogName('')
    setModalOpen(false)
    setEditingId(undefined)
  }

  const deleteDog = async (id: string) => {
    await axios.delete(apiRoutes.DELETE.deleteDog(id))

    await fetchDogs()
  }

  return (
    <div className={styles.resourceWrapper}>
      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false)
          setEditingId(undefined)
        }}
        aria-labelledby='Dodaj psa'
      >
        <Card className={classNames(styles.wrapper, styles.form)}>
          <TextField
            variant='outlined'
            label='Nazwa'
            onChange={(e) => setDogName(e.target.value)}
            value={dogName}
          />

          <Button onClick={async () => saveDog()}>{editingId ? 'Edytuj' : 'Dodaj'}</Button>
        </Card>
      </Modal>

      {loading && <LinearProgress />}

      <h1>Zarządzanie psami</h1>

      <Button variant='outlined' color='primary' onClick={() => setModalOpen(true)}>
        Dodaj psa
      </Button>

      <List>
        {dogsData.data.map(({ name, id }) => (
          <ListItem
            component='li'
            key={id}
            onClick={() => {
              setEditingId(id)
              setDogName(name)
              setModalOpen(true)
            }}
          >
            <ListItemText primary={name} />{' '}
            <IconButton onClick={async () => deleteDog(id)}>
              <Delete />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default Dogs
