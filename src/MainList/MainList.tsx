import React, { useContext } from 'react';
import styles from './MainList.module.scss';
import { ExtendedTask as ExtendedTaskType } from '../types';
import Task from '../components/Display/Task/Task';
import TrainingsContext from '../TrainingsContext';
import classnames from 'classnames';
import ButtonBar from '../components/ButtonBar/ButtonBar';

const MainList = () => {
    const { taskList } = useContext(TrainingsContext);

    const hasTwoColumns = !!taskList.find(({ column }) => column === 'right');

    return (
        <>
            <ButtonBar variant="listing" />
            <div className={styles.wrapper}>
                <div
                    className={classnames(styles.columns, {
                        [styles.singleColumn]: !hasTwoColumns,
                    })}
                >
                    <ul className={styles.list}>
                        {taskList
                            .filter(({ column }) => column === 'left')
                            .sort((a, b) => {
                                if (a.order < b.order) {
                                    return -1;
                                } else if (a.order > b.order) {
                                    return 1;
                                }

                                return 0;
                            })
                            .map((task: ExtendedTaskType) => (
                                <Task
                                    key={task.id}
                                    task={task}
                                    hasTwoColumns={hasTwoColumns}
                                />
                            ))}
                    </ul>
                    {hasTwoColumns && (
                        <ul className={styles.list}>
                            {taskList
                                .filter(({ column }) => column === 'right')
                                .sort((a, b) => {
                                    if (a.order < b.order) {
                                        return -1;
                                    } else if (a.order > b.order) {
                                        return 1;
                                    }

                                    return 0;
                                })
                                .map((task: ExtendedTaskType) => (
                                    <Task
                                        key={task.id}
                                        task={task}
                                        hasTwoColumns={hasTwoColumns}
                                    />
                                ))}
                        </ul>
                    )}
                </div>
            </div>
        </>
    );
};

export default MainList;
