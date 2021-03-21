import React, { useState, Fragment } from 'react';
import { Card, LinearProgress, MenuItem, Select } from '@material-ui/core';
import useSelector from '../hooks/useSelector';
import styles from './Calendar.module.scss'
import { Dog, Person } from '../types';
import classNames from 'classnames';
import { apiRoutes } from '../helpers/apiRoutes';
import axios from 'axios';
import useFetchEvents from '../hooks/useFetchEvents';
import ButtonBar from '../components/ButtonBar/ButtonBar';

const Calendar = () => {
    const {people, events} = useSelector(s => s.tasksStore)
    const [person, setPerson] = useState<Person | ''>('')
    const [savingData, setSavingData] = useState(false)

    const fetchEvents = useFetchEvents()

    console.log('events => ', events);
    console.log('people => ', people);
    console.log('person => ', person);

    const showAllPeople = person === ''

    const columnCount = (showAllPeople ? people.reduce((peopleDogsCount, mappingPerson) => {
        return peopleDogsCount + mappingPerson.dogs.length
    }, 0) : (person as Person).dogs.length) + 1

    console.log('columnCount => ', columnCount);

    const isDogPresent = (dogId: string, eventDogs: Dog[]) => eventDogs.some(({id}) => id === dogId)

    return <>
        <ButtonBar />

        <Card className={styles.wrapper}>
            {savingData && <LinearProgress />}
            <Select className={styles.select} value={showAllPeople ? '' : (person as Person).id} onChange={e => {
                const personFound = people.find(({id}) => (e.target.value || '') === id)
                setPerson(personFound || '');
            }}>
                <MenuItem value={''} >Wszyscy</MenuItem>

                {people.map(({id, name}) =>
                    <MenuItem value={id} key={id}>{name}</MenuItem>)}
            </Select>

            <div className={classNames(styles.calendarGrid)} style={{gridTemplateColumns: `repeat(${columnCount}, 1fr)`}}>
                {events.map(({name, id: eventId, dogs: eventDogs}) => <Fragment key={eventId}>
                    <div className={styles.gridCell}>{name}</div>
                    {showAllPeople && people.map(({dogs}) => dogs.map(({id, name}) => <div className={classNames(styles.gridCell, styles.presenceCell, {[styles.cellPresent]: isDogPresent(id, eventDogs)})} key={id}>{name}</div>))}

                    {!showAllPeople && (person as Person).dogs.map(({id, name}) => {
                        const dogPresent = isDogPresent(id, eventDogs)

                        return <div className={classNames(styles.gridCell, styles.presenceCell, {[styles.cellPresent]: dogPresent}, styles.pickPresenceCell)} key={id}>
                            {name}

                            <Select className={styles.select} value={dogPresent ? 'present' : 'notPresent'} onChange={async (e) => {
                                setSavingData(true)

                                let newDogsForEvent: string[] = eventDogs.filter(({id: eventDogId}) => eventDogId !== id).map(({id}) => id)

                                if (e.target.value === 'present') {
                                    newDogsForEvent = [...newDogsForEvent, id ]
                                }

                                await axios.put(apiRoutes.PUT.updateEvent(eventId), {dogs: newDogsForEvent})

                                await fetchEvents()

                                setSavingData(false)
                            }}>
                                <MenuItem value={'present'}>Tak</MenuItem>
                                <MenuItem value={'notPresent'}>Nie</MenuItem>
                            </Select>
                        </div>
                    })}
                </Fragment>)}
            </div>
        </Card>
    </>
}

export default Calendar