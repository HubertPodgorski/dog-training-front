import React, { useState, useContext, Fragment } from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import styles from './PeopleTasks.module.scss';
import { peopleTaskList } from '../../consts/peopleTasks';
import CustomSelect from './CustomSelect/CustomSelect';
import { peopleList } from '../../consts/peoples';
import getUuid from 'uuid/v4';
import { DogTrainingContext } from '../../App';
import TasksService, { TaskPair } from '../../services/TasksService';

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

const renderPersonTaskRows = (
    peopleTaskPairs: TaskPair[],
    setPeopleTaskPairs: Function,
    savePeopleTasks: Function
) =>
    peopleTaskPairs.map((personTaskPair: TaskPair) => (
        <div
            key={personTaskPair.uuid}
            className={styles['people-tasks__row-wrapper']}
        >
            <CustomSelect
                selectedValue={personTaskPair.personId}
                options={TasksService.getPeopleListWithoutAlreadyChoosenExceptCurrent(
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

const renderDisplayPersonTaskRows = (peopleTaskPairs: TaskPair[]) =>
    peopleTaskPairs.map((personTaskPair: TaskPair) => (
        <div
            key={personTaskPair.uuid}
            className={styles['people-tasks__list-row']}
        >
            <PersonIcon />
            <strong>
                {TasksService.getLabelByIdFromList(
                    personTaskPair.personId,
                    peopleList
                )}
            </strong>
            :{' '}
            {TasksService.getLabelByIdFromList(
                personTaskPair.taskId,
                peopleTaskList
            )}
        </div>
    ));

const PeopleTasks: React.FC<Props> = ({
    savePeopleTasks,
    peopleTasks
}: {
    savePeopleTasks: Function;
    peopleTasks: TaskPair[];
}) => {
    const dogTrainingContext = useContext(DogTrainingContext);
    const [peopleTaskPairs, setPeopleTaskPairs] = useState(peopleTasks);

    return (
        <section className={styles['people-tasks']}>
            <p className={styles['people-tasks__heading']}>Zadania osób</p>

            {dogTrainingContext.isPeopleTasksEditingLocked &&
                renderDisplayPersonTaskRows(peopleTaskPairs)}

            {!dogTrainingContext.isPeopleTasksEditingLocked && (
                <Fragment>
                    {renderPersonTaskRows(
                        peopleTaskPairs,
                        setPeopleTaskPairs,
                        savePeopleTasks
                    )}
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
