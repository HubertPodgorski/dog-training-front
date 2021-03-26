import { gql } from 'apollo-boost'

const CALENDAR_ALL_EVENTS_QUERY = gql`
  query {
    events {
      name
      dogs {
        dog {
          name
        }
        status
      }
    }
  }
`

export default CALENDAR_ALL_EVENTS_QUERY
