import React, { useContext, useState } from 'react';
import styles from './DogTasks.module.scss';
import CustomMultiselect from './CustomMultiselect/CustomMultiselect';
import TrainingsContext from '../../../TrainingsContext';

interface Props {
    saveDogTasks: Function;
    dogTasks: string[];
}

const DogTasks = ({ saveDogTasks, dogTasks }: Props) => {
    const { dogTasks: dogTaskList } = useContext(TrainingsContext);

    const [selectedDogTasks, setSelectedDogTasks] = useState<string[]>(
        dogTasks
    );

    return (
        <section className={styles.wrapper}>
            <p className={styles.heading}>Zadania psa na trening</p>

            <CustomMultiselect
                onChange={(newValue: string[]) => {
                    setSelectedDogTasks(newValue);
                    saveDogTasks(newValue);
                }}
                options={dogTaskList.map(dogTask => ({
                    id: dogTask.id,
                    label: dogTask.name
                }))}
                selectLabel="Zadania psów"
                selectedValue={selectedDogTasks}
            />
        </section>
    );
};

export default DogTasks;
