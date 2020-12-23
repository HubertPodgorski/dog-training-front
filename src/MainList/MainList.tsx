import React, { useContext } from 'react';
import styles from './MainList.module.scss';
import { ExtendedTask as ExtendedTaskType } from '../types';
import Task from '../components/Display/Task/Task';
import TrainingsContext from '../TrainingsContext';
import RefreshButton from '../components/buttons/RefreshButton/RefreshButton';
import LockButton from '../components/buttons/LockButton/LockButton';
import classnames from 'classnames';

const MainList = () => {
    const { taskList } = useContext(TrainingsContext);

    const hasTwoColumns = !!taskList.find(({ column }) => column === 'right');

    return (
        <div className={styles.wrapper}>
            <div className={styles.buttons}>
                {/*<CalendarButton />*/}
                <RefreshButton />
                <LockButton variant="listing" />
            </div>

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
    );
};

export default MainList;
