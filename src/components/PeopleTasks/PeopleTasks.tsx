import React, { useState } from 'react';
import styles from './PeopleTasks.module.scss';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

interface Props {}

const renderPersonTaskRows = (peopleTaskPairs: any) =>
    peopleTaskPairs.map((personTaskPair: any) => (
        <div>
            <FormControl>
                <InputLabel htmlFor="name-disabled">Osoba</InputLabel>
                <Select
                    value={personTaskPair.personId}
                    onChange={() => {}}
                    displayEmpty
                    name="age"
                >
                    <MenuItem value={'ed3bc88a-6f53-47bd-9f3e-b55c362c1242'}>
                        Ten
                    </MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="name-disabled">Zadanie</InputLabel>
                <Select
                    value={personTaskPair.taskId}
                    onChange={() => {}}
                    displayEmpty
                    name="age"
                >
                    <MenuItem value={'207764cc-8ced-4731-8f71-aecf28b25b63'}>
                        Ten
                    </MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
        </div>
    ));

const PeopleTasks: React.FC<Props> = () => {
    const [peopleTaskPairs, setPeopleTaskPair] = useState([
        {
            personId: 'ed3bc88a-6f53-47bd-9f3e-b55c362c1242',
            taskId: '207764cc-8ced-4731-8f71-aecf28b25b63'
        }
    ]);

    return <section>{renderPersonTaskRows(peopleTaskPairs)}</section>;
};

export default PeopleTasks;
