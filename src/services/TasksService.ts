import { PersonTask } from '../types';

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
        const { uuid, personId, personName, taskName,  taskId } = peopleTaskPair;

        return Boolean(uuid && personId && taskId && personName && taskName);
    });
