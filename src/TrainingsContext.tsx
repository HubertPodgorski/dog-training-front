import React from 'react'
import {View, views} from "./consts/views";
import {ExtendedTask} from "./types";

interface TrainingsContextType {
    currentView: View,
    taskList: ExtendedTask[]
}

const TrainingsContext = React.createContext<TrainingsContextType>({currentView: views.listing, taskList: []});

export const TrainingsProvider = TrainingsContext.Provider;
export const TrainingsConsumer = TrainingsContext.Consumer;

export default TrainingsContext