import React, { useEffect, useState } from 'react';
import styles from './App.module.scss';
import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';
import '@atlaskit/css-reset';
import Display from './components/Display/Display';
import { TrainingsProvider } from './TrainingsContext';
import Configurator from './components/Configurator/Configurator';
import { View, views } from './consts/views';
import { http } from './helpers/http';
import { apiRoutes } from './consts/apiRoutes';
import {Dog, ExtendedTask} from './types';
import { mapOldTypeToNewShape } from './helpers/mappers';

const App = () => {
    const [currentView, setCurrentView] = useState<View>('LISTING');
    const [isDogDataFetching, setIsDogDataFetching] = useState(false);
    const [taskList, setTaskList] = useState<ExtendedTask[]>([]);
    const [dogs, setDogs] = useState<Dog[]>([{name: 'Winter', id: '1asdkasd'},{name: 'Enter', id: 'lkajsdljaksd'}]);

    const fetchDogData = async () => {
        setIsDogDataFetching(true);
        const dogTrainingList = await http(apiRoutes.GET.trainingDogs);
        setTaskList(mapOldTypeToNewShape(dogTrainingList));
        setIsDogDataFetching(false);
    };

    // TODO: fetch dog list and save to context
    // TODO: fetch people list and save to context ???
    // TODO: fetch tasks list and save to context ???

    useEffect(() => {
        fetchDogData();
    }, []);

    const onLockToggle = (): void => {
        fetchDogData();
        setCurrentView(
            currentView === views.listing ? views.configurator : views.listing
        );
    };

    const getColorBasedOnView = (): 'primary' | 'secondary' =>
        currentView === views.listing ? 'secondary' : 'primary';

    const getIconBasedOnView = (): 'lock' | 'lock_open' =>
        currentView === views.listing ? 'lock' : 'lock_open';

    return (
        <TrainingsProvider value={{ currentView, taskList, dogs }}>
            <section className={styles.wrapper}>
                <Fab
                    color="primary"
                    aria-label="refresh"
                    onClick={fetchDogData}
                    className={
                        isDogDataFetching
                            ? styles.refreshIconRotating
                            : styles.refreshIcon
                    }
                >
                    <Icon>autorenew</Icon>
                </Fab>

                <Fab
                    color={getColorBasedOnView()}
                    aria-label="lock-unlock"
                    onClick={onLockToggle}
                    className={styles.lockIcon}
                >
                    <Icon>{getIconBasedOnView()}</Icon>
                </Fab>

                {currentView === views.listing && <Display />}

                {currentView === views.configurator && (
                    <Configurator setTaskList={setTaskList} />
                )}
            </section>
        </TrainingsProvider>
    );
};

export default App;
