import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import TrainingService from '../../services/TrainingService';
import { httpMethods, http } from '../../helpers/http';
import { apiRoutes } from '../../consts/apiRoutes';
import ExtendedConfiguratorTaskList from './ExtendedConfiguratorTaskList/ExtendedConfiguratorTaskList';
import { DogTraining } from '../../types/Dog';

interface Props {
    dogTrainingList: DogTraining[];
    setDogTrainingList: (dogTrainingList: DogTraining[]) => void;
}

const Configure = ({ dogTrainingList, setDogTrainingList }: Props) => {
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

        const updatedTrainingList: any = TrainingService.getUpdatedList(
            dogTrainingList,
            draggableId,
            source.index,
            destination.index
        );

        setDogTrainingList(updatedTrainingList);

        http(
            apiRoutes.PUT.changeOrder,
            httpMethods.PUT,
            TrainingService.getListOfIdsInUpdatedOrder(updatedTrainingList)
        );
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <ExtendedConfiguratorTaskList dogTrainingList={dogTrainingList} />
        </DragDropContext>
    );
};

export default Configure;
