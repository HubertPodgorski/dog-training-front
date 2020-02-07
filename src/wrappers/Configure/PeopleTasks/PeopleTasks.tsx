import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import styles from './PeopleTasks.module.scss';
import { peopleTaskList } from '../../../consts/peopleTasks';
import CustomSelect from './CustomSelect/CustomSelect';
import { peopleList } from '../../../consts/peoples';
import getUuid from 'uuid/v4';
import TasksService, { TaskPair } from '../../../services/TasksService';

interface Props {
    savePeopleTasks: Function;
    peopleTasks: TaskPair[];
}

const deletePersonTaskRow = (
    uuid: string,
    currentPeopleTasks: TaskPair[],
    setPeopleTaskPairs: Function,
    savePeopleTasks: Function
): void => {
    const newPeopleTasks = currentPeopleTasks.filter(
        (personTaskPair: TaskPair): boolean => personTaskPair.uuid !== uuid
    );

    setPeopleTaskPairs(newPeopleTasks);
    savePeopleTasks(newPeopleTasks);
};

const setPersonTaskByUid = (
    currentPeopleTasks: TaskPair[],
    personPairUid: string,
    newValue: string,
    setPeopleTaskPairs: Function,
    savePeopleTasks: Function
): void => {
    const newPeopleTasks = currentPeopleTasks.map(
        (personTaskPair: TaskPair): TaskPair => {
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

const setPersonByUid = (
    currentPeopleTasks: TaskPair[],
    personPairUid: string,
    newValue: string,
    setPeopleTaskPairs: Function,
    savePeopleTasks: Function
): void => {
    const newPeopleTasks = currentPeopleTasks.map(
        (personTaskPair: TaskPair): TaskPair => {
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

const canAddNewTaskPair = (peopleTaskPairs: TaskPair[]): boolean =>
    peopleTaskPairs.every((peopleTaskPair: TaskPair): boolean => {
        const { uuid, personId, taskId } = peopleTaskPair;

        return Boolean(uuid && personId && taskId);
    });

const addNewTaskPair = (
    peopleTaskPairs: TaskPair[],
    setTaskPairs: Function
): void => {
    setTaskPairs([
        ...peopleTaskPairs,
        { uuid: getUuid(), personId: '', taskId: '' }
    ]);
};

const PeopleTasks = ({ savePeopleTasks, peopleTasks }: Props) => {
    const [peopleTaskPairs, setPeopleTaskPairs] = useState(peopleTasks);

    return (
        <section className={styles['people-tasks']}>
            <p className={styles['people-tasks__heading']}>Zadania osób</p>

            {peopleTaskPairs.map((personTaskPair: TaskPair) => (
                <div
                    key={personTaskPair.uuid}
                    className={styles['people-tasks__row-wrapper']}
                >
                    <CustomSelect
                        selectedValue={personTaskPair.personId}
                        options={TasksService.getPeopleListWithoutAlreadyChosenExceptCurrent(
                            peopleList,
                            peopleTaskPairs,
                            personTaskPair.personId
                        )}
                        selectLabel="Osoba"
                        onChange={(newValue: string) =>
                            setPersonByUid(
                                peopleTaskPairs,
                                personTaskPair.uuid,
                                newValue,
                                setPeopleTaskPairs,
                                savePeopleTasks
                            )
                        }
                    />

                    <CustomSelect
                        selectedValue={personTaskPair.taskId}
                        options={peopleTaskList}
                        selectLabel="Zadanie"
                        onChange={(newValue: string) =>
                            setPersonTaskByUid(
                                peopleTaskPairs,
                                personTaskPair.uuid,
                                newValue,
                                setPeopleTaskPairs,
                                savePeopleTasks
                            )
                        }
                    />

                    <IconButton
                        onClick={() =>
                            deletePersonTaskRow(
                                personTaskPair.uuid,
                                peopleTaskPairs,
                                setPeopleTaskPairs,
                                savePeopleTasks
                            )
                        }
                    >
                        <DeleteIcon />
                    </IconButton>
                </div>
            ))}

            <IconButton
                onClick={() =>
                    addNewTaskPair(peopleTaskPairs, setPeopleTaskPairs)
                }
                disabled={!canAddNewTaskPair(peopleTaskPairs)}
            >
                <AddIcon />
            </IconButton>
        </section>
    );
};

export default PeopleTasks;
