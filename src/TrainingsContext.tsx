import React from 'react';
import { View, views } from './consts/views';
import {Dog, ExtendedTask} from './types';

interface TrainingsContextType {
    currentView: View;
    taskList: ExtendedTask[];
    dogs: Dog[]
}

const TrainingsContext = React.createContext<TrainingsContextType>({
    currentView: views.listing,
    taskList: [],
    dogs: [
        { name: 'Winter', id: '1asdkasd' },
        { name: 'Enter', id: 'lkajsdljaksd' }
    ]
});

export const TrainingsProvider = TrainingsContext.Provider;
export const TrainingsConsumer = TrainingsContext.Consumer;

export default TrainingsContext;
