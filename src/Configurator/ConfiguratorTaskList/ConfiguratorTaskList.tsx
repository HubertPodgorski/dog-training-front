import React, { useContext } from 'react';
import styles from './ConfiguratorTaskList.module.scss';
import { Droppable } from 'react-beautiful-dnd';
import ConfiguratorTask from '../ConfiguratorTask/ConfiguratorTask';
import TrainingsContext from '../../TrainingsContext';
import { ExtendedTask } from '../../types';
import classnames from 'classnames';

interface Props {
    order: number;
}

const ConfiguratorTaskList = ({ order }: Props) => {
    const { taskList } = useContext(TrainingsContext);

    return (
        <>
            <Droppable droppableId={`${order}`}>
                {(provided, droppableSnapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={classnames(styles.list, {
                            [styles.onDragOver]:
                                droppableSnapshot.isDraggingOver,
                        })}
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
