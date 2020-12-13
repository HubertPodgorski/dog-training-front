import React, { useState } from 'react';
import styles from './App.module.scss';
import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';
import '@atlaskit/css-reset';
import { TrainingsProvider } from './TrainingsContext';
import Configurator from './components/Configurator/Configurator';
import { View, views } from './consts/views';
import { http, httpMethods } from './helpers/http';
import { apiRoutes } from './consts/apiRoutes';
import { Dog, DogTask, ExtendedTask, Person } from './types';
import useAsyncEffect from './hooks/useAsyncEffect';
import MainList from "./MainList/MainList";

const App = () => {
    const [currentView, setCurrentView] = useState<View>('LISTING');
    const [isDataFetching, setIsDataFetching] = useState(false);
    const [taskList, setTaskList] = useState<ExtendedTask[]>([]);
    const [dogs, setDogs] = useState<Dog[]>([]);
    const [people, setPeople] = useState<Person[]>([]);
    // TODO: make type for that and reuse
    const [peopleTasks, setPeopleTasks] = useState<
        { name: string; id: string }[]
    >([]);
    const [dogTasks, setDogTasks] = useState<DogTask[]>([]);

    const fetchTaskList = async () => {
        setIsDataFetching(true);
        const fetchedTaskList = await http(apiRoutes.GET.tasks);
        setTaskList(fetchedTaskList);
        setIsDataFetching(false);
    };

    // TODO: install axios

    const fetchResourceData = async () => {
        setIsDataFetching(true);

        const fetchedResourceData = await http(apiRoutes.GET.allResources);

        setDogs(fetchedResourceData.dogs);
        setPeople(fetchedResourceData.people);
        setPeopleTasks(fetchedResourceData.peopleTasks);
        setDogTasks(fetchedResourceData.dogTasks);

        setIsDataFetching(false);
    };

    useAsyncEffect(async () => {
        await fetchTaskList();

        await fetchResourceData();
    }, []);

    const onLockToggle = async () => {
        await fetchTaskList();

        setCurrentView(
            currentView === views.listing ? views.configurator : views.listing
        );
    };

    const addTask = async () => {
        setIsDataFetching(true);

        await http(apiRoutes.POST.addTask, httpMethods.POST, {
            dogs: [],
            description: '',
            order: taskList.length + 1,
            tasks: [],
            peopleTasks: []
        });

        await fetchTaskList();
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
                <div className={styles.buttons}>
                    <Fab
                        color="primary"
                        aria-label="refresh"
                        onClick={fetchTaskList}
                        className={
                            isDataFetching
                                ? styles.refreshIconRotating
                                : styles.refreshIcon
                        }
                    >
                        <Icon>autorenew</Icon>
                    </Fab>

                    {currentView === views.configurator && (
                        <Fab
                            color="primary"
                            aria-label="add"
                            onClick={addTask}
                            className={styles.addNewIcon}
                        >
                            <Icon>add</Icon>
                        </Fab>
                    )}

                    <Fab
                        color={getColorBasedOnView()}
                        aria-label="lock-unlock"
                        onClick={onLockToggle}
                        className={styles.lockIcon}
                    >
                        <Icon>{getIconBasedOnView()}</Icon>
                    </Fab>
                </div>

                {currentView === views.listing && <MainList />}
                {currentView === views.configurator && (
                    <Configurator
                        setTaskList={setTaskList}
                        fetchTaskList={fetchTaskList}
                    />
                )}
            </section>
        </TrainingsProvider>
    );
};

export default App;
