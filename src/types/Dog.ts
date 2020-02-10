import { PersonTask } from '../types';

export interface DogTraining {
    id: string;
    dogName: string;
    trainingDescription: string;
    order: number;
    dogTasks: string[];
    peopleTasks: PersonTask[];
    isDisabled: boolean;
}
