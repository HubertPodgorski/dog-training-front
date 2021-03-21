import React, { useState } from 'react';
import styles from './ConfiguratorTask.module.scss';
import { Draggable } from 'react-beautiful-dnd';
import LinearProgress from '@material-ui/core/LinearProgress';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import { ExtendedTask } from '../../types';
import EditTaskModal from '../EditTaskModal/EditTaskModal';
import axios from 'axios';
import { apiRoutes } from '../../helpers/apiRoutes';
import useFetchTaskList from '../../hooks/useFetchTaskList';

interface Props {
    task: ExtendedTask;
    index: number;
}

const ConfiguratorTask = ({ task, index }: Props) => {
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [editOpen, setEditOpen] = useState<boolean>(false);

    const fetchTaskList = useFetchTaskList()

    const deleteTask = async () => {
        await axios.delete(apiRoutes.DELETE.deleteTask(task.id));

        await fetchTaskList()
    };

    return (
        <>
            <Draggable
                index={index}
                draggableId={`task-${task.id}`}
                isDragDisabled={false}
            >
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        className={styles.row}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        {isSaving && <LinearProgress />}

                        <div className={styles.label}>
                            <div className={styles.dogs} onClick={() => {
                                setEditOpen(true);
                            }}>
                                {task.dogs.length === 0 && (
                                    <>Brak wybranych psów do tego zadania</>
                                )}

                                {task.dogs.map((dog) => (
                                    <div key={dog.id} className={styles.dog}>
                                        {dog.name}
                                    </div>
                                ))}
                            </div>

                            <IconButton
                                onClick={deleteTask}
                                className={styles.iconWrapper}
                            >
                                <Icon className={styles.expandIcon}>cancel</Icon>
                            </IconButton>
                        </div>
                    </div>
                )}
            </Draggable>

            <EditTaskModal
                task={task}
                open={editOpen}
                onClose={() => {
                    setEditOpen(false);
                }}
                setIsSaving={setIsSaving}
            />
        </>
    );
};

export default ConfiguratorTask;
