import React from 'react';
import PersonIcon from '@material-ui/icons/Person';
import styles from './PeopleTasks.module.scss';
import {PersonTask} from "../../../types";

interface Props {
    peopleTasks: PersonTask[];
}

const PeopleTasks = ({ peopleTasks }: Props) => (
    <section className={styles.wrapper}>
        {peopleTasks.map((personTask: PersonTask) => (
            <div
                key={personTask.uuid}
                className={styles.listRow}
            >
                <PersonIcon />
                <strong>
                    {personTask.personName}
                </strong>
                :{' '}
                {personTask.taskName}
            </div>
        ))}
    </section>
);

export default PeopleTasks;
