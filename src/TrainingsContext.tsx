import React from 'react'
import {View, views} from "./consts/views";

interface TrainingsContextType {
    currentView: View
}

const TrainingsContext = React.createContext<TrainingsContextType>({currentView: views.listing});

export const TrainingsProvider = TrainingsContext.Provider;
export const TrainingsConsumer = TrainingsContext.Consumer;

export default TrainingsContext