import { Dog, ExtendedTask, PersonTask } from '../types';
import _cloneDeep from 'lodash/cloneDeep';
import { DogTraining } from '../types';

export const isPersonAlreadyInTheList = (
    personUuid: string,
    currentPeopleTasks: PersonTask[]
): boolean => {
    return currentPeopleTasks.some((personTask: PersonTask): boolean =>
        personTask.personId ? personTask.personId === personUuid : false
    );
};

export const canAddNewTaskPair = (peopleTaskPairs: PersonTask[]): boolean =>
    peopleTaskPairs.every((peopleTaskPair: PersonTask): boolean => {
        const { uuid, personId, personName, taskName, taskId } = peopleTaskPair;

        return Boolean(uuid && personId && taskId && personName && taskName);
    });

export const getOrderList = (taskList: ExtendedTask[]): number[] =>
    taskList.map((_, index) => index + 1);

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
            order: index,
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
                order: dogInTraining.order,
            },
        ],
        []
    );

export const getDogNamesByOrder = (
    taskList: ExtendedTask[],
    orderToFind: number
): string => {
    const tasks = taskList.filter(({ order }) => order === orderToFind);

    if (!tasks.length) {
        return '=> Brak psów';
    }

    const dogNames = tasks.flatMap(({ dogs }) =>
        dogs.flatMap(({ name }) => name)
    );

    return ` => ${dogNames.join(' // ')}`;
};
