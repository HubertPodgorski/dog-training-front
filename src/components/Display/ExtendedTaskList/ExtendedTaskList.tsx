import React from 'react';
import styles from './ExtendedTaskList.module.scss';
import { DogTraining } from '../../../types/Dog';
import ExtendedTask from '../ExtendedTask/ExtendedTask';

interface Props {
    dogTrainingList: DogTraining[];
}

const ExtendedTaskList: React.FC<Props> = ({
    dogTrainingList
}: {
    dogTrainingList: DogTraining[];
}) => (
    <ul className={styles.list}>
        {dogTrainingList.map((dogInTraining: DogTraining) => (
            <ExtendedTask
                key={dogInTraining.id}
                dogInTraining={dogInTraining}
            />
        ))}
    </ul>
);

export default ExtendedTaskList;
