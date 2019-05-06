import { SelectOption } from '../types/Select';

export interface TaskPair {
    uuid: string;
    personId: string;
    taskId: string;
}

export default class PeopleTasksService {
    static isPersonAlreadyInTheList(
        personUuid: string,
        currentPeopleTasks: TaskPair[]
    ): boolean {
        return currentPeopleTasks.some(
            (personTask: TaskPair): boolean =>
                personTask.personId ? personTask.personId === personUuid : false
        );
    }

    static getPeopleListWithoutAlreadyChoosen(
        allPeopleList: SelectOption[],
        currentPeopleTasks: TaskPair[],
        currentSelectPersonUid: string
    ): SelectOption[] {
        console.log('currentSelectPersonUid', currentSelectPersonUid);
        return allPeopleList.filter(
            (person: SelectOption): boolean =>
                !PeopleTasksService.isPersonAlreadyInTheList(
                    person.id,
                    currentPeopleTasks
                ) || person.id === currentSelectPersonUid
        );
    }
}
