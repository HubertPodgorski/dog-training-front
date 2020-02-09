import React, { useState } from 'react';
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
import { Dog, DogTask, ExtendedTask, Person, PersonTask } from './types';
import useAsyncEffect from './hooks/useAsyncEffect';

const App = () => {
    const [currentView, setCurrentView] = useState<View>('LISTING');
    const [isDogDataFetching, setIsDogDataFetching] = useState(false);
    const [taskList, setTaskList] = useState<ExtendedTask[]>([]);
    const [dogs, setDogs] = useState<Dog[]>([]);
    const [people, setPeople] = useState<Person[]>([]);
    const [peopleTasks, setPeopleTasks] = useState<PersonTask[]>([]);
    const [dogTasks, setDogTasks] = useState<DogTask[]>([]);

    const fetchDogData = async () => {
        setIsDogDataFetching(true);
        const fetchedTaskList = await http(apiRoutes.GET.tasks);
        setTaskList(fetchedTaskList);
        setIsDogDataFetching(false);
    };

    // TODO: install axios

    const fetchResourceData = async () => {
        setIsDogDataFetching(true);

        const fetchedResourceData = await http(apiRoutes.GET.allResources);

        setDogs(fetchedResourceData.dogs);
        setPeople(fetchedResourceData.people);
        setPeopleTasks(fetchedResourceData.peopleTasks);
        setDogTasks(fetchedResourceData.dogTasks);

        setIsDogDataFetching(false);
    };

    useAsyncEffect(async () => {
        await fetchDogData();

        await fetchResourceData();
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
        <TrainingsProvider
            value={{
                currentView,
                taskList,
                dogs,
                people,
                peopleTasks,
                dogTasks
            }}
        >
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
