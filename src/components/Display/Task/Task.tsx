import React, { useState } from 'react';
import styles from './Task.module.scss';
import { FaDog } from 'react-icons/fa';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Collapse from '@material-ui/core/Collapse';
import DogTasks from '../DogTasks/DogTasks';
import PeopleTasks from '../PeopleTasks/PeopleTasks';
import { ExtendedTask as ExtendedTaskType } from '../../../types';

interface Props {
    task: ExtendedTaskType;
}

const getIconBasedOnExpandState = (
    isExpanded: boolean
): 'expand_less' | 'expand_more' =>
    isExpanded ? 'expand_less' : 'expand_more';

const Task = ({ task }: Props) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const toggleIsExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <li className={styles.row}>
            <div className={styles.label}>
                <div className={styles.dogs}>
                    {task.dogs.length === 0 && <>Brak wybranych psów do tego zadania</>}

                    {task.dogs.map((dog, index) => (
                        <div key={dog.id} className={styles.dog}>
                            {dog.name} {index !== (task.dogs.length - 1) && '//'}
                        </div>
                    ))}
                </div>

                <div>
                    <IconButton onClick={toggleIsExpanded}>
                        <Icon>{getIconBasedOnExpandState(isExpanded)}</Icon>
                    </IconButton>
                </div>
            </div>

            <Collapse in={isExpanded}>
                <p className={styles.description}>{task.description}</p>

                <DogTasks dogTasks={task.tasks} />

                <PeopleTasks peopleTasks={task.peopleTasks} />
            </Collapse>
        </li>
    );
};

export default Task;
