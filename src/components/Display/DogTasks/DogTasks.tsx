import React from 'react';
import styles from './DogTasks.module.scss'
import { DogTask } from '../../../types';

interface Props {
    dogTasks: DogTask[];
}

const isOnlyOne = (list: any[]): boolean => list.length === 1;
const isLast = (list: any[], index: number): boolean =>
    index + 1 === list.length;

const canRenderNextTaskSeparator = (list: any[], index: number): boolean =>
    !(isLast(list, index) || isOnlyOne(list));

const DogTasks = ({ dogTasks }: Props) => {
    return (
        <section className={styles.wrapper}>
            <div className={styles.listWrapper}>
                {dogTasks.map((dogTask: DogTask, index: number) => (
                    <span key={dogTask.id}>
                        {dogTask.name}{' '}
                        {canRenderNextTaskSeparator(dogTasks, index) && ' // '}
                    </span>
                ))}
            </div>
        </section>
    );
};

export default DogTasks;
