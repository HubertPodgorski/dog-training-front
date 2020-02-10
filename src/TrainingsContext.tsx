import React from 'react';
import { View, views } from './consts/views';
import { Dog, ExtendedTask, Person, DogTask } from './types';

interface TrainingsContextType {
    currentView: View;
    taskList: ExtendedTask[];
    dogs: Dog[];
    people: Person[];
    peopleTasks: { name: string; id: string }[];
    dogTasks: DogTask[];
}

const TrainingsContext = React.createContext<TrainingsContextType>({
    currentView: views.listing,
    taskList: [],
    dogs: [],
    people: [],
    peopleTasks: [],
    dogTasks: []
});

export const TrainingsProvider = TrainingsContext.Provider;
export const TrainingsConsumer = TrainingsContext.Consumer;

export default TrainingsContext;
