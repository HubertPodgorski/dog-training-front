import React, { useEffect, useState } from 'react';
import styles from './TasksGrid.module.scss';
import Task from '../Display/Task/Task';
import { ExtendedTask } from '../../types';
import classNames from 'classnames';
import useSelector from '../../hooks/useSelector';

const TasksGrid = () => {
    const taskList = useSelector(s => s.tasksStore.taskList)
    const [grouppedTaskList, setGrouppedTaskList] = useState<{
        [order: number]: ExtendedTask[];
    }>({});

    useEffect(() => {
        setGrouppedTaskList(
            taskList.reduce(
                (
                    newGrouppedTaskList: { [order: number]: ExtendedTask[] },
                    task
                ): { [order: number]: ExtendedTask[] } => {
                    if (newGrouppedTaskList[task.order]) {
                        return {
                            ...newGrouppedTaskList,
                            [task.order]: [
                                ...newGrouppedTaskList[task.order],
                                task,
                            ],
                        };
                    }

                    return { ...newGrouppedTaskList, [task.order]: [task] };
                },
                {}
            )
        );
    }, [taskList]);

    const hasTwoColumns = !!taskList.find(({ column }) => column === 'right');

    return (
        <div className={styles.mainGrid}>
            {Object.entries(grouppedTaskList).map(([order, tasks]) => (
                <div
                    key={order}
                    className={classNames(styles.innerGrid, {
                        [styles.singleColumn]: !hasTwoColumns,
                    })}
                    style={{
                        gridRow: `${+order} / ${+order + 1}`,
                    }}
                >
                    {tasks.map((task) => (
                        <>
                            <Task
                                key={task.id}
                                task={task}
                                hasTwoColumns={hasTwoColumns}
                                className={
                                    task.column === 'left'
                                        ? styles.leftColumnTask
                                        : styles.rightColumnTask
                                }
                            />
                        </>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default TasksGrid;
