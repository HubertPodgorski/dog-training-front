import { gql } from 'apollo-boost'
import { Dog, DogEventStatus } from '../types'

export type CalendarAllEventsQuery = {
  events: {
    id: string
    name: string
    dogs: { status: DogEventStatus; dog: { id: string } }[]
  }[]
  people: { dogs: { id: string; name: string }[] }[]
}

export const CALENDAR_ALL_EVENTS_QUERY = gql`
  query {
    events {
      id
      name
      dogs {
        status
        dog {
          id
        }
      }
    }
    people {
      dogs {
        id
        name
      }
    }
  }
`

export type CalendarPersonEventsQuery = {
  events: {
    id: string
    name: string
    dogs: { status: DogEventStatus; dog: { id: string; name: string } }[]
  }[]
  person: { dogs: Dog[] }
}

export const CALENDAR_PERSON_EVENT_DOGS = gql`
  query($personId: ID!) {
    events {
      id
      name
      dogs {
        status
        dog {
          id
          name
        }
      }
    }
    person(id: $personId) {
      dogs {
        id
        name
      }
    }
  }
`
