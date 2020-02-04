import React, { useState, useContext } from 'react';
import styles from './DogTasks.module.scss';
import CustomMultiselect from './CustomMultiselect/CustomMultiselect';
import { dogTaskList } from '../../consts/dogTasks';
import TasksService from '../../services/TasksService';
import TrainingsContext from "../../TrainingsContext";
import {views} from "../../consts/views";

interface Props {
    saveDogTasks: Function;
    dogTasks: string[];
}

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

const DogTasks = ({
    saveDogTasks,
    dogTasks
}: Props) => {
    const trainingsContext = useContext(TrainingsContext);
    const [selectedDogTasks, setSelectedDogTasks] = useState<string[]>(
        dogTasks
    );

    return (
        <section className={styles['dog-tasks']}>
            <p className={styles['dog-tasks__heading']}>
                Zadania psa na trening
            </p>

            {trainingsContext.currentView === views.listing && (
                <div className={styles['dog-tasks__list-wrapper']}>
                    {renderTasks(selectedDogTasks)}
                </div>
            )}

            {trainingsContext.currentView === views.configurator && (
                <CustomMultiselect
                    onChange={(newValue: string[]) => {
                        setSelectedDogTasks(newValue);
                        saveDogTasks(newValue);
                    }}
                    options={dogTaskList}
                    selectLabel="Zadania psa"
                    selectedValue={selectedDogTasks}
                />
            )}
        </section>
    );
};

export default DogTasks;
