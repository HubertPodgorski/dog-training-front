import React, { useContext, useState } from 'react';
import styles from './Dogs.module.scss';
import CustomMultiselect from './CustomMultiselect/CustomMultiselect';
import { Dog } from '../../../types';
import TrainingsContext from '../../../TrainingsContext';

interface Props {
    saveDogs: (dogs: Dog[]) => void;
    selectedDogs: string[];
}

const Dogs = ({ saveDogs, selectedDogs }: Props) => {
    const { dogs } = useContext(TrainingsContext);
    const [innerSelectedDogs, setInnerSelectedDogs] = useState<string[]>(
        selectedDogs
    );

    return (
        <section className={styles.wrapper}>
            <p className={styles.heading}>Psy</p>

            <CustomMultiselect
                onChange={(newSelectedDogs: string[]) => {
                    setInnerSelectedDogs(newSelectedDogs);
                    const newDogs: Dog[] = newSelectedDogs
                        .map(selectedDogId => {
                            const dogFound = dogs.find(
                                dog => dog.id === selectedDogId
                            );

                            if (dogFound) {
                                return dogFound;
                            }

                            return undefined;
                        })
                        .filter((dog: Dog | undefined) => dog !== undefined) as Dog[];

                    saveDogs(newDogs);
                }}
                options={dogs.map(dog => ({ id: dog.id, label: dog.name }))}
                selectLabel="Psy"
                selectedValues={innerSelectedDogs}
            />
        </section>
    );
};

export default Dogs;
