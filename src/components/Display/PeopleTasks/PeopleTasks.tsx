import React from 'react';
import PersonIcon from '@material-ui/icons/Person';
import styles from './PeopleTasks.module.scss';
import {PersonTask} from "../../../types";

interface Props {
    peopleTasks: PersonTask[];
}

const PeopleTasks = ({ peopleTasks }: Props) => (
    <section className={styles.wrapper}>
        <p className={styles.heading}>Zadania osób</p>

        {peopleTasks.map((personTask: PersonTask) => (
            <div
                key={personTask.uuid}
                className={styles.listRow}
            >
                <PersonIcon />
                <strong>
                    {/*TODO: CHECK WHERE IT IS SAVED TO DISPLAY THOSE NAMES*/}
                    {personTask.personName}
                </strong>
                :{' '}
                {/*TODO: CHECK WHERE IT IS SAVED TO DISPLAY THOSE NAMES*/}
                {personTask.taskName}
            </div>
        ))}
    </section>
);

export default PeopleTasks;
