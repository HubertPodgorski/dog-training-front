import React from 'react';
import { Dog, ExtendedTask, Person, DogTask } from './types';

interface TrainingsContextType {
    dataFetching: boolean
    taskList: ExtendedTask[];
    dogs: Dog[];
    people: Person[];
    peopleTasks: { name: string; id: string }[];
    dogTasks: DogTask[];
    fetchTaskList: () => Promise<void>,
    setTaskList: (taskList: ExtendedTask[]) => void,
    setDogs: (dogs: Dog[]) => void,
    setPeople: (people: Person[]) => void,
    setPeopleTasks: (peopleTasks: { name: string; id: string }[]) => void,
    addNewTask: () => Promise<void>
}

const TrainingsContext = React.createContext<TrainingsContextType>({
    dataFetching: true,
    taskList: [],
    dogs: [],
    people: [],
    peopleTasks: [],
    dogTasks: [],
    fetchTaskList: () => new Promise(() => {}),
    setTaskList: (taskList: ExtendedTask[]) => {},
    setDogs: (dogs: Dog[]) => {},
    setPeople: (people: Person[]) => {},
    setPeopleTasks: (peopleTasks: { name: string; id: string }[]) => {},
    addNewTask: ()  => new Promise(() => {})
});

export const TrainingsProvider = TrainingsContext.Provider;
export const TrainingsConsumer = TrainingsContext.Consumer;

export default TrainingsContext;
