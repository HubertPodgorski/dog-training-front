import React, { useContext, useState } from 'react';
import styles from './Dogs.module.scss';
import CustomMultiselect from './CustomMultiselect/CustomMultiselect';
import { Dog } from '../../../types';
import TrainingsContext from '../../../TrainingsContext';

interface Props {
    saveDogs: (dogs: Dog[]) => void;
    selectedDogs: Dog[];
}

const Dogs = ({ saveDogs, selectedDogs }: Props) => {
    const { dogs } = useContext(TrainingsContext);

    const [innerSelectedDogs, setInnerSelectedDogs] = useState(
        selectedDogs.map(dog => dog.id)
    );

    return (
        <section className={styles.wrapper}>
            <CustomMultiselect
                onChange={(newSelectedDogs: string[]) => {
                    setInnerSelectedDogs(newSelectedDogs);

                    const newDogs: Dog[] = dogs.filter(dog =>
                        newSelectedDogs.includes(dog.id)
                    );

                    saveDogs(newDogs);
                }}
                options={dogs}
                selectLabel="Psy"
                selectedValues={innerSelectedDogs}
            />
        </section>
    );
};

export default Dogs;
