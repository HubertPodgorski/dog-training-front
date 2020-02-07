import { SelectOption, PersonTask } from '../types';

const isPersonAlreadyInTheList = (
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

export const getPeopleListWithoutAlreadyChosenExceptCurrent = (
    allPeopleList: SelectOption[],
    currentPeopleTasks: PersonTask[],
    currentSelectPersonUid: string
): SelectOption[] =>
    allPeopleList.filter(
        (person: SelectOption): boolean =>
            !isPersonAlreadyInTheList(person.id, currentPeopleTasks) ||
            person.id === currentSelectPersonUid
    );

export const canAddNewTaskPair = (peopleTaskPairs: PersonTask[]): boolean =>
    peopleTaskPairs.every((peopleTaskPair: PersonTask): boolean => {
        const { uuid, personId, taskId } = peopleTaskPair;

        return Boolean(uuid && personId && taskId);
    });

export const setPersonTaskByUid = (
    currentPeopleTasks: PersonTask[],
    personPairUid: string,
    newValue: string,
    setPeopleTaskPairs: Function,
    savePeopleTasks: Function
): void => {
    const newPeopleTasks = currentPeopleTasks.map(
        (personTaskPair: PersonTask): PersonTask => {
            if (personTaskPair.uuid === personPairUid) {
                return {
                    ...personTaskPair,
                    taskId: newValue
                };
            }

            return personTaskPair;
        }
    );

    setPeopleTaskPairs(newPeopleTasks);
    if (canAddNewTaskPair(newPeopleTasks)) {
        savePeopleTasks(newPeopleTasks);
    }
};

export const setPersonByUid = (
    currentPeopleTasks: PersonTask[],
    personPairUid: string,
    newValue: string,
    setPeopleTaskPairs: Function,
    savePeopleTasks: Function
): void => {
    const newPeopleTasks = currentPeopleTasks.map(
        (personTaskPair: PersonTask): PersonTask => {
            if (personTaskPair.uuid === personPairUid) {
                return {
                    ...personTaskPair,
                    personId: newValue
                };
            }

            return personTaskPair;
        }
    );

    setPeopleTaskPairs(newPeopleTasks);
    if (canAddNewTaskPair(newPeopleTasks)) {
        savePeopleTasks(newPeopleTasks);
    }
};
