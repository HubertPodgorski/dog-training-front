import React, { useEffect, useState } from 'react';
import styles from './ConfiguratorTaskList.module.scss';
import { Droppable } from 'react-beautiful-dnd';
import ConfiguratorTask from '../ConfiguratorTask/ConfiguratorTask';
import { Column, ExtendedTask } from '../../types';
import classnames from 'classnames';
import useSelector from '../../hooks/useSelector';

interface Props {
    order: number;
    column: Column;
    index: number;
}

const ConfiguratorTaskList = ({ order, column }: Props) => {
    const { taskList } = useSelector(s => s.tasksStore)
    const [list, setList] = useState<ExtendedTask[]>([]);

    useEffect(() => {
        setList(
            taskList.filter(
                ({ order: innerOrder, column: taskColumn }) =>
                    order === innerOrder && taskColumn === column
            )
        );
    }, [taskList, order, column]);

    return (
        <>
            <Droppable droppableId={`order-${order}-${column}`}>
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
                            className={classnames({
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
