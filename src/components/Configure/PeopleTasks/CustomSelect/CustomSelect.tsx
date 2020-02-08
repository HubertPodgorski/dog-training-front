import React from 'react';
import styles from './CustomSelect.module.scss';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { SelectOption } from '../../../../types';

interface Props {
    options: SelectOption[];
    selectedValue: string;
    selectLabel: string;
    onChange: (id: string, name: string) => void;
}

const CustomSelect = ({
    options,
    selectedValue,
    selectLabel,
    onChange
}: Props) => (
    <FormControl className={styles['select']}>
        <InputLabel htmlFor="name-disabled">{selectLabel}</InputLabel>
        <Select
            value={selectedValue}
            onChange={e => onChange(e.target.value, e.target.name)}
            name={selectLabel}
        >
            {options.map((option: SelectOption) => (
                <MenuItem key={option.id} value={option.id}>
                    {option.label}
                </MenuItem>
            ))}
        </Select>
    </FormControl>
);

export default CustomSelect;
