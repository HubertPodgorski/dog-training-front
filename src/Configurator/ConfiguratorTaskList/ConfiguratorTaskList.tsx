import React, { useContext, useEffect, useState } from 'react';
import styles from './ConfiguratorTaskList.module.scss';
import { Droppable } from 'react-beautiful-dnd';
import ConfiguratorTask from '../ConfiguratorTask/ConfiguratorTask';
import TrainingsContext from '../../TrainingsContext';
import { ExtendedTask } from '../../types';
import classnames from 'classnames';
import classNames from 'classnames';

interface Props {
    order: number;
}

const ConfiguratorTaskList = ({ order }: Props) => {
    const { taskList } = useContext(TrainingsContext);
    const [list, setList] = useState<ExtendedTask[]>([]);

    useEffect(() => {
        setList(
            taskList.filter(({ order: innerOrder }) => order === innerOrder)
        );
    }, [taskList]);

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
                        <div
                            className={classNames({
                                [styles.emptyOrderBlock]: list.length === 0,
                            })}
                        >
                            #{order}
                        </div>

                        {list.map((task: ExtendedTask, index: number) => (
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
