import React from 'react';
import RefreshButton from '../buttons/RefreshButton/RefreshButton';
import ResourcePanelButton from '../buttons/ResourcePanelButton/ResourcePanelButton';
import LockButton from '../buttons/LockButton/LockButton';
import styles from './ButtonBar.module.scss';
import AddNewTaskButton from '../buttons/AddNewTaskButton/AddNewTaskButton';
import { useHistory } from 'react-router-dom';
import { routePaths } from '../../Router';
import CalendarButton from '../buttons/CalendarButton/CalendarButton';
import ListingButton from '../buttons/ListingButton/ListingButton';

const ButtonBar = () => {
    const history = useHistory()

    const isInCalendar = history.location.pathname.match(routePaths.calendar)
    const isInConfigurator = history.location.pathname.match(routePaths.configurator)
    const isInListing = history.location.pathname.match(routePaths.list)
    return (
        <div className={styles.wrapper}>
            <div className={styles.buttonsGrid}>
                <RefreshButton />
                {!isInCalendar && <CalendarButton />}
                {isInCalendar && <ListingButton />}
            </div>

            <div className={styles.buttonsGrid}>
                {isInConfigurator && <ResourcePanelButton />}
                {isInConfigurator && <AddNewTaskButton />}
                {isInConfigurator && <LockButton variant="configurator" />}
                {isInListing && <LockButton variant="listing" />}
            </div>
        </div>
    );
};

export default ButtonBar;
