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
    // TODO: check if correct type
    id: string
}

export interface PersonTask {
    // TODO: check if needed
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
