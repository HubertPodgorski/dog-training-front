import React from 'react';
import styles from './CustomMultiselect.module.scss';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { SelectOption } from '../../../../types';

interface Props {
    options: SelectOption[];
    selectedValue: string[];
    selectLabel: string;
    onChange: Function;
}

const CustomMultiselect = ({
    options,
    selectedValue,
    selectLabel,
    onChange
}: Props) => (
    <FormControl className={styles['multiselect']}>
        <InputLabel htmlFor="name-disabled">{selectLabel}</InputLabel>
        <Select
            value={selectedValue}
            onChange={e => onChange(e.target.value)}
            name={selectLabel}
            multiple
        >
            {options.map((option: SelectOption) => (
                <MenuItem key={option.id} value={option.id}>
                    {option.name}
                </MenuItem>
            ))}
        </Select>
    </FormControl>
);

export default CustomMultiselect;
