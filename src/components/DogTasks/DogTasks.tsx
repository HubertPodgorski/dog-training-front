import React, { useState, useContext } from 'react';
import styles from './DogTasks.module.scss';
import { DogTrainingContext } from '../../App';
import CustomMultiselect from './CustomMultiselect/CustomMultiselect';
import { dogTaskList } from '../../consts/dogTasks';
import TasksService from '../../services/TasksService';

interface Props {}

const isOnlyOne = (list: any[]): boolean => list.length === 1;
const isLast = (list: any[], index: number): boolean =>
    index + 1 === list.length;

const canRenderNextTaskSeparator = (list: any[], index: number): boolean =>
    !(isLast(list, index) || isOnlyOne(list));

const renderTasks = (selectedTasks: string[]) =>
    selectedTasks.map((taskId: string, index: number) => (
        <span key={taskId}>
            {TasksService.getLabelByIdFromList(taskId, dogTaskList)}{' '}
            {canRenderNextTaskSeparator(selectedTasks, index) && ' // '}
        </span>
    ));

const DogTasks: React.FC<Props> = () => {
    const dogTrainingContext = useContext(DogTrainingContext);
    const [selectedDogTasks, setSelectedDogTasks] = useState<string[]>([]);

    return (
        <section className={styles['dog-tasks']}>
            <p className={styles['dog-tasks__heading']}>
                Zadania psa na trening
            </p>

            {dogTrainingContext.isDndLocked && (
                <div className={styles['dog-tasks__list-wrapper']}>
                    {renderTasks(selectedDogTasks)}
                </div>
            )}

            {!dogTrainingContext.isDndLocked && (
                <CustomMultiselect
                    onChange={(newValue: string[]) =>
                        setSelectedDogTasks(newValue)
                    }
                    options={dogTaskList}
                    selectLabel="Zadania psa"
                    selectedValue={selectedDogTasks}
                />
            )}
        </section>
    );
};

export default DogTasks;
