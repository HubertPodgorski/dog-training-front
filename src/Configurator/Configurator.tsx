import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { apiRoutes } from '../helpers/apiRoutes';
import ConfiguratorTaskList from './ConfiguratorTaskList/ConfiguratorTaskList';
import { Column, ExtendedTask } from '../types';
import styles from './Configurator.module.scss';
import { getOrderList } from './helpers';
import ButtonBar from '../components/ButtonBar/ButtonBar';
import useSelector from '../hooks/useSelector';
import { useDispatch } from 'react-redux';
import { setTaskList } from '../tasksStore';
import axios from 'axios';

const Configurator = () => {
    const dispatch = useDispatch()
    const { taskList } = useSelector(s => s.tasksStore);

    const onDragEnd = async (result: DropResult): Promise<void> => {
        const { source, destination, draggableId } = result;

        if (!destination) {
            return;
        }

        // FIXME: logix for same container reorder

        // Item on the same place
        if (
            source.droppableId === destination.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const [draggableIdentifier, extractedDraggableId] = draggableId.split(
            '-'
        );

        if (draggableIdentifier === 'task') {
            const taskToUpdate = taskList.find(
                ({ id }) => id === extractedDraggableId
            );

            if (!taskToUpdate) {
                return;
            }

            const [
                identifier,
                destinationOrder,
                destinationColumn,
            ] = destination.droppableId.split('-');

            if (identifier === 'order') {
                const newOrder = +destinationOrder;

                const updatedTaskList: ExtendedTask[] = [
                    ...taskList.filter(({ id }) => id !== taskToUpdate.id),
                    {
                        ...taskToUpdate,
                        order: newOrder,
                        column: destinationColumn as Column,
                    },
                ];
                dispatch(setTaskList(updatedTaskList))

                await axios.put(
                    apiRoutes.PUT.updateTask(taskToUpdate.id),
                    {
                        order: newOrder,
                        column: destinationColumn as Column,
                    }
                );
            }
        }
    };

    return (
        <>
            <ButtonBar />
            <div className={styles.wrapper}>
                <DragDropContext
                    onDragEnd={async (values) => {
                        await onDragEnd(values);
                    }}
                >
                    {getOrderList(taskList).map((order, index) => (
                        <div key={order} className={styles.grid}>
                            <ConfiguratorTaskList
                                order={order}
                                column="left"
                                index={index}
                            />

                            <ConfiguratorTaskList
                                order={order}
                                column="right"
                                index={index}
                            />
                        </div>
                    ))}
                </DragDropContext>
            </div>
        </>
    );
};

export default Configurator;
