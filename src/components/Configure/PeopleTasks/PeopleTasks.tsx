import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import styles from './PeopleTasks.module.scss';
import { peopleTaskList } from '../../../consts/peopleTasks';
import CustomSelect from './CustomSelect/CustomSelect';
import { peopleList } from '../../../consts/peoples';
import getUuid from 'uuid/v4';
import { PersonTask } from '../../../types';
import {
    canAddNewTaskPair,
    getPeopleListWithoutAlreadyChosenExceptCurrent,
    setPersonByUid,
    setPersonTaskByUid
} from '../../../services/TasksService';

interface Props {
    savePeopleTasks: Function;
    peopleTasks: PersonTask[];
}

const deletePersonTaskRow = (
    uuid: string,
    currentPeopleTasks: PersonTask[],
    setPeopleTaskPairs: Function,
    savePeopleTasks: Function
): void => {
    const newPeopleTasks = currentPeopleTasks.filter(
        (personTaskPair: PersonTask): boolean => personTaskPair.uuid !== uuid
    );

    setPeopleTaskPairs(newPeopleTasks);
    savePeopleTasks(newPeopleTasks);
};

const addNewTaskPair = (
    peopleTaskPairs: PersonTask[],
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

            {peopleTaskPairs.map((personTaskPair: PersonTask) => (
                <div
                    key={personTaskPair.uuid}
                    className={styles['people-tasks__row-wrapper']}
                >
                    <CustomSelect
                        selectedValue={personTaskPair.personId}
                        options={getPeopleListWithoutAlreadyChosenExceptCurrent(
                            peopleList,
                            peopleTaskPairs,
                            personTaskPair.personId
                        )}
                        selectLabel="Osoba"
                        onChange={(newValue: string) =>
                            // TODO: check if can be simplified
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
                            // TODO: check if can be simplified
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
