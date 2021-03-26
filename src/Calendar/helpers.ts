import { DogEventStatus } from '../types'

export const getDogStatus = (
  dogId: string,
  eventDogs: { dog: { id: string }; status: DogEventStatus }[],
): DogEventStatus => {
  console.log('eventDogs => ', eventDogs)
  const dogFound = eventDogs.find(({ dog }) => dog.id === dogId)

  return dogFound ? dogFound.status : 'untouched'
}
