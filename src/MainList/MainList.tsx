import React, { useContext } from 'react';
import styles from './MainList.module.scss';
import { ExtendedTask as ExtendedTaskType } from '../types';
import Task from '../components/Display/Task/Task';
import TrainingsContext from '../TrainingsContext';

const MainList = () => {
    const { taskList } = useContext(TrainingsContext);

    return (
        <ul className={styles.list}>
            {taskList.map((task: ExtendedTaskType, index: number) => (
                <Task key={task.id} task={task} index={index}/>
            ))}
        </ul>
    );
};

export default MainList;
