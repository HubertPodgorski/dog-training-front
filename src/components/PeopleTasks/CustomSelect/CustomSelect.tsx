import React from 'react';
import styles from './CustomSelect.module.scss';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

interface Option {
    id: string;
    label: string;
}

interface Props {
    options: Option[];
    selectedValue: string;
    selectLabel: string;
    onChange: Function;
}

const renderOptions = (optionList: Option[]) =>
    optionList.map((option: Option) => (
        <MenuItem key={option.id} value={option.id}>
            {option.label}
        </MenuItem>
    ));

const CustomSelect: React.FC<Props> = ({
    options,
    selectedValue,
    selectLabel,
    onChange
}: {
    options: Option[];
    selectedValue: string;
    selectLabel: string;
    onChange: Function;
}) => (
    <FormControl className={styles['select']}>
        <InputLabel htmlFor="name-disabled">{selectLabel}</InputLabel>
        <Select
            value={selectedValue}
            onChange={e => onChange(e.target.value)}
            name={selectLabel}
        >
            {renderOptions(options)}
        </Select>
    </FormControl>
);

export default CustomSelect;
