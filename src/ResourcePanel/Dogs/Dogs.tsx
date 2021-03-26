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
import { DOGS_RESOURCE_QUERY } from '../../queries/resourceQueries'
import { Dog } from '../../types'

const Dogs = () => {
  const [addResourceModalOpem, setAddResourceModalOpem] = useState(false)
  const [newResourceValue, setNewResourceValue] = useState('')

  const { loading, data, refetch } = useQuery<{ dogs: Dog[] }>(DOGS_RESOURCE_QUERY)

  const addDog = async () => {
    await axios.post(apiRoutes.POST.addDog, {
      name: newResourceValue,
    })

    //FIXME:  fetch resource type only changed

    // FIXME: fetch people tasks
    await refetch()
    setNewResourceValue('')
    setAddResourceModalOpem(false)
  }

  const deleteDog = async (id: string) => {
    await axios.delete(apiRoutes.DELETE.deleteDog(id))

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
        aria-labelledby='Dodaj psa'
      >
        <Card className={classNames(styles.wrapper, styles.form)}>
          <TextField
            variant='outlined'
            label='Nazwa'
            onChange={(e) => setNewResourceValue(e.target.value)}
            value={newResourceValue}
          />

          <Button onClick={async () => addDog()}>Dodaj</Button>
        </Card>
      </Modal>

      {loading && <LinearProgress />}

      <h1>Zarządzanie psami</h1>

      <Button variant='outlined' color='primary' onClick={() => setAddResourceModalOpem(true)}>
        Dodaj psa
      </Button>

      {data && (
        <List>
          {data.dogs.map(({ name, id }) => (
            <ListItem component='li' key={id}>
              <ListItemText primary={name} />{' '}
              <IconButton onClick={async () => deleteDog(id)}>
                <Delete />
              </IconButton>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  )
}

export default Dogs
