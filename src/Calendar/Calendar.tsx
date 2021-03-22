import React, { useState, Fragment } from 'react';
import { Card, LinearProgress, MenuItem, Select } from '@material-ui/core';
import useSelector from '../hooks/useSelector';
import styles from './Calendar.module.scss'
import { Dog, DogEventStatus, Person } from '../types';
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

    const getDogStatus = (dogId: string, eventDogs: { dog: Dog, status: DogEventStatus }[]): DogEventStatus => {
        const dogFound = eventDogs.find(({dog}) => dog.id === dogId)

        return dogFound ? dogFound.status : 'untouched'
    }

    return <>
        <ButtonBar />

        <Card className={styles.wrapper}>
            {savingData && <LinearProgress />}
            <Select label='Osoba' className={styles.select} value={showAllPeople ? '' : (person as Person).id} onChange={e => {
                const personFound = people.find(({id}) => (e.target.value || '') === id)
                setPerson(personFound || '');
            }}>
                <MenuItem value={''} >Wszyscy</MenuItem>

                {people.map(({id, name}) =>
                    <MenuItem value={id} key={id}>{name}</MenuItem>)}
            </Select>

            <div className={classNames(styles.calendarGrid)} style={{gridTemplateColumns: `repeat(${columnCount + 1}, 1fr)`}}>
                {events.map(({name, id: eventId, dogs: eventDogs}) => <Fragment key={eventId}>
                    <div className={styles.gridCell}>{name}</div>
                    {showAllPeople && people.map(({dogs}) => dogs.map(({id, name}) => {
                        const dogStatus = getDogStatus(id, eventDogs)

                        console.log('dogStatus => ', dogStatus);

                        return <div className={classNames(styles.gridCell, styles.presenceCell, {[styles.cellPresent]: dogStatus === 'present', [styles.cellNotPresent]: dogStatus === 'notPresent'})} key={id}>{name}</div>
                    }))}
                    {showAllPeople && <div className={styles.gridCell}>
                        Psów na treningu: {eventDogs.reduce((count, {status}) => {if (status === 'present') {return count + 1} return  count}, 0)}
                    </div>}

                    {!showAllPeople && (person as Person).dogs.map((dog) => {
                        const dogStatus = getDogStatus(dog.id, eventDogs)

                        console.log('dogStatus => ', dogStatus);

                        return <div className={classNames(styles.gridCell, styles.presenceCell, {[styles.cellPresent]: dogStatus === 'present', [styles.cellNotPresent]: dogStatus === 'notPresent'}, styles.pickPresenceCell)} key={dog.id}>
                            {name}

                            <Select className={styles.select} value={dogStatus} onChange={async (e) => {
                                setSavingData(true)

                                const newDogsForEvent: { dog: Dog, status: DogEventStatus }[] = eventDogs.filter(({dog: eventDog}) => eventDog.id !== dog.id)

                                console.log('newDogsForEvent => ', newDogsForEvent);

                                await axios.put(apiRoutes.PUT.updateEvent(eventId), {dogs: [...newDogsForEvent, {status: e.target.value, dog}]})

                                await fetchEvents()

                                setSavingData(false)
                            }}>
                                <MenuItem value={'untouched'}>Nie wybrano</MenuItem>
                                <MenuItem value={'present'}>Obecny</MenuItem>
                                <MenuItem value={'notPresent'}>Nie obecny</MenuItem>
                            </Select>
                        </div>
                    })}
                </Fragment>)}
            </div>
        </Card>
    </>
}

export default Calendar