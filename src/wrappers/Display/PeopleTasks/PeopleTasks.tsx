import React from 'react';
import PersonIcon from '@material-ui/icons/Person';
import styles from './PeopleTasks.module.scss';
import { peopleTaskList } from '../../../consts/peopleTasks';
import { peopleList } from '../../../consts/peoples';
import TasksService, { TaskPair } from '../../../services/TasksService';

interface Props {
    peopleTasks: TaskPair[];
}

const PeopleTasks = ({ peopleTasks }: Props) => (
    <section className={styles['people-tasks']}>
        <p className={styles['people-tasks__heading']}>Zadania osób</p>

        {peopleTasks.map((personTaskPair: TaskPair) => (
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
        ))}
    </section>
);

export default PeopleTasks;
