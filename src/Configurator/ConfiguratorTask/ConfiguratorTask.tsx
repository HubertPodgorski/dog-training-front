import React, { useState } from 'react';
import styles from './ConfiguratorTask.module.scss';
import { Draggable } from 'react-beautiful-dnd';
import LinearProgress from '@material-ui/core/LinearProgress';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import { ExtendedTask } from '../../types';
import EditTaskModal from '../EditTaskModal/EditTaskModal';

interface Props {
    task: ExtendedTask;
    index: number;
}

const ConfiguratorTask = ({ task, index }: Props) => {
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [editOpen, setEditOpen] = useState<boolean>(false);

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
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        className={styles.row}
                    >
                        {isSaving && <LinearProgress />}

                        <div className={styles.label}>
                            <div className={styles.dogs}>
                                {task.dogs.length === 0 && (
                                    <>Brak wybranych psów do tego zadania</>
                                )}

                                {task.dogs.map((dog, index) => (
                                    <div key={dog.id} className={styles.dog}>
                                        {dog.name}
                                    </div>
                                ))}
                            </div>

                            <IconButton
                                onClick={() => {
                                    setEditOpen(true);
                                }}
                                className={styles.iconWrapper}
                            >
                                <Icon className={styles.expandIcon}>mode</Icon>
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
