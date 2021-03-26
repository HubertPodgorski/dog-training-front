import { DogEventStatus } from '../types'

export const getDogStatus = (
  dogId: string,
  eventDogs: { dog: { id: string }; status: DogEventStatus }[],
): DogEventStatus => {
  const dogFound = eventDogs.find(
    (dogWithStatus) => !!dogWithStatus && dogWithStatus.dog.id === dogId,
  )

  return dogFound ? dogFound.status : 'untouched'
}
