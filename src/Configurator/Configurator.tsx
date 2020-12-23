import React, { useContext } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { httpMethods, http } from '../helpers/http';
import { apiRoutes } from '../helpers/apiRoutes';
import ConfiguratorTaskList from './ConfiguratorTaskList/ConfiguratorTaskList';
import { ExtendedTask } from '../types';
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

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const taskToUpdate = taskList.find(({ id }) => id === draggableId);

        if (!taskToUpdate) {
            return;
        }

        const newOrder = +destination.droppableId;

        const updatedTaskList: ExtendedTask[] = [
            ...taskList.filter(({ id }) => id !== taskToUpdate.id),
            { ...taskToUpdate, order: newOrder },
        ];

        setTaskList(updatedTaskList);

        await http(
            apiRoutes.PUT.updateTaskOrder(taskToUpdate.id),
            httpMethods.PUT,
            {
                order: newOrder,
            }
        );
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
                    {getOrderList(taskList).map((order) => (
                        <ConfiguratorTaskList order={order} key={order} />
                    ))}
                </DragDropContext>
            </div>
        </>
    );
};

export default Configurator;
