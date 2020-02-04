import React, {useCallback, useContext, useState} from 'react';
import styles from './DogTrainingListRow.module.scss';
import { DogTraining } from '../../types/Dog';
import { Draggable } from 'react-beautiful-dnd';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import { FaDog } from 'react-icons/fa';
import { apiRoutes } from '../../consts/apiRoutes';
import { httpMethods, http } from '../../helpers/http';
import LinearProgress from '@material-ui/core/LinearProgress';
import PeopleTasks from '../PeopleTasks/PeopleTasks';
import DogTasks from '../DogTasks/DogTasks';
import { TaskPair } from '../../services/TasksService';
import TrainingsContext from '../../TrainingsContext';
import {views} from "../../consts/views";
import debounce from 'lodash.debounce'

interface Props {
    dogInTraining: DogTraining;
    index: number;
}

const getIconBasedOnExpandState = (
    isExpanded: boolean
): 'expand_less' | 'expand_more' =>
    isExpanded ? 'expand_less' : 'expand_more';

const getIconBasedOnIsDisabledState = (
    isDisabled: boolean
): 'check' | 'cancel' => (isDisabled ? 'check' : 'cancel');

const DogTrainingListRow = ({ dogInTraining, index }: Props) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [isDisabled, setIsDisabled] = useState<boolean>(
        dogInTraining.isDisabled
    );
    const [trainingDescription, setTrainingDescription] = useState<string>(
        dogInTraining.trainingDescription
    );
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [dogTasks, setDogTasks] = useState<string[]>(dogInTraining.dogTasks);
    const [peopleTasks, setPeopleTasks] = useState<TaskPair[]>(
        dogInTraining.peopleTasks
    );

    const trainingsContext = useContext(TrainingsContext);

    const onDescriptionChange = (e: any) => {
        const { value } = e.currentTarget;
        setTrainingDescription(value);
        debouncedSaveDescription(value);
    };

    const toggleIsExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    const debouncedSaveDescription = useCallback(debounce(async (description: string) => {
        await saveDescription(description)
    }, 300), []);

    const saveDescription = async (description: string) => {
        setIsSaving(true);

        await http(
            apiRoutes.PUT.updateTrainingDescription(dogInTraining.id),
            httpMethods.PUT,
            {
                trainingDescription: description
            }
        );

        setIsSaving(false);
    };

    const saveDogTasks = async (dogTasks: string[]) => {
        setIsSaving(true);
        setDogTasks(dogTasks);

        await http(
            apiRoutes.PUT.updateDogTasks(dogInTraining.id),
            httpMethods.PUT,
            {
                dogTasks
            }
        );

        setIsSaving(false);
    };

    const savePeopleTasks = async (peopleTasks: TaskPair[]) => {
        setIsSaving(true);
        setPeopleTasks(peopleTasks);

        await http(
            apiRoutes.PUT.updatePeopleTasks(dogInTraining.id),
            httpMethods.PUT,
            {
                peopleTasks
            }
        );

        setIsSaving(false);
    };

    const toggleIsDisabled = async () => {
        setIsSaving(true);
        setIsDisabled(!isDisabled);

        await http(
            apiRoutes.PUT.updateDogDisability(dogInTraining.id),
            httpMethods.PUT,
            {
                isDisabled
            }
        );

        setIsSaving(false);
    };

    const getClassNameBasedOnDisability = (): string => {
        const baseClassName = styles.row;
        if (isDisabled) {
            return styles.disabled;
        }

        return baseClassName;
    };

    return (
        <div>
            <Draggable
                index={index}
                draggableId={dogInTraining.id}
                // TODO: move DND to configurator
                isDragDisabled={false}
            >
                {provided => (
                    <li
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        className={getClassNameBasedOnDisability()}
                    >
                        {isSaving && <LinearProgress />}
                        <div className={styles.label}>
                            <p>
                                <span
                                    className={
                                        styles.icon
                                    }
                                >
                                    <FaDog size="1em" />
                                </span>

                                {dogInTraining.dogName}
                            </p>

                            <div>
                                {trainingsContext.currentView === views.configurator && (
                                    <IconButton
                                        onClick={toggleIsDisabled}
                                        className={
                                            styles.iconWrapper
                                        }
                                    >
                                        <Icon
                                            className={
                                                styles.expandIcon
                                            }
                                        >
                                            {getIconBasedOnIsDisabledState(
                                                isDisabled
                                            )}
                                        </Icon>
                                    </IconButton>
                                )}

                                <IconButton onClick={toggleIsExpanded}>
                                    <Icon>
                                        {getIconBasedOnExpandState(isExpanded)}
                                    </Icon>
                                </IconButton>
                            </div>
                        </div>

                        <Collapse in={isExpanded}>
                            {trainingsContext.currentView === views.listing && (
                                <p>{trainingDescription}</p>
                            )}

                            {trainingsContext.currentView === views.configurator && (
                                <TextField
                                    variant="outlined"
                                    multiline
                                    onChange={onDescriptionChange}
                                    value={trainingDescription}
                                    className={
                                        styles.input
                                    }
                                />
                            )}

                            <DogTasks
                                saveDogTasks={saveDogTasks}
                                dogTasks={dogTasks}
                            />

                            <PeopleTasks
                                savePeopleTasks={savePeopleTasks}
                                peopleTasks={peopleTasks}
                            />
                        </Collapse>
                    </li>
                )}
            </Draggable>
        </div>
    );
};

export default DogTrainingListRow;
