import React, { useContext } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { httpMethods, http } from '../helpers/http';
import { apiRoutes } from '../helpers/apiRoutes';
import ConfiguratorTaskList from './ConfiguratorTaskList/ConfiguratorTaskList';
import { Column, ExtendedTask } from '../types';
import TrainingsContext from '../TrainingsContext';
import styles from './Configurator.module.scss';
import { getOrderList } from './helpers';
import ButtonBar from '../components/ButtonBar/ButtonBar';

const Configurator = () => {
    const { taskList, setTaskList } = useContext(TrainingsContext);

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

                setTaskList(updatedTaskList);

                await http(
                    apiRoutes.PUT.updateTaskOrder(taskToUpdate.id),
                    httpMethods.PUT,
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
