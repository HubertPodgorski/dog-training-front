import React from 'react';
import styles from './ExtendedConfiguratorTaskList.module.scss';
import { DogTraining } from '../../../types/Dog';
import { Droppable } from 'react-beautiful-dnd';
import ExtendedConfiguratorTask from "../ExtendedConfiguratorTask/ExtendedConfiguratorTask";

interface Props {
    dogTrainingList: DogTraining[];
}

const ExtendedConfiguratorTaskList = ({
    dogTrainingList
}: Props) => (
    <Droppable droppableId="extended-task-list">
        {provided => (
            <ul
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={styles.list}
            >
                {dogTrainingList.map((dogInTraining: DogTraining, index: number) => (
                    <ExtendedConfiguratorTask
                        key={dogInTraining.id}
                        dogInTraining={dogInTraining}
                        index={index}
                    />
                ))}
                {provided.placeholder}
            </ul>
        )}
    </Droppable>
);

export default ExtendedConfiguratorTaskList;
