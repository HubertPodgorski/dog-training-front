import React from 'react';
import styles from './MainList.module.scss';
import TasksGrid from '../components/TwoColumnsGrid/TasksGrid';

const MainList = () => {
    return (
        <>
            <ButtonBar variant="listing" />
            <div className={styles.wrapper}>
                <TasksGrid />
            </div>
        </>
    );
};

export default MainList;
