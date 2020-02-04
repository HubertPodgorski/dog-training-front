import { SelectOption } from '../types/Select';

export interface TaskPair {
    uuid: string;
    personId: string;
    taskId: string;
}

export default class TasksService {
    static isPersonAlreadyInTheList(
        personUuid: string,
        currentPeopleTasks: TaskPair[]
    ): boolean {
        return currentPeopleTasks.some(
            (personTask: TaskPair): boolean =>
                personTask.personId ? personTask.personId === personUuid : false
        );
    }

    static getPeopleListWithoutAlreadyChosenExceptCurrent(
        allPeopleList: SelectOption[],
        currentPeopleTasks: TaskPair[],
        currentSelectPersonUid: string
    ): SelectOption[] {
        return allPeopleList.filter(
            (person: SelectOption): boolean =>
                !TasksService.isPersonAlreadyInTheList(
                    person.id,
                    currentPeopleTasks
                ) || person.id === currentSelectPersonUid
        );
    }

    static getLabelByIdFromList(id: string, list: SelectOption[]): string {
        const itemFound = list.find((option: SelectOption) => option.id === id);

        return itemFound ? itemFound.label : '---';
    }
}
