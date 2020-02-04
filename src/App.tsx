import React, { useState } from 'react';
import styles from './App.module.scss';
import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';
import '@atlaskit/css-reset';
import DogTrainingListWrapper from './wrappers/DogTrainingListWrapper/DogTrainingListWrapper';
import { TrainingsProvider } from './TrainingsContext';
import DogTrainingConfiguratorWrapper from './wrappers/DogTrainingConfiguratorWrapper/DogTrainingConfiguratorWrapper';
import { View, views } from './consts/views';

const App = () => {
    const [currentView, setCurrentView] = useState<View>('LISTING');

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
        <TrainingsProvider value={{currentView}}>
            <section className={styles['app-wrapper']}>
                <Fab
                    color={getColorBasedOnView()}
                    aria-label="lock-unlock"
                    onClick={onLockToggle}
                    className={styles['app-wrapper__lock-icon']}
                >
                    <Icon>{getIconBasedOnView()}</Icon>
                </Fab>

                {currentView === views.listing && <DogTrainingListWrapper />}

                {currentView === views.configurator && (
                    <DogTrainingConfiguratorWrapper />
                )}
            </section>
        </TrainingsProvider>
    );
};

export default App;
