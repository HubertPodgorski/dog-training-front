import { Dog, ExtendedTask, PersonAndPersonTaskPair, SelectOption } from '../types'
import _cloneDeep from 'lodash/cloneDeep'
import { DogTraining } from '../types'

export const isPersonAlreadyInTheList = (
  personUuid: string,
  currentPeopleTasks: PersonAndPersonTaskPair[],
): boolean => {
  return currentPeopleTasks.some((personTask: PersonAndPersonTaskPair): boolean =>
    personTask.personId ? personTask.personId === personUuid : false,
  )
}

export const canAddNewTaskPair = (peopleTaskPairs: PersonAndPersonTaskPair[]): boolean =>
  peopleTaskPairs.every((peopleTaskPair: PersonAndPersonTaskPair): boolean => {
    const { uuid, personId, personName, taskName, taskId } = peopleTaskPair

    return Boolean(uuid && personId && taskId && personName && taskName)
  })

export const getOrderList = (taskList: ExtendedTask[]): number[] => {
  let orderList: number[] = []

  const highestOrder = taskList.reduce((order, { order: taskOrder }) => {
    if (taskOrder > order) {
      return taskOrder
    }

    return order
  }, 1)

  for (let i = 1; i <= highestOrder + 1; i++) {
    orderList = [...orderList, i]
  }

  return orderList
}

export const getUpdatedOrderList = (
  currentList: ExtendedTask[],
  changedItemId: string,
  prevPositionIndex: number,
  nextPositionIndex: number,
): ExtendedTask[] => {
  const newList = _cloneDeep(currentList)

  const itemChanged = newList.find((task: ExtendedTask): boolean => task.id === changedItemId)

  if (!itemChanged) {
    return newList
  }

  newList.splice(prevPositionIndex, 1)
  newList.splice(nextPositionIndex, 0, itemChanged)

  return newList.map(
    (task: ExtendedTask, index: number): ExtendedTask => ({
      ...task,
      order: index,
    }),
  )
}

export const getListOfIdsInUpdatedOrder = (
  dogTrainingList: DogTraining[],
): { id: string; order: number }[] =>
  dogTrainingList.reduce(
    (currentList: { id: string; order: number }[], dogInTraining: DogTraining) => [
      ...currentList,
      {
        id: dogInTraining.id,
        order: dogInTraining.order,
      },
    ],
    [],
  )

export const getDogNamesByOrder = (taskList: ExtendedTask[], orderToFind: number): string => {
  const tasks = taskList.filter(({ order }) => order === orderToFind)

  if (!tasks.length) {
    return '=> Brak psów'
  }

  const dogNames = tasks.flatMap(({ dogs }) => dogs.flatMap(({ name }) => name))

  return ` => ${dogNames.join(' // ')}`
}

export const mapDogsToSelectShape = (dogs: Dog[]): SelectOption[] =>
  dogs.map(({ name, id }) => ({ name, id }))
