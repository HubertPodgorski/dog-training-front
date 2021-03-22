export interface ExtendedTask {
    dogs: Dog[];
    peopleTasks: PersonTask[];
    description: string;
    id: string;
    order: number;
    tasks: DogTask[];
    column: Column;
}

export type Column = 'left' | 'right';

export interface Dog {
    name: string;
    id: string;
}

export interface PersonTask {
    id: string
    uuid: string;
    taskName: string;
    taskId: string;
    personId: string;
    personName: string;
}

export interface SelectOption {
    id: string;
    name: string;
}

export interface Person {
    name: string;
    id: string;
    dogs: Dog[]
}

export type DogEventStatus = 'untouched' | 'present' | 'notPresent'

export interface Event {
    name: string;
    id: string;
    dogs: { dog: Dog, status: DogEventStatus }[]
}

export interface DogTask {
    name: string;
    id: string;
}

export interface DogTraining {
    id: string;
    dogName: string;
    trainingDescription: string;
    order: number;
    dogTasks: string[];
    peopleTasks: PersonTask[];
    isDisabled: boolean;
}
