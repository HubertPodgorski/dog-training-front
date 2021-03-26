import { gql } from 'apollo-boost'
import { ExtendedTask, Dog, PersonTask, DogTask, Column } from '../types'

type Task = Pick<ExtendedTask, 'description' | 'id' | 'column' | 'order'> & {
  dogs: Dog[]
}

export type MainListTasksQuery = {
  tasks: ExtendedTask[]
}

export const MAIN_LIST_TASKS_QUERY = gql`
  query {
    tasks {
      id
      description
      column
      order
      dogs {
        id
        name
      }
      peopleTasks {
        id
        uuid
        taskName
        taskId
        personId
        personName
      }
      tasks {
        name
        id
      }
    }
  }
`
