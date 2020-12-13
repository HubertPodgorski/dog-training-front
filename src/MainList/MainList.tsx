import React, { useContext } from 'react';
import styles from './MainList.module.scss'
import { ExtendedTask as ExtendedTaskType } from '../types';
import Task from '../components/Display/Task/Task';
import TrainingsContext from '../TrainingsContext';
import RefreshButton from "../components/buttons/RefreshButton/RefreshButton";
import LockButton from "../components/buttons/LockButton/LockButton";
import CalendarButton from "../components/buttons/CalendarButton/CalendarButton";

const MainList = () => {
    const { taskList } = useContext(TrainingsContext);

    return (
        <div className={styles.wrapper}>
            <div className={styles.buttons}>
                <CalendarButton/>
                <RefreshButton/>
                <LockButton variant='listing'/>
            </div>


            <ul className={styles.list}>
                {taskList.map((task: ExtendedTaskType, index: number) => (
                    <Task key={task.id} task={task} index={index}/>
                ))}
            </ul>
        </div>
    );
};

export default MainList;
