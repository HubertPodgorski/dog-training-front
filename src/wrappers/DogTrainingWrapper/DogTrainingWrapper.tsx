import React, { Fragment, useState, useEffect } from 'react';
import styles from './DogTrainingWrapper.module.scss';
import DogTrainingList from '../../components/DogTrainingList/DogTrainingList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';
import TrainingService from '../../services/TrainingService';
import { httpMethods, http } from '../../helpers/http';
import { apiRoutes } from '../../consts/apiRoutes';

const DogTrainingWrapper = () => {
    const [dogTrainingList, setDogTrainingList] = useState([]);
    const [isDogDataFetching, setIsDogDataFetching] = useState(false);

    const fetchDogData = (): void => {
        setIsDogDataFetching(true);
        http(apiRoutes.GET.trainingDogs).then((dogTrainingList: any) => {
            setDogTrainingList(dogTrainingList);
            setIsDogDataFetching(false);
        });
    };

    useEffect(() => fetchDogData(), []);

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

        const updatedTrainigList: any = TrainingService.getUpdatedList(
            dogTrainingList,
            draggableId,
            source.index,
            destination.index
        );

        setDogTrainingList(updatedTrainigList);

        http(
            apiRoutes.PUT.changeOrder,
            httpMethods.PUT,
            TrainingService.getListOfIdsInUpdatedOrder(updatedTrainigList)
        );
    };

    const getClassNameBasedOnFetchingStatus = (): string => {
        const baseClass = 'dog-training-wrapper__refresh-icon';
        return isDogDataFetching
            ? styles[`${baseClass}--rotating`]
            : styles[baseClass];
    };

    return (
        <Fragment>
            <DragDropContext onDragEnd={onDragEnd}>
                <DogTrainingList dogTrainingList={dogTrainingList} />
            </DragDropContext>

            <Fab
                color="primary"
                aria-label="refresh"
                onClick={fetchDogData}
                className={getClassNameBasedOnFetchingStatus()}
            >
                <Icon>autorenew</Icon>
            </Fab>
        </Fragment>
    );
};

export default DogTrainingWrapper;
