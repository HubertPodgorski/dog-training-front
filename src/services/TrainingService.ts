import { DogTraining } from '../types/Dog';
import _cloneDeep from 'lodash/cloneDeep';
import { ExtendedTask } from '../types';

export const getUpdatedOrderList = (
    currentList: ExtendedTask[],
    changedItemId: string,
    prevPositionIndex: number,
    nextPositionIndex: number
): ExtendedTask[] => {
    let newList = _cloneDeep(currentList);

    const itemChanged = newList.find(
        (task: ExtendedTask): boolean => task.id === changedItemId
    );

    if (!itemChanged) {
        return newList;
    }

    newList.splice(prevPositionIndex, 1);
    newList.splice(nextPositionIndex, 0, itemChanged);

    return newList.map(
        (task: ExtendedTask, index: number): ExtendedTask => ({
            ...task,
            order: index
        })
    );
};

export const getListOfIdsInUpdatedOrder = (
    dogTrainingList: DogTraining[]
): { id: string; order: number }[] =>
    dogTrainingList.reduce(
        (
            currentList: { id: string; order: number }[],
            dogInTraining: DogTraining
        ) => [
            ...currentList,
            {
                id: dogInTraining.id,
                order: dogInTraining.order
            }
        ],
        []
    );
