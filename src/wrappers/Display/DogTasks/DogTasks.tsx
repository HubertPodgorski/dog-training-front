import React from 'react';
import styles from './DogTasks.module.scss';
import { dogTaskList } from '../../../consts/dogTasks';
import TasksService from '../../../services/TasksService';

interface Props {
    dogTasks: string[];
}

const isOnlyOne = (list: any[]): boolean => list.length === 1;
const isLast = (list: any[], index: number): boolean =>
    index + 1 === list.length;

const canRenderNextTaskSeparator = (list: any[], index: number): boolean =>
    !(isLast(list, index) || isOnlyOne(list));

const DogTasks = ({ dogTasks }: Props) => {
    return (
        <section className={styles.wrapper}>
            <p className={styles.heading}>Zadania psa na trening</p>

            <div className={styles.listWrapper}>
                {dogTasks.map((taskId: string, index: number) => (
                    <span key={taskId}>
                        {TasksService.getLabelByIdFromList(taskId, dogTaskList)}{' '}
                        {canRenderNextTaskSeparator(dogTasks, index) && ' // '}
                    </span>
                ))}
            </div>
        </section>
    );
};

export default DogTasks;
