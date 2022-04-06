import { gql } from 'apollo-boost'
import { Dog, DogEventStatus } from '../types'

export type Event = {
  id: string
  name: string
  time: string
  date: string
  dogs: { status: DogEventStatus; dog: { id: string } }[]
}

export type CalendarAllEventsQuery = {
  events: Event[]
  people: { dogs: { id: string; name: string }[] }[]
}

export const CALENDAR_ALL_EVENTS_QUERY = gql`
  query {
    events {
      id
      name
      time
      date
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

export type PersonEvent = {
  id: string
  name: string
  time: string
  date: string
  dogs: { status: DogEventStatus; dog: { id: string; name: string } }[]
}

export type CalendarPersonEventsQuery = {
  events: PersonEvent[]
  person: { dogs: Dog[] }
}

export const CALENDAR_PERSON_EVENT_DOGS = gql`
  query ($personId: ID!) {
    events {
      id
      name
      time
      date
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
