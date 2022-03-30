export interface ExtendedTask {
  dogs: Dog[]
  peopleTasks: PersonAndPersonTaskPair[]
  description: string
  id: string
  order: number
  tasks: DogTask[]
  column: Column
  index: number
  updatedAt?: string
}

export type Column = 'left' | 'right'

export interface Dog {
  name: string
  id: string
}

export interface PersonAndPersonTaskPair {
  id: string
  uuid: string
  taskName: string
  taskId: string
  personId: string
  personName: string
}

export interface Statistic {
  id: string
  startMeter?: string
  fullRunTime?: string
  recallTime?: string
  tapTime?: string
  runAt?: string
  eventId?: string
  dogId?: string
}

export interface PersonTask {
  id: string
  name: string
}

export interface SelectOption {
  id: string
  name: string
}

export interface Person {
  name: string
  id: string
  dogs: Dog[]
}

export type DogEventStatus = 'untouched' | 'present' | 'notPresent'

export interface Event {
  name: string
  id: string
  dogs: { dog: Dog; status: DogEventStatus }[]
}

export interface DogTask {
  name: string
  id: string
}

export interface DogTraining {
  id: string
  dogName: string
  trainingDescription: string
  order: number
  dogTasks: string[]
  peopleTasks: PersonAndPersonTaskPair[]
  isDisabled: boolean
}

export interface Action {
  type: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any
}
