import React, { useCallback, useState } from 'react';
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
import { apiRoutes } from '../../helpers/apiRoutes';
import debounce from 'lodash.debounce';
import styles from './EditTaskModal.module.scss';
import useSelector from '../../hooks/useSelector';
import useFetchTaskList from '../../hooks/useFetchTaskList';
import axios from 'axios';

interface Props {
    open: boolean;
    onClose: () => void;
    task: ExtendedTask;
    setIsSaving: (saving: boolean) => void;
}

const EditTaskModal = ({ open, onClose, task, setIsSaving }: Props) => {
    console.log('task => ', task);
    const { dogs, taskList } = useSelector(s => s.tasksStore);

    const fetchTaskList = useFetchTaskList()

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

        await axios.put(
            apiRoutes.PUT.updateTask(task.id),
            {
                description,
            }
        );

        await fetchTaskList()

        setIsSaving(false);
    };

    const saveDogs = async (dogs: Dog[]) => {
        setIsSaving(true);

        await axios.put(apiRoutes.PUT.updateTask(task.id), {
            dogs,
        });

        setSelectedDogs(dogs);

        await fetchTaskList()

        setIsSaving(false);
    };

    const saveDogTasks = async (dogTasks: DogTask[]) => {
        setIsSaving(true);

        await axios.put(apiRoutes.PUT.updateTask(task.id), {
            tasks: dogTasks,
        });

        setDogTasks(dogTasks);

        await fetchTaskList()

        setIsSaving(false);
    };

    const savePeopleTasks = async (peopleTasks: PersonTask[]) => {
        setIsSaving(true);

        await axios.put(apiRoutes.PUT.updateTask(task.id), {
            peopleTasks,
        });

        setPeopleTasks(peopleTasks);

        await fetchTaskList()

        setIsSaving(false);
    };

    const saveTaskOrder = async (order: number) => {
        setIsSaving(true);

        await axios.put(apiRoutes.PUT.updateTask(task.id),  {
            order,
        });

        setOrder(order);

        await fetchTaskList()

        setIsSaving(false);
    };

    const saveTaskColumn = async (column: Column) => {
        setIsSaving(true);

        await axios.put(apiRoutes.PUT.updateTask(task.id), {
            column,
        });

        setColumn(column);

        await fetchTaskList()

        setIsSaving(false);
    };

    const onDescriptionChange = (e: any) => {
        const { value } = e.currentTarget;
        setTaskDescription(value);
        debouncedSaveDescription(value);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                    {console.log('peopleTasks => ', peopleTasks)}
                    <PeopleTasks
                        savePeopleTasks={savePeopleTasks}
                        peopleTasks={peopleTasks}
                    />
                </Section>
            </div>
        </Modal>
    );
};

export default EditTaskModal;
