import React, { useState } from 'react'
import { Card, LinearProgress, List } from '@material-ui/core'
import ButtonBar from '../components/ButtonBar/ButtonBar'
import EventSelect from './components/EventSelect'
import DogSelect from './components/DogSelect'
import useAsyncEffect from '../hooks/useAsyncEffect'
import { apiRoutes } from '../helpers/apiRoutes'
import axios from 'axios'
import { AddCircleOutline } from '@material-ui/icons'
import AddEditModal from './components/AddEditModal'
import { Dog, Statistic, Event } from '../types'
import StatisticRow from './components/StatisticRow'
import styles from './Statistics.module.scss'

const Statistics = () => {
  const [dogs, setDogs] = useState<Dog[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [dataLoading, setDataLoading] = useState(false)
  const [selectedDog, setSelectedDog] = useState()
  const [selectedEvent, setSelectedEvent] = useState()
  const [dogStatistics, setDogStatistics] = useState<Statistic[]>([])
  const [open, setOpen] = useState(false)
  const [editingStatistics, setEditingStatistics] = useState<Statistic | undefined>()

  const fetchDogStatistics = async () => {
    // FIXME: fetch only relevant data
    setDataLoading(true)
    console.log('selectedDog.id => ', selectedDog.id)
    console.log('selectedEvent.id => ', selectedEvent.id)
    const dogStatisticsResponse = await axios.get(
      `${apiRoutes.GET.dogStatistics}?dogId_eq=${selectedDog.id}&eventId_eq=${selectedEvent.id}`,
    )
    setDogStatistics(dogStatisticsResponse.data)
    setDataLoading(false)
  }

  useAsyncEffect(async () => {
    if (!selectedEvent || !selectedDog) {
      return
    }

    await fetchDogStatistics()
  }, [selectedDog, selectedEvent])

  useAsyncEffect(async () => {
    setDataLoading(true)

    const dogResponse = await axios.get(apiRoutes.GET.dogs)
    setDogs(dogResponse.data)

    const eventsResponse = await axios.get(apiRoutes.GET.events)
    setEvents(eventsResponse.data)

    setDataLoading(false)
  }, [])

  console.log('selectedDog => ', selectedDog)
  console.log('selectedEvent => ', selectedEvent)
  console.log('dogStatistics => ', dogStatistics)
  return (
    <div>
      <ButtonBar />

      <Card className={styles.card}>
        <EventSelect
          events={events}
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
        />
        <DogSelect dogs={dogs} selectedDog={selectedDog} setSelectedDog={setSelectedDog} />

        {!!selectedEvent && !!selectedDog && (
          <>
            <AddEditModal
              selectedDog={selectedDog}
              selectedEvent={selectedEvent}
              open={open}
              setEditingStatistics={setEditingStatistics}
              editingStatistics={editingStatistics}
              setOpen={setOpen}
              onSaved={async () => await fetchDogStatistics()}
            />

            {dataLoading && <LinearProgress />}

            <List>
              {dogStatistics.map((statistic) => (
                <StatisticRow
                  dogs={dogs}
                  statistic={statistic}
                  key={statistic.id}
                  onClick={() => {
                    setEditingStatistics(statistic)
                    setOpen(true)
                  }}
                />
              ))}
            </List>

            <AddCircleOutline className={styles.button} onClick={() => setOpen(true)} />
          </>
        )}
      </Card>
    </div>
  )
}

export default Statistics
