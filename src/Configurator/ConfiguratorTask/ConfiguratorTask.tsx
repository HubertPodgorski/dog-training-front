import React, { useCallback, useContext, useState } from 'react';
import debounce from 'lodash.debounce';
import { http, httpMethods } from '../../helpers/http';
import { apiRoutes } from '../../helpers/apiRoutes';
import styles from './ConfiguratorTask.module.scss';
import { Draggable } from 'react-beautiful-dnd';
import LinearProgress from '@material-ui/core/LinearProgress';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Collapse from '@material-ui/core/Collapse';
import TextField from '@material-ui/core/TextField';
import DogTasks from '../DogTasks/DogTasks';
import PeopleTasks from '../PeopleTasks/PeopleTasks';
import { Dog, DogTask, ExtendedTask, PersonTask } from '../../types';
import Dogs from '../Dogs/Dogs';
import Section from '../../components/Section/Section';
import CustomSelect from '../PeopleTasks/CustomSelect/CustomSelect';
import TrainingsContext from '../../TrainingsContext';
import { getDogNamesByOrder } from '../helpers';

interface Props {
    task: ExtendedTask;
    index: number;
}

const getIconBasedOnExpandState = (
    isExpanded: boolean
): 'expand_less' | 'expand_more' =>
    isExpanded ? 'expand_less' : 'expand_more';

const ConfiguratorTask = ({ task, index }: Props) => {
    const { dogs, taskList, fetchTaskList } = useContext(TrainingsContext);

    const [column, setColumn] = useState<'left' | 'right'>(task.column);
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [taskDescription, setTaskDescription] = useState<string>(
        task.description
    );
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [dogTasks, setDogTasks] = useState<DogTask[]>(task.tasks);
    const [selectedDogs, setSelectedDogs] = useState<Dog[]>(task.dogs);
    const [order, setOrder] = useState<number>(task.order);
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
                description,
            }
        );

        await fetchTaskList();

        setIsSaving(false);
    };

    const saveDogs = async (dogs: Dog[]) => {
        setIsSaving(true);

        await http(apiRoutes.PUT.updateTaskDogs(task.id), httpMethods.PUT, {
            dogs,
        });

        setSelectedDogs(dogs);

        await fetchTaskList();

        setIsSaving(false);
    };

    const saveDogTasks = async (dogTasks: DogTask[]) => {
        setIsSaving(true);

        await http(apiRoutes.PUT.updateDogTasks(task.id), httpMethods.PUT, {
            tasks: dogTasks,
        });

        setDogTasks(dogTasks);

        await fetchTaskList();

        setIsSaving(false);
    };

    const savePeopleTasks = async (peopleTasks: PersonTask[]) => {
        setIsSaving(true);

        await http(apiRoutes.PUT.updatePeopleTasks(task.id), httpMethods.PUT, {
            peopleTasks,
        });

        setPeopleTasks(peopleTasks);

        await fetchTaskList();

        setIsSaving(false);
    };

    const saveTaskOrder = async (order: number) => {
        setIsSaving(true);

        await http(apiRoutes.PUT.updateTaskOrder(task.id), httpMethods.PUT, {
            order,
        });

        setOrder(order);

        await fetchTaskList();

        setIsSaving(false);
    };

    const saveTaskColumn = async (column: 'left' | 'right') => {
        setIsSaving(true);

        await http(apiRoutes.PUT.updateTaskColumn(task.id), httpMethods.PUT, {
            column,
        });

        setColumn(column);

        await fetchTaskList();

        setIsSaving(false);
    };

    const deleteTask = async () => {
        await http(apiRoutes.DELETE.deleteTask(task.id), httpMethods.DELETE);

        await fetchTaskList();
    };

    return (
        <Draggable index={index} draggableId={task.id} isDragDisabled={false}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    className={styles.row}
                >
                    {isSaving && <LinearProgress />}

                    <div className={styles.label}>
                        <div className={styles.dogs}>
                            {selectedDogs.length === 0 && (
                                <>Brak wybranych psów do tego zadania</>
                            )}

                            {selectedDogs.map((dog, index) => (
                                <div key={dog.id} className={styles.dog}>
                                    {dog.name}{' '}
                                    {index !== selectedDogs.length - 1 && '//'}
                                </div>
                            ))}
                        </div>

                        <div className={styles.buttons}>
                            <IconButton
                                onClick={deleteTask}
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
                        <Section name="Kolejność">
                            <CustomSelect
                                onChange={async (order) =>
                                    await saveTaskOrder(+order)
                                }
                                options={dogs.map((_, index) => ({
                                    id: `${index + 1}`,
                                    name: `${index + 1}  ${getDogNamesByOrder(
                                        taskList,
                                        index + 1
                                    )}`,
                                }))}
                                selectLabel="Kolejność"
                                selectedValue={`${order}`}
                            />
                        </Section>

                        <Section name="Kolumna">
                            <CustomSelect
                                onChange={async (column) =>
                                    await saveTaskColumn(
                                        column as 'left' | 'right'
                                    )
                                }
                                options={[
                                    { id: 'left', name: 'Lewa' },
                                    { id: 'right', name: 'Prawa' },
                                ]}
                                selectLabel="Kolumna"
                                selectedValue={column}
                            />
                        </Section>

                        <Section name="Wybierz psy">
                            <Dogs
                                selectedDogs={selectedDogs}
                                saveDogs={saveDogs}
                            />
                        </Section>

                        <Section name="Opis">
                            <TextField
                                variant="outlined"
                                multiline
                                onChange={onDescriptionChange}
                                value={taskDescription}
                                className={styles.input}
                            />
                        </Section>

                        <Section name="Zadania psów">
                            <DogTasks
                                saveDogTasks={saveDogTasks}
                                dogTasks={dogTasks}
                            />
                        </Section>

                        <Section name="Zadania ludzi">
                            <PeopleTasks
                                savePeopleTasks={savePeopleTasks}
                                peopleTasks={peopleTasks}
                            />
                        </Section>
                    </Collapse>
                </div>
            )}
        </Draggable>
    );
};

export default ConfiguratorTask;
