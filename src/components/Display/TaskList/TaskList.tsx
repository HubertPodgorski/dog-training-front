import React, { useContext } from 'react';
import styles from './TaskList.module.scss';
import { ExtendedTask as ExtendedTaskType } from '../../../types';
import Task from '../Task/Task';
import TrainingsContext from '../../../TrainingsContext';

const TaskList = () => {
    const { taskList } = useContext(TrainingsContext);

    return (
        <ul className={styles.list}>
            {taskList.map((task: ExtendedTaskType, index: number) => (
                <Task key={task.id} task={task} index={index}/>
            ))}
        </ul>
    );
};

export default TaskList;
