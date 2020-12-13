import React, { useContext } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { httpMethods, http } from '../helpers/http';
import { apiRoutes } from '../helpers/apiRoutes';
import ConfiguratorTaskList from './ConfiguratorTaskList/ConfiguratorTaskList';
import { ExtendedTask } from '../types';
import TrainingsContext, {TrainingsConsumer} from '../TrainingsContext';
import styles from './Configurator.module.scss'
import LockButton from "../components/buttons/LockButton/LockButton";
import AddNewTaskButton from "../components/buttons/AddNewTaskButton/AddNewTaskButton";
import {getListOfIdsInUpdatedOrder, getUpdatedOrderList} from "./helpers";

const Configurator = () => {
    const { taskList } = useContext(TrainingsContext);

    const onDragEnd = async (result: DropResult, setTaskList: (taskList: ExtendedTask[]) => void): Promise<void> => {
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

        await http(
            apiRoutes.PUT.changeOrder,
            httpMethods.PUT,
            getListOfIdsInUpdatedOrder(updatedTrainingList)
        );
    };

    return (
        <TrainingsConsumer>
            {({setTaskList}) => <div className={styles.wrapper}>
                <div className={styles.buttons}>
                    <AddNewTaskButton/>

                    <LockButton  variant='configurator'/>
                </div>


                <DragDropContext onDragEnd={(values) => onDragEnd(values, setTaskList)}>
                    <ConfiguratorTaskList />
                </DragDropContext>
            </div>}
        </TrainingsConsumer>
    );
};

export default Configurator;
