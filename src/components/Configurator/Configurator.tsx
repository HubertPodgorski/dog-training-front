import React, { useContext } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { httpMethods, http } from '../../helpers/http';
import { apiRoutes } from '../../consts/apiRoutes';
import ConfiguratorTaskList from './ConfiguratorTaskList/ConfiguratorTaskList';
import { ExtendedTask } from '../../types';
import TrainingsContext from '../../TrainingsContext';
import {
    getListOfIdsInUpdatedOrder,
    getUpdatedOrderList
} from '../../services/TrainingService';

interface Props {
    setTaskList: (taskList: ExtendedTask[]) => void;
    fetchTaskList: () => void;
}

const Configurator = ({ setTaskList, fetchTaskList }: Props) => {
    const { taskList } = useContext(TrainingsContext);

    const onDragEnd = (result: DropResult): void => {
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

        const updatedTrainingList: any = getUpdatedOrderList(
            taskList,
            draggableId,
            source.index,
            destination.index
        );

        setTaskList(updatedTrainingList);

        http(
            apiRoutes.PUT.changeOrder,
            httpMethods.PUT,
            getListOfIdsInUpdatedOrder(updatedTrainingList)
        );
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <ConfiguratorTaskList fetchTaskList={fetchTaskList} />
        </DragDropContext>
    );
};

export default Configurator;
