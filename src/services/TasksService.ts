import { SelectOption, PersonTask } from '../types';

export const isPersonAlreadyInTheList = (
    personUuid: string,
    currentPeopleTasks: PersonTask[]
): boolean => {
    return currentPeopleTasks.some((personTask: PersonTask): boolean =>
        personTask.personId ? personTask.personId === personUuid : false
    );
};

export const getLabelByIdFromList = (
    id: string,
    list: SelectOption[]
): string => {
    const itemFound = list.find((option: SelectOption) => option.id === id);

    return itemFound ? itemFound.label : '---';
};

export const canAddNewTaskPair = (peopleTaskPairs: PersonTask[]): boolean =>
    peopleTaskPairs.every((peopleTaskPair: PersonTask): boolean => {
        const { uuid, personId, taskId } = peopleTaskPair;

        return Boolean(uuid && personId && taskId);
    });
