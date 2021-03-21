import React, { useState, Fragment } from 'react';
import { Card, MenuItem, Select } from '@material-ui/core';
import useSelector from '../hooks/useSelector';
import styles from './Calendar.module.scss'
import { Person } from '../types';
import classNames from 'classnames';

const Calendar = () => {
    const {people, events} = useSelector(s => s.tasksStore)
    const [person, setPerson] = useState<Person | ''>('')

    console.log('events => ', events);
    console.log('people => ', people);
    console.log('person => ', person);

    const showAllPeople = person === ''

    const columnCount = (showAllPeople ? people.reduce((peopleDogsCount, mappingPerson) => {
        return peopleDogsCount + mappingPerson.dogs.length
    }, 0) : (person as Person).dogs.length) + 1

    console.log('columnCount => ', columnCount);
    return  <Card className={styles.wrapper}>
        <Select className={styles.select} value={showAllPeople ? '' : (person as Person).id} onChange={e => {
            const personFound = people.find(({id}) => (e.target.value || '') === id)
            setPerson(personFound || '');
        }}>
            {people.map(({id, name}) =>
                <MenuItem value={id} key={id}>{name}</MenuItem>)}
        </Select>

        <div className={classNames(styles.calendarGrid)} style={{gridTemplateColumns: `repeat(${columnCount}, 1fr)`}}>
            {events.map(({name, id}) => <Fragment key={id}>
                <div className={styles.gridCell}>{name}</div>
                {showAllPeople && people.map(({dogs}) => dogs.map(({id, name}) => <div className={classNames(styles.gridCell, styles.cellPresent)} key={id}>{name}</div>))}
                {!showAllPeople && (person as Person).dogs.map(({id, name}) => <div className={classNames(styles.gridCell, styles.cellPresent)} key={id}>{name}</div>)}
            </Fragment>)}
        </div>
    </Card>
}

export default Calendar