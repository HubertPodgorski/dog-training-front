import { DogEventStatus } from '../types'
import { isBefore } from 'date-fns'
import { Event } from '../queries/calendarQueries'

export const getDogStatus = (
  dogId: string,
  eventDogs: { dog: { id: string }; status: DogEventStatus }[],
): DogEventStatus => {
  const dogFound =
    eventDogs &&
    eventDogs.find(
      (dogWithStatus) => !!dogWithStatus && !!dogWithStatus.dog && dogWithStatus.dog.id === dogId,
    )

  return dogFound ? dogFound.status : 'untouched'
}

export const sortByDateDesc = (eventA: Event, eventB: Event) => {
  const dateBefore = isBefore(new Date(eventA.date), new Date(eventB.date))

  if (dateBefore) {
    return -1
  }

  return 1
}
