import React, { useEffect, useState } from 'react'
import { Button, Card, Modal } from '@material-ui/core'
import classNames from 'classnames'
import styles from './AddEditModal.module.scss'
import TextField from '@material-ui/core/TextField'
import { Dog, Event, Statistic } from '../../types'
import RunAtSelect from './RunAtSelect'
import axios from 'axios'
import { apiRoutes } from '../../helpers/apiRoutes'

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  setEditingStatistics: (statistic: Statistic | undefined) => void
  editingStatistics?: Statistic
  selectedDog: Dog
  selectedEvent: Event | 'basicData'
  onSaved: () => void
}

type FormStatistic = Omit<Statistic, 'id'> & { id?: string }

const AddEditModal = ({
  open,
  setOpen,
  setEditingStatistics,
  editingStatistics,
  selectedDog,
  selectedEvent,
  onSaved,
}: Props) => {
  const [formData, setFormData] = useState<FormStatistic>(
    editingStatistics
      ? editingStatistics
      : {
          dogId: selectedDog.id,
          eventId: selectedEvent === 'basicData' ? selectedEvent : selectedEvent.id,
        },
  )

  useEffect(() => {
    setFormData({
      ...formData,
      dogId: selectedDog.id,
      eventId: selectedEvent === 'basicData' ? selectedEvent : selectedEvent.id,
    })
  }, [selectedDog, selectedEvent])

  const saveData = async () => {
    if (editingStatistics) {
      await axios.put(apiRoutes.PUT.updateDogStatistics(editingStatistics.id), formData)
    } else {
      await axios.post(apiRoutes.POST.addDogStatistics, formData)
    }

    setEditingStatistics(undefined)
    setOpen(false)
    onSaved()
    setFormData({
      dogId: selectedDog.id,
      eventId: selectedEvent === 'basicData' ? selectedEvent : selectedEvent.id,
    })
  }

  useEffect(() => {
    if (editingStatistics) {
      setFormData(editingStatistics)
    }
  }, [editingStatistics])

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false)
        setEditingStatistics(undefined)
      }}
    >
      <Card className={classNames(styles.wrapper, styles.form)}>
        <RunAtSelect
          runAt={formData.runAt ? formData.runAt : ''}
          setRunAt={(newRunAt: string) => setFormData({ ...formData, runAt: newRunAt })}
        />

        <TextField
          variant='outlined'
          label='Metr startowy'
          onChange={(e) => setFormData({ ...formData, startMeter: e.target.value })}
          value={formData.startMeter ? formData.startMeter : ''}
        />

        <TextField
          variant='outlined'
          label='Czas przebiegu'
          onChange={(e) => setFormData({ ...formData, fullRunTime: e.target.value })}
          value={formData.fullRunTime ? formData.fullRunTime : ''}
        />

        <TextField
          variant='outlined'
          label='Czas recalla'
          onChange={(e) => setFormData({ ...formData, recallTime: e.target.value })}
          value={formData.recallTime ? formData.recallTime : ''}
        />

        <TextField
          variant='outlined'
          label='Czas tapa'
          onChange={(e) => setFormData({ ...formData, tapTime: e.target.value })}
          value={formData.tapTime ? formData.tapTime : ''}
        />

        <Button onClick={async () => await saveData()}>
          {editingStatistics ? 'Edytuj' : 'Dodaj'}
        </Button>
      </Card>
    </Modal>
  )
}

export default AddEditModal
