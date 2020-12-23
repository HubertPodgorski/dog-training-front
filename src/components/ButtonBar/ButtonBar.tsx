import React from 'react';
import RefreshButton from '../buttons/RefreshButton/RefreshButton';
import ResourcePanelButton from '../buttons/ResourcePanelButton/ResourcePanelButton';
import LockButton from '../buttons/LockButton/LockButton';
import styles from './ButtonBar.module.scss';
import AddNewTaskButton from '../buttons/AddNewTaskButton/AddNewTaskButton';

interface Props {
    variant?: 'listing' | 'configurator';
}

const ButtonBar = ({ variant = 'configurator' }: Props) => {
    return (
        <div className={styles.wrapper}>
            <RefreshButton />

            {variant === 'listing' && <LockButton variant="listing" />}

            {variant === 'configurator' && (
                <>
                    {/*<CalendarButton />*/}
                    <ResourcePanelButton />
                    <AddNewTaskButton />
                    <LockButton variant="configurator" />
                </>
            )}
        </div>
    );
};

export default ButtonBar;
