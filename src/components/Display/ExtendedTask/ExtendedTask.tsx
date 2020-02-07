import React, { useState } from 'react';
import styles from './ExtendedTask.module.scss';
import { FaDog } from 'react-icons/fa';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Collapse from '@material-ui/core/Collapse';
import DogTasks from '../DogTasks/DogTasks';
import PeopleTasks from '../PeopleTasks/PeopleTasks';
import { DogTraining } from '../../../types/Dog';

interface Props {
    dogInTraining: DogTraining;
}

const getIconBasedOnExpandState = (
    isExpanded: boolean
): 'expand_less' | 'expand_more' =>
    isExpanded ? 'expand_less' : 'expand_more';

const ExtendedTask = ({ dogInTraining}: Props) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const toggleIsExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div>
            <li className={styles.row}>
                <div className={styles.label}>
                    <p>
                        <span className={styles.icon}>
                            <FaDog size="1em" />
                        </span>

                        {dogInTraining.dogName}
                    </p>

                    <div>
                        <IconButton onClick={toggleIsExpanded}>
                            <Icon>{getIconBasedOnExpandState(isExpanded)}</Icon>
                        </IconButton>
                    </div>
                </div>

                <Collapse in={isExpanded}>
                    <p>{dogInTraining.trainingDescription}</p>

                    <DogTasks dogTasks={dogInTraining.dogTasks} />

                    <PeopleTasks peopleTasks={dogInTraining.peopleTasks} />
                </Collapse>
            </li>
        </div>
    );
};

export default ExtendedTask;
