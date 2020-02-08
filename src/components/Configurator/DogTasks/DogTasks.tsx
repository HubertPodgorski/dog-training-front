import React, { useState } from 'react';
import styles from './DogTasks.module.scss';
import CustomMultiselect from './CustomMultiselect/CustomMultiselect';
import { dogTaskList } from '../../../consts/dogTasks';

interface Props {
    saveDogTasks: Function;
    dogTasks: string[];
}

const DogTasks = ({ saveDogTasks, dogTasks }: Props) => {
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
                options={dogTaskList}
                selectLabel="Zadania psów"
                selectedValue={selectedDogTasks}
            />
        </section>
    );
};

export default DogTasks;
