import React, { useState, useContext, Fragment } from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import styles from './PeopleTasks.module.scss';
import { peopleTaskList } from '../../consts/peopleTasks';
import CustomSelect from './CustomSelect/CustomSelect';
import { peopleList } from '../../consts/peoples';
import getUuid from 'uuid/v4';
import { DogTrainingContext } from '../../App';
import PeopleTasksService, {
    TaskPair
} from '../../services/PeopleTasksService';

interface Props {}

const deletePersonTaskRow = (
    uuid: string,
    currentPeopleTasks: TaskPair[],
    setPeopleTaskPairs: Function
): void => {
    const newPeopleTasks = currentPeopleTasks.filter(
        (personTaskPair: TaskPair): boolean => personTaskPair.uuid !== uuid
    );

    setPeopleTaskPairs(newPeopleTasks);
};

const setPersonTaskByUid = (
    currentPeopleTasks: TaskPair[],
    personPairUid: string,
    newValue: string,
    setPeopleTaskPairs: Function
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
};

const setPersonByUid = (
    currentPeopleTasks: TaskPair[],
    personPairUid: string,
    newValue: string,
    setPeopleTaskPairs: Function
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
};

const renderPersonTaskRows = (
    peopleTaskPairs: TaskPair[],
    setPeopleTaskPairs: Function
) =>
    peopleTaskPairs.map((personTaskPair: TaskPair) => (
        <div
            key={personTaskPair.uuid}
            className={styles['people-tasks__row-wrapper']}
        >
            <CustomSelect
                selectedValue={personTaskPair.personId}
                options={PeopleTasksService.getPeopleListWithoutAlreadyChoosen(
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
                        setPeopleTaskPairs
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
                        setPeopleTaskPairs
                    )
                }
            />

            <IconButton
                onClick={() =>
                    deletePersonTaskRow(
                        personTaskPair.uuid,
                        peopleTaskPairs,
                        setPeopleTaskPairs
                    )
                }
            >
                <DeleteIcon />
            </IconButton>
        </div>
    ));

const canAddNewTaskPair = (peopleTaskPairs: TaskPair[]): boolean =>
    peopleTaskPairs.every(
        (peopleTaskPair: TaskPair): boolean => {
            const { uuid, personId, taskId } = peopleTaskPair;

            return Boolean(uuid && personId && taskId);
        }
    );

const addNewTaskPair = (
    peopleTaskPairs: TaskPair[],
    setTaskPairs: Function
): void => {
    setTaskPairs([
        ...peopleTaskPairs,
        { uuid: getUuid(), personId: '', taskId: '' }
    ]);
};

const PeopleTasks: React.FC<Props> = () => {
    const dogTrainingContext = useContext(DogTrainingContext);
    // TODO: set available people to not already choosen ones
    const [peopleTaskPairs, setPeopleTaskPairs] = useState([]);

    return (
        <section>
            {!dogTrainingContext.isDndLocked && (
                <Fragment>
                    {renderPersonTaskRows(peopleTaskPairs, setPeopleTaskPairs)}
                    <IconButton
                        onClick={() =>
                            addNewTaskPair(peopleTaskPairs, setPeopleTaskPairs)
                        }
                        disabled={!canAddNewTaskPair(peopleTaskPairs)}
                    >
                        <AddIcon />
                    </IconButton>
                </Fragment>
            )}
        </section>
    );
};

export default PeopleTasks;
