import React, { useState } from 'react';
import styles from './Task.module.scss';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Collapse from '@material-ui/core/Collapse';
import PeopleTasks from '../PeopleTasks/PeopleTasks';
import { ExtendedTask as ExtendedTaskType } from '../../../types';
import Dog from '../Dog/Dog';
import Section from '../../Section/Section';
import classnames from 'classnames';

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

    const showExpandButton = task.description || task.peopleTasks.length > 0;

    return (
        <li
            className={classnames(styles.row, {
                [styles.colorEven]: task.order % 2 === 0,
                [styles.colorOdd]: task.order % 2 === 1,
            })}
        >
            <div className={styles.label}>
                <div className={styles.dogs}>
                    {task.dogs.length !== 0 && (
                        <div className={styles.index}>#{task.order}</div>
                    )}

                    {task.dogs.length === 0 && (
                        <>Brak wybranych psów do tego zadania</>
                    )}

                    {task.dogs.map((dog) => (
                        <Dog name={dog.name} key={dog.id} />
                    ))}
                </div>

                {!!task.tasks.length && (
                    <div className={styles.description}>
                        {task.tasks.map(({ id, name }) => (
                            <div key={id}>{name}</div>
                        ))}
                    </div>
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
                {!!task.description.length && (
                    <Section name="Opis" spacingTop>
                        {task.description}
                    </Section>
                )}

                {task.peopleTasks.length > 0 && (
                    <Section name="Zadania ludzi" spacingTop>
                        <PeopleTasks peopleTasks={task.peopleTasks} />
                    </Section>
                )}
            </Collapse>
        </li>
    );
};

export default Task;
