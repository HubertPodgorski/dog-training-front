import React from 'react';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

interface Props {}

const Select: React.FC<Props> = () => (
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
);

export default Select;
