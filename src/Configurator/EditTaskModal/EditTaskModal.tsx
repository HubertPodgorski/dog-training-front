import React, { useCallback, useContext, useState } from 'react';
import { Modal } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import classNames from 'classnames';
import Icon from '@material-ui/core/Icon';
import Section from '../../components/Section/Section';
import CustomSelect from '../PeopleTasks/CustomSelect/CustomSelect';
import { getDogNamesByOrder } from '../helpers';
import { Column, Dog, DogTask, ExtendedTask, PersonTask } from '../../types';
import Dogs from '../Dogs/Dogs';
import TextField from '@material-ui/core/TextField';
import DogTasks from '../DogTasks/DogTasks';
import PeopleTasks from '../PeopleTasks/PeopleTasks';
import { http, httpMethods } from '../../helpers/http';
import { apiRoutes } from '../../helpers/apiRoutes';
import debounce from 'lodash.debounce';
import TrainingsContext from '../../TrainingsContext';
import styles from './EditTaskModal.module.scss';

interface Props {
    open: boolean;
    onClose: () => void;
    task: ExtendedTask;
    setIsSaving: (saving: boolean) => void;
}

const EditTaskModal = ({ open, onClose, task, setIsSaving }: Props) => {
    const { dogs, taskList, fetchTaskList } = useContext(TrainingsContext);

    const [column, setColumn] = useState<Column>(task.column);
    const [taskDescription, setTaskDescription] = useState<string>(
        task.description
    );
    const [dogTasks, setDogTasks] = useState<DogTask[]>(task.tasks);
    const [selectedDogs, setSelectedDogs] = useState<Dog[]>(task.dogs);
    const [order, setOrder] = useState<number>(task.order);
    const [peopleTasks, setPeopleTasks] = useState<PersonTask[]>(
        task.peopleTasks
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

    const saveTaskColumn = async (column: Column) => {
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

    const onDescriptionChange = (e: any) => {
        const { value } = e.currentTarget;
        setTaskDescription(value);
        debouncedSaveDescription(value);
    };

    const debouncedSaveDescription = useCallback(
        debounce(async (description: string) => {
            await saveDescription(description);
        }, 300),
        []
    );

    return (
        <Modal open={open} onClose={() => onClose()} className={styles.modal}>
            <div className={styles.modalContent}>
                <IconButton
                    onClick={() => {
                        onClose();
                    }}
                    className={classNames(
                        styles.iconWrapper,
                        styles.closeModalIcon
                    )}
                >
                    <Icon className={styles.expandIcon}>close</Icon>
                </IconButton>

                <Section name="Kolejność">
                    <CustomSelect
                        onChange={async (order) => await saveTaskOrder(+order)}
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
                            await saveTaskColumn(column as Column)
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
                    <Dogs selectedDogs={selectedDogs} saveDogs={saveDogs} />
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
                    <DogTasks saveDogTasks={saveDogTasks} dogTasks={dogTasks} />
                </Section>

                <Section name="Zadania ludzi">
                    <PeopleTasks
                        savePeopleTasks={savePeopleTasks}
                        peopleTasks={peopleTasks}
                    />
                </Section>

                <div>
                    <IconButton
                        onClick={deleteTask}
                        className={styles.iconWrapper}
                    >
                        Usuń zadanie
                        <Icon className={styles.expandIcon}>cancel</Icon>
                    </IconButton>
                </div>
            </div>
        </Modal>
    );
};

export default EditTaskModal;
