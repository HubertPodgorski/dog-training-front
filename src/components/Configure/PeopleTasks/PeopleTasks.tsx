import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import styles from './PeopleTasks.module.scss';
import { peopleTaskList } from '../../../consts/peopleTasks';
import CustomSelect from './CustomSelect/CustomSelect';
import { peopleList } from '../../../consts/peoples';
import getUuid from 'uuid/v4';
import { PersonTask, SelectOption } from '../../../types';
import {
    canAddNewTaskPair,
    isPersonAlreadyInTheList
} from '../../../services/TasksService';

interface Props {
    savePeopleTasks: (peopleTasks: PersonTask[]) => void;
    peopleTasks: PersonTask[];
}

const PeopleTasks = ({ savePeopleTasks, peopleTasks }: Props) => {
    const [peopleTaskPairs, setPeopleTaskPairs] = useState<PersonTask[]>(
        peopleTasks
    );

    const getPeopleListWithoutAlreadyChosenExceptCurrent = (
        personTask: PersonTask
    ) =>
        peopleList.filter(
            (person: SelectOption): boolean =>
                !isPersonAlreadyInTheList(person.id, peopleTaskPairs) ||
                person.id === personTask.personId
        );

    const addNewTaskPair = (): void => {
        setPeopleTaskPairs([
            ...peopleTaskPairs,
            {
                uuid: getUuid(),
                personId: '',
                taskId: '',
                taskName: '',
                personName: ''
            }
        ]);
    };

    const deletePersonTaskRow = (uuid: string): void => {
        const newPeopleTasks = peopleTaskPairs.filter(
            (personTask: PersonTask): boolean => personTask.uuid !== uuid
        );

        setPeopleTaskPairs(newPeopleTasks);
        savePeopleTasks(newPeopleTasks);
    };

    const setPersonByUid = (uuid: string, newPersonId: string, newPersonName: string): void => {
        const newPeopleTasks = peopleTasks.map(
            (personTask: PersonTask): PersonTask => {
                if (personTask.uuid === uuid) {
                    return {
                        ...personTask,
                        personId: newPersonId,
                        personName: newPersonName
                    };
                }

                return personTask;
            }
        );

        setPeopleTaskPairs(newPeopleTasks);

        if (canAddNewTaskPair(newPeopleTasks)) {
            savePeopleTasks(newPeopleTasks);
        }
    };

    const setPersonTaskByUid = (uuid: string, newTaskId: string, newTaskName: string): void => {
        const newPeopleTasks = peopleTasks.map(
            (personTask: PersonTask): PersonTask => {
                if (personTask.uuid === uuid) {
                    return {
                        ...personTask,
                        taskId: newTaskId,
                        taskName: newTaskName
                    };
                }

                return personTask;
            }
        );

        setPeopleTaskPairs(newPeopleTasks);
        if (canAddNewTaskPair(newPeopleTasks)) {
            savePeopleTasks(newPeopleTasks);
        }
    };

    return (
        <section className={styles.wrapper}>
            <p className={styles.heading}>Zadania osób</p>

            {peopleTaskPairs.map((personTask: PersonTask) => (
                <div
                    key={personTask.uuid}
                    className={styles.rowWrapper}
                >
                    <CustomSelect
                        selectedValue={personTask.personId}
                        options={getPeopleListWithoutAlreadyChosenExceptCurrent(
                            personTask
                        )}
                        selectLabel="Osoba"
                        onChange={(newPersonId: string, newPersonName: string) =>
                            setPersonByUid(personTask.uuid, newPersonId, newPersonName)
                        }
                    />

                    <CustomSelect
                        selectedValue={personTask.taskId}
                        options={peopleTaskList}
                        selectLabel="Zadanie"
                        onChange={(newTaskId: string, newTaskName: string) =>
                            setPersonTaskByUid(personTask.uuid, newTaskId, newTaskName)
                        }
                    />

                    <IconButton
                        onClick={() => deletePersonTaskRow(personTask.uuid)}
                    >
                        <DeleteIcon />
                    </IconButton>
                </div>
            ))}

            <IconButton
                onClick={addNewTaskPair}
                disabled={!canAddNewTaskPair(peopleTaskPairs)}
            >
                <AddIcon />
            </IconButton>
        </section>
    );
};

export default PeopleTasks;
