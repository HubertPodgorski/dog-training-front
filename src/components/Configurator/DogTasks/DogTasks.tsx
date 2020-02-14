import React, { useContext, useState } from 'react';
import styles from './DogTasks.module.scss';
import CustomMultiselect from './CustomMultiselect/CustomMultiselect';
import TrainingsContext from '../../../TrainingsContext';
import { DogTask } from '../../../types';

interface Props {
    saveDogTasks: (dogTasks: DogTask[]) => void;
    dogTasks: DogTask[];
}

const DogTasks = ({ saveDogTasks, dogTasks }: Props) => {
    const { dogTasks: dogTaskList } = useContext(TrainingsContext);

    const [selectedDogTasks, setSelectedDogTasks] = useState<string[]>(
        dogTasks.map(dogTask => dogTask.id)
    );

    return (
        <section className={styles.wrapper}>
            <CustomMultiselect
                onChange={(newDogTaskIds: string[]) => {
                    setSelectedDogTasks(newDogTaskIds);

                    const newDogTasksSelected = dogTaskList.filter(dogTask =>
                        newDogTaskIds.includes(dogTask.id)
                    );

                    saveDogTasks(newDogTasksSelected);
                }}
                options={dogTaskList}
                selectLabel="Zadania psów"
                selectedValue={selectedDogTasks}
            />
        </section>
    );
};

export default DogTasks;
