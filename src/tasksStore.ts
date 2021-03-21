import { Dog, DogTask, ExtendedTask, Person } from './types';

const SET_DOGS = '@@tasks_store_SET_DOGS'
const SET_TASK_LIST = '@@tasks_store_SET_TASK_LIST'
const SET_PEOPLE = '@@tasks_store_SET_PEOPLE'
const SET_PEOPLE_TASKS = '@@tasks_store_SET_PEOPLE_TASKS'
const SET_DOG_TASKS = '@@tasks_store_SET_DOG_TASKS'
const SET_IS_DATA_FETCHING = '@@tasks_store_SET_IS_DATA_FETCHING'

export interface TasksStore {
    dogs: Dog[]
    taskList: ExtendedTask[]
    people: Person[]
    peopleTasks: { name: string; id: string }[]
    dogTasks: DogTask[]
    isDataFetching: boolean
}

const initialState: TasksStore = {
    dogs: [],
    taskList: [],
    people: [],
    peopleTasks: [],
    dogTasks: [],
    isDataFetching: false
};

const store = (state = initialState, action: {type: string, payload: any}) =>  {
    switch (action.type) {
        case SET_DOGS: {
            return {
                ...state,
                dogs: action.payload
            }
        }

        case SET_DOG_TASKS: {
            return {
                ...state,
                dogTasks: action.payload
            }
        }
        case SET_IS_DATA_FETCHING: {
            return {
                ...state,
                isDataFetching: action.payload
            }
        }
        case SET_PEOPLE_TASKS: {
            return {
                ...state,
                peopleTasks: action.payload
            }
        }
        case SET_PEOPLE: {
            return {
                ...state,
                people: action.payload
            }
        }
        case SET_TASK_LIST: {
            return {
                ...state,
                taskList: action.payload
            }
        }

        default:
            return state;
    }
}

export default store


export const setDogs = (dogs: Dog[]) => ({type: SET_DOGS, payload: dogs})

export const setTaskList = (taskList: ExtendedTask[]) => ({type: SET_TASK_LIST, payload: taskList})

export const setPeople = (people: Person[]) => ({type: SET_PEOPLE, payload: people})

export const setPeopleTasks = (peopleTasks: { name: string; id: string }[]) => ({type: SET_PEOPLE_TASKS, payload: peopleTasks})

export const setDogTasks = (dogTasks: DogTask[]) => ({type: SET_DOG_TASKS, payload: dogTasks})

export const setIsDataFetching = (isDataFetching: boolean) => ({type: SET_IS_DATA_FETCHING, payload: isDataFetching})