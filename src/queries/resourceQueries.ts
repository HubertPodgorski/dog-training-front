import { DogEventStatus } from '../types'
import { gql } from 'apollo-boost'

export const DOGS_RESOURCE_QUERY = gql`
  query {
    dogs {
      id
      name
    }
  }
`

export const PEOPLE_RESOURCE_QUERY = gql`
  query {
    people {
      name
      id
      dogs {
        id
        name
      }
    }
    dogs {
      name
      id
    }
  }
`

export const DOG_TASKS_RESOURCE_QUERY = gql`
  query {
    dogTasks {
      id
      name
    }
  }
`

export const EVENTS_RESOURCE_QUERY = gql`
  query {
    events {
      id
      name
    }
  }
`

export const PEOPLE_TASKS_RESOURCE_QUERY = gql`
  query {
    personTasks {
      id
      name
    }
  }
`
