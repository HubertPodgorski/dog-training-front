import React, { useState } from 'react';
import styles from './App.module.scss';
import '@atlaskit/css-reset';
import { TrainingsProvider } from './TrainingsContext';
import { http, httpMethods } from './helpers/http';
import { apiRoutes } from './helpers/apiRoutes';
import { Dog, DogTask, ExtendedTask, Person } from './types';
import useAsyncEffect from './hooks/useAsyncEffect';
import Router from './Router';

const App = () => {
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

    const addTask = async () => {
        setIsDataFetching(true);

        await http(apiRoutes.POST.addTask, httpMethods.POST, {
            dogs: [],
            description: '',
            order: taskList.length + 1,
            tasks: [],
            peopleTasks: [],
        });

        await fetchTaskList();
    };

    return (
        <TrainingsProvider
            value={{
                dataFetching: isDataFetching,
                taskList,
                dogs,
                people,
                peopleTasks,
                dogTasks,
                fetchTaskList: () => fetchTaskList(),
                setTaskList: (taskList: ExtendedTask[]) =>
                    setTaskList(taskList),
                setDogs: (dogs: Dog[]) => setDogs(dogs),
                setPeople: (people: Person[]) => setPeople(people),
                setPeopleTasks: (peopleTasks: { name: string; id: string }[]) =>
                    setPeopleTasks(peopleTasks),
                addNewTask: () => addTask(),
                fetchResourceData: () => fetchResourceData(),
            }}
        >
            <section className={styles.wrapper}>
                <Router />
            </section>
        </TrainingsProvider>
    );
};

export default App;
