import { gql } from 'apollo-boost'

const TASKS_QUERY = gql`
  query {
    tasks {
      description
      column
      order
      dogs {
        name
      }
    }
  }
`

export default TASKS_QUERY
