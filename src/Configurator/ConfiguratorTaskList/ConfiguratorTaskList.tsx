import React, { useContext } from 'react';
import styles from './ConfiguratorTaskList.module.scss';
import { Droppable } from 'react-beautiful-dnd';
import ConfiguratorTask from '../ConfiguratorTask/ConfiguratorTask';
import TrainingsContext, { TrainingsConsumer } from '../../TrainingsContext';
import { ExtendedTask } from '../../types';

interface Props {
    order: number;
}

const ConfiguratorTaskList = ({ order }: Props) => {
    const { taskList } = useContext(TrainingsContext);

    return (
        <>
            <Droppable droppableId={`${order}`}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={styles.list}
                    >
                        <div>#{order}</div>

                        {taskList
                            .filter(
                                ({ order: innerOrder }) => order === innerOrder
                            )
                            .map((task: ExtendedTask, index: number) => (
                                <ConfiguratorTask
                                    key={task.id}
                                    task={task}
                                    index={index}
                                />
                            ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </>
    );
};

export default ConfiguratorTaskList;
