import React from 'react';
import styles from './MainList.module.scss';
import RefreshButton from '../components/buttons/RefreshButton/RefreshButton';
import LockButton from '../components/buttons/LockButton/LockButton';
import TasksGrid from '../components/TwoColumnsGrid/TasksGrid';

const MainList = () => {
    return (
        <div className={styles.wrapper}>
            <div>
                {/*<CalendarButton />*/}
                <RefreshButton />
                <LockButton variant="listing" />
            </div>

            <TasksGrid />
        </div>
    );
};

export default MainList;
