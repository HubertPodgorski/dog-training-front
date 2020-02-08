export interface ExtendedTask {
    dogs: Dog[],
    peopleTasks: PersonTask[]
    description: string
    id: string
    order: number
    tasks: string[]
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
    label: string;
}
