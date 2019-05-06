import { TaskPair } from '../services/TasksService';

export interface DogTraining {
    id: string;
    dogName: string;
    trainingDescription: string;
    order: number;
    dogTasks: string[];
    peopleTasks: TaskPair[];
}
