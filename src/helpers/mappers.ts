import {DogTraining} from "../types/Dog";
import {ExtendedTask} from "../types";

export const mapOldTypeToNewShape = (oldData: DogTraining[]): ExtendedTask[] => oldData.map((oldTask) => ({
    // TODO: is it task id or dog it?
    id: oldTask.id,
    dogs: [{name: oldTask.dogName, id: oldTask.id}],
    description: oldTask.trainingDescription,
    peopleTasks: oldTask.peopleTasks,
    order: oldTask.order,
    tasks: oldTask.dogTasks
}));