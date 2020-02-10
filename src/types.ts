export interface ExtendedTask {
    dogs: Dog[],
    peopleTasks: PersonTask[]
    description: string
    id: string
    order: number
    tasks: DogTask[]
}

export interface Dog {
    name: string,
    id: string
}

export interface PersonTask {
    uuid: string
    taskName: string
    taskId: string
    personId: string
    personName: string
}

export interface SelectOption {
    id: string;
    name: string;
}

export interface Person {
    name: string,
    id: string
}

export interface DogTask {
    name: string,
    id: string
}
