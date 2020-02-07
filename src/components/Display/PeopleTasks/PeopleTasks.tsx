import React from 'react';
import PersonIcon from '@material-ui/icons/Person';
import styles from './PeopleTasks.module.scss';
import { peopleTaskList } from '../../../consts/peopleTasks';
import { peopleList } from '../../../consts/peoples';
import {PersonTask} from "../../../types";
import {getLabelByIdFromList} from "../../../services/TasksService";

interface Props {
    peopleTasks: PersonTask[];
}

const PeopleTasks = ({ peopleTasks }: Props) => (
    <section className={styles['people-tasks']}>
        <p className={styles['people-tasks__heading']}>Zadania osób</p>

        {peopleTasks.map((personTaskPair: PersonTask) => (
            <div
                key={personTaskPair.uuid}
                className={styles['people-tasks__list-row']}
            >
                <PersonIcon />
                <strong>
                    {/*TODO: should not be needed after making new type full into life*/}
                    {getLabelByIdFromList(
                        personTaskPair.personId,
                        peopleList
                    )}
                </strong>
                :{' '}
                {/*TODO: should not be needed after making new type full into life*/}
                {getLabelByIdFromList(
                    personTaskPair.taskId,
                    peopleTaskList
                )}
            </div>
        ))}
    </section>
);

export default PeopleTasks;
