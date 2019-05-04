import { DogTraining } from '../types/Dog';
import _cloneDeep from 'lodash/cloneDeep';

export default class TrainingService {
    static getUpdatedList(
        currentList: DogTraining[],
        changedItemId: string,
        prevPositionIndex: number,
        nextPositionIndex: number
    ): DogTraining[] {
        let newList = _cloneDeep(currentList);

        const itemChanged = newList.find(
            (dogInTraining: DogTraining): boolean =>
                dogInTraining.id === changedItemId
        );

        if (!itemChanged) {
            return newList;
        }

        newList.splice(prevPositionIndex, 1);
        newList.splice(nextPositionIndex, 0, itemChanged);

        return newList.map(
            (dogInTraining: DogTraining, index: number): DogTraining => ({
                ...dogInTraining,
                order: index
            })
        );
    }

    static getListOfIdsInUpdatedOrder(
        dogTrainingList: DogTraining[]
    ): { id: string; order: number }[] {
        return dogTrainingList.reduce(
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
    }
}
