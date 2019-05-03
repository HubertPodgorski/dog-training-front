import React from 'react';
import styles from './DogTrainingList.module.scss';
import { DogTraining } from '../../types/Dog';
import DogTrainingListRow from '../DogTrainingListRow/DogTrainingListRow';
import { Droppable } from 'react-beautiful-dnd';

const renderList = (dogTrainingList: DogTraining[]) =>
    dogTrainingList.map((dogInTraining: DogTraining, index: number) => (
        <DogTrainingListRow
            key={dogInTraining.id}
            dogInTraining={dogInTraining}
            index={index}
        />
    ));

interface Props {
    dogTrainingList: DogTraining[];
}

const DogTrainingList: React.FC<Props> = ({
    dogTrainingList
}: {
    dogTrainingList: DogTraining[];
}) => (
    <Droppable droppableId="dog-training-list">
        {provided => (
            <ul
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={styles['dog-training-list']}
            >
                {renderList(dogTrainingList)}
                {provided.placeholder}
            </ul>
        )}
    </Droppable>
);

export default DogTrainingList;
