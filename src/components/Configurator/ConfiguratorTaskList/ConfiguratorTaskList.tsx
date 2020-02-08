import React, { useContext } from 'react';
import styles from './ConfiguratorTaskList.module.scss';
import { Droppable } from 'react-beautiful-dnd';
import ConfiguratorTask from '../ConfiguratorTask/ConfiguratorTask';
import TrainingsContext from '../../../TrainingsContext';
import { ExtendedTask } from '../../../types';

const ConfiguratorTaskList = () => {
    const { taskList } = useContext(TrainingsContext);

    return (
        <Droppable droppableId="extended-task-list">
            {provided => (
                <ul
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={styles.list}
                >
                    {taskList.map((task: ExtendedTask, index: number) => (
                        <ConfiguratorTask
                            key={task.id}
                            task={task}
                            index={index}
                        />
                    ))}
                    {provided.placeholder}
                </ul>
            )}
        </Droppable>
    );
};

export default ConfiguratorTaskList;
