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
        <div>
            <li className={styles.row}>
                <div className={styles.label}>
                    <div>
                        {task.dogs.map(dog => (
                            <div key={dog.id}>
                                <span className={styles.icon}>
                                    <FaDog size="1em" />
                                </span>

                                {dog.name}
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
                    <p>{task.description}</p>

                    <DogTasks dogTasks={task.tasks} />

                    <PeopleTasks peopleTasks={task.peopleTasks} />
                </Collapse>
            </li>
        </div>
    );
};

export default Task;
