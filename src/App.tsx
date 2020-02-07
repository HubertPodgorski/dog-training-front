import React, { useEffect, useState } from 'react';
import styles from './App.module.scss';
import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';
import '@atlaskit/css-reset';
import Display from './wrappers/Display/Display';
import { TrainingsProvider } from './TrainingsContext';
import Configure from './wrappers/Configure/Configure';
import { View, views } from './consts/views';
import { http } from './helpers/http';
import { apiRoutes } from './consts/apiRoutes';
import { DogTraining } from './types/Dog';

const App = () => {
    const [currentView, setCurrentView] = useState<View>('LISTING');
    const [isDogDataFetching, setIsDogDataFetching] = useState(false);
    // TODO: set it in context
    const [dogTrainingList, setDogTrainingList] = useState<DogTraining[]>([]);

    const fetchDogData = (): void => {
        setIsDogDataFetching(true);
        http(apiRoutes.GET.trainingDogs).then((dogTrainingList: any) => {
            setDogTrainingList(dogTrainingList);
            setIsDogDataFetching(false);
        });
    };

    useEffect(() => fetchDogData(), []);

    const onLockToggle = (): void => {
        setCurrentView(
            currentView === views.listing ? views.configurator : views.listing
        );
    };

    const getColorBasedOnView = (): 'primary' | 'secondary' =>
        currentView === views.listing ? 'secondary' : 'primary';

    const getIconBasedOnView = (): 'lock' | 'lock_open' =>
        currentView === views.listing ? 'lock' : 'lock_open';

    return (
        <TrainingsProvider value={{ currentView }}>
            <section className={styles.wrapper}>
                <Fab
                    color="primary"
                    aria-label="refresh"
                    onClick={fetchDogData}
                    className={isDogDataFetching ? styles.refreshIconRotating : styles.refreshIcon}
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

                {currentView === views.listing && (
                    <Display dogTrainingList={dogTrainingList} />
                )}

                {currentView === views.configurator && (
                    <Configure
                        dogTrainingList={dogTrainingList}
                        setDogTrainingList={setDogTrainingList}
                    />
                )}
            </section>
        </TrainingsProvider>
    );
};

export default App;
