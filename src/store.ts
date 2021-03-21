import { createStore } from "redux";
import { combineReducers } from "redux";
import tasksStore, { TasksStore } from './tasksStore';

export interface StoreInterface {
    tasksStore: TasksStore
}

const rootReducer = combineReducers({ tasksStore })

export default createStore(rootReducer);
