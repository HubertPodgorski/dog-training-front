import React from 'react';
import ExtendedTaskList from './ExtendedTaskList/ExtendedTaskList';
import { DogTraining } from '../../types/Dog';

interface Props {
    dogTrainingList: DogTraining[];
}

const Display = ({ dogTrainingList }: Props) => (
    <ExtendedTaskList dogTrainingList={dogTrainingList} />
);

export default Display;
