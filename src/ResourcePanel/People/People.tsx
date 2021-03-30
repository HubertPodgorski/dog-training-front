import React, { useState } from 'react'
import { Button, Card, IconButton, LinearProgress, Modal } from '@material-ui/core'
import classNames from 'classnames'
import styles from '../ResourcePanel.module.scss'
import TextField from '@material-ui/core/TextField'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import { Delete } from '@material-ui/icons'
import ListItemText from '@material-ui/core/ListItemText'
import CustomMultiselect from '../../Configurator/Dogs/CustomMultiselect/CustomMultiselect'
import { apiRoutes } from '../../helpers/apiRoutes'
import axios from 'axios'
import useAsyncEffect from '../../hooks/useAsyncEffect'
import { useQuery } from '@apollo/react-hooks'
import { PEOPLE_RESOURCE_QUERY } from '../../queries/resourceQueries'

const People = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [personName, setPersonName] = useState('')
  const [editingId, setEditingId] = useState<undefined | string>()

  const { loading, data, refetch } = useQuery<{
    people: { name: string; id: string; dogs: { name: string; id: string }[] }[]
    dogs: { name: string; id: string }[]
  }>(PEOPLE_RESOURCE_QUERY)

  const savePerson = async () => {
    if (editingId) {
      await axios.put(apiRoutes.PUT.updatePerson(editingId), {
        name: personName,
      })
    } else {
      await axios.post(apiRoutes.POST.addPerson, {
        name: personName,
      })
    }

    //FIXME:  fetch resource type only changed

    await refetch()
    setEditingId(undefined)
    setPersonName('')
    setModalOpen(false)
  }

  const deletePerson = async (id: string) => {
    await axios.delete(apiRoutes.DELETE.deletePerson(id))

    await refetch()
  }

  useAsyncEffect(async () => {
    await refetch()
  }, [])

  const updateDogList = async (dogs: string[], personId: string) => {
    await axios.put(apiRoutes.PUT.updatePerson(personId), { dogs })

    await refetch()
  }

  return (
    <div className={styles.resourceWrapper}>
      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false)
          setEditingId(undefined)
          setPersonName('')
        }}
        aria-labelledby={`Dodaj osobę`}
      >
        <Card className={classNames(styles.wrapper, styles.form)}>
          <TextField
            variant='outlined'
            label='Nazwa'
            onChange={(e) => setPersonName(e.target.value)}
            value={personName}
          />

          <Button onClick={async () => savePerson()}>{editingId ? 'Edytuj' : 'Dodaj'}</Button>
        </Card>
      </Modal>

      {loading && <LinearProgress />}

      <h1>Zarządzanie ludźmi</h1>

      <Button variant='outlined' color='primary' onClick={() => setModalOpen(true)}>
        Dodaj osobę
      </Button>

      {data && (
        <List>
          {data.people.map(({ name, id, dogs }) => (
            <ListItem component='li' key={id}>
              <div>
                <ListItemText
                  primary={name}
                  onClick={() => {
                    setEditingId(id)
                    setPersonName(name)
                    setModalOpen(true)
                  }}
                />{' '}
                <IconButton onClick={async () => deletePerson(id)}>
                  <Delete />
                </IconButton>
              </div>

              <div>
                <CustomMultiselect
                  onChange={async (dogIds: string[]) => {
                    await updateDogList(dogIds, id)
                  }}
                  options={data.dogs}
                  selectLabel='Psy'
                  selectedValues={dogs.map(({ id }) => id)}
                />
              </div>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  )
}

export default People
