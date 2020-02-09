import React, { useCallback, useState } from 'react';
import debounce from 'lodash.debounce';
import { http, httpMethods } from '../../../helpers/http';
import { apiRoutes } from '../../../consts/apiRoutes';
import styles from './ConfiguratorTask.module.scss';
import { Draggable } from 'react-beautiful-dnd';
import LinearProgress from '@material-ui/core/LinearProgress';
import { FaDog } from 'react-icons/fa';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Collapse from '@material-ui/core/Collapse';
import TextField from '@material-ui/core/TextField';
import DogTasks from '../DogTasks/DogTasks';
import PeopleTasks from '../PeopleTasks/PeopleTasks';
import { Dog, ExtendedTask, PersonTask } from '../../../types';
import Dogs from '../Dogs/Dogs';

interface Props {
    task: ExtendedTask;
    index: number;
}

const getIconBasedOnExpandState = (
    isExpanded: boolean
): 'expand_less' | 'expand_more' =>
    isExpanded ? 'expand_less' : 'expand_more';

const ConfiguratorTask = ({ task, index }: Props) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [taskDescription, setTaskDescription] = useState<string>(
        task.description
    );
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [dogTasks, setDogTasks] = useState<string[]>(task.tasks);
    const [selectedDogs, setSelectedDogs] = useState<Dog[]>(task.dogs);
    const [peopleTasks, setPeopleTasks] = useState<PersonTask[]>(
        task.peopleTasks
    );

    const onDescriptionChange = (e: any) => {
        const { value } = e.currentTarget;
        setTaskDescription(value);
        debouncedSaveDescription(value);
    };

    const toggleIsExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    const debouncedSaveDescription = useCallback(
        debounce(async (description: string) => {
            await saveDescription(description);
        }, 300),
        []
    );

    const saveDescription = async (description: string) => {
        setIsSaving(true);

        await http(
            apiRoutes.PUT.updateTaskDescription(task.id),
            httpMethods.PUT,
            {
                description
            }
        );

        setIsSaving(false);
    };

    const saveDogs = async (dogs: Dog[]) => {
        setIsSaving(true);

        await http(apiRoutes.PUT.updateTaskDogs(task.id), httpMethods.PUT, {
            dogs
        });

        setSelectedDogs(dogs);

        setIsSaving(false);
    };

    const saveDogTasks = async (dogTasks: string[]) => {
        setIsSaving(true);

        await http(apiRoutes.PUT.updateDogTasks(task.id), httpMethods.PUT, {
            dogTasks
        });

        setDogTasks(dogTasks);

        setIsSaving(false);
    };

    const savePeopleTasks = async (peopleTasks: PersonTask[]) => {
        setIsSaving(true);

        await http(apiRoutes.PUT.updatePeopleTasks(task.id), httpMethods.PUT, {
            peopleTasks
        });

        setPeopleTasks(peopleTasks);

        setIsSaving(false);
    };

    // TODO: remove task
    const removeTask = () => {};

    return (
        <div>
            <Draggable
                index={index}
                draggableId={task.id}
                isDragDisabled={false}
            >
                {provided => (
                    <li
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        className={styles.row}
                    >
                        {isSaving && <LinearProgress />}

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
                                <IconButton
                                    // TODO: remove task
                                    onClick={removeTask}
                                    className={styles.iconWrapper}
                                >
                                    <Icon className={styles.expandIcon}>
                                        cancel
                                    </Icon>
                                </IconButton>

                                <IconButton onClick={toggleIsExpanded}>
                                    <Icon>
                                        {getIconBasedOnExpandState(isExpanded)}
                                    </Icon>
                                </IconButton>
                            </div>
                        </div>

                        <Collapse in={isExpanded}>
                            <Dogs
                                selectedDogs={selectedDogs.map(
                                    selectedDog => selectedDog.id
                                )}
                                saveDogs={saveDogs}
                            />

                            <TextField
                                variant="outlined"
                                multiline
                                onChange={onDescriptionChange}
                                value={taskDescription}
                                className={styles.input}
                            />

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

export default ConfiguratorTask;
