import React, { useState } from 'react';
import styles from './Task.module.scss';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Collapse from '@material-ui/core/Collapse';
import DogTasks from '../DogTasks/DogTasks';
import PeopleTasks from '../PeopleTasks/PeopleTasks';
import { ExtendedTask as ExtendedTaskType } from '../../../types';

interface Props {
    task: ExtendedTaskType;
    index: number;
}

const getIconBasedOnExpandState = (
    isExpanded: boolean
): 'expand_less' | 'expand_more' =>
    isExpanded ? 'expand_less' : 'expand_more';

const Task = ({ task, index }: Props) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const toggleIsExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    const showExpandButton =
        task.description ||
        task.tasks.length > 0 ||
        task.peopleTasks.length > 0;

    return (
        <li className={styles.row}>
            <div className={styles.label}>
                <div className={styles.dogs}>
                    {task.dogs.length !== 0 && (
                        <div className={styles.index}>#{index + 1}</div>
                    )}

                    {task.dogs.length === 0 && (
                        <>Brak wybranych psów do tego zadania</>
                    )}

                    {task.dogs.map((dog, index) => (
                        <div key={dog.id} className={styles.dog}>
                            {dog.name} {index !== task.dogs.length - 1 && '//'}
                        </div>
                    ))}
                </div>

                {task.description && (
                    <div className={styles.description}>{task.description}</div>
                )}

                <div className={styles.expandButtonWrapper}>
                    {showExpandButton && (
                        <IconButton onClick={toggleIsExpanded}>
                            <Icon>{getIconBasedOnExpandState(isExpanded)}</Icon>
                        </IconButton>
                    )}
                </div>
            </div>

            <Collapse in={isExpanded}>
                {task.tasks.length > 0 && <DogTasks dogTasks={task.tasks} />}

                {task.peopleTasks.length > 0 && (
                    <PeopleTasks peopleTasks={task.peopleTasks} />
                )}
            </Collapse>
        </li>
    );
};

export default Task;
