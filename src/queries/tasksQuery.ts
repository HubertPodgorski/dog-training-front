import { gql } from 'apollo-boost'
import { ExtendedTask } from '../types'

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
