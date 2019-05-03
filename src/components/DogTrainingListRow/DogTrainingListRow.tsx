import React, { useContext, useState } from 'react';
import styles from './DogTrainingListRow.module.scss';
import { DogTraining } from '../../types/Dog';
import { Draggable } from 'react-beautiful-dnd';
import { DogTrainingContext } from '../../App';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

interface Props {
    dogInTraining: DogTraining;
    index: number;
}

const getIconBasedOnExpandState = (
    isExpanded: boolean
): 'expand_less' | 'expand_more' =>
    isExpanded ? 'expand_less' : 'expand_more';

const DogTrainingListRow: React.FC<Props> = ({ dogInTraining, index }) => {
    const dogTrainingContext = useContext(DogTrainingContext);
    const [isExpanded, toggleIsExpanded] = useState(false);

    return (
        <Draggable
            index={index}
            draggableId={dogInTraining.id}
            isDragDisabled={dogTrainingContext.isDndLocked}
        >
            {provided => (
                <li
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    className={styles['dog-training-list-row']}
                >
                    <div className={styles['dog-training-list-row__label']}>
                        <p>{dogInTraining.dogName}</p>
                        <p>{dogInTraining.handler}</p>

                        <IconButton
                            onClick={() => toggleIsExpanded(!isExpanded)}
                        >
                            <Icon>{getIconBasedOnExpandState(isExpanded)}</Icon>
                        </IconButton>
                    </div>

                    <Collapse in={isExpanded}>
                        <p>{dogInTraining.trainingDescription}</p>
                    </Collapse>
                </li>
            )}
        </Draggable>
    );
};

export default DogTrainingListRow;
