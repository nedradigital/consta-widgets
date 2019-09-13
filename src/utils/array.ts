import { getRandomInt } from './number'

export function stringArrayToObjectMap<T extends string>(arr: ReadonlyArray<T>) {
  return arr.reduce(
    (map, item) => ({
      ...map,
      [item]: item,
    }),
    {}
  )
}

export const createArrayOfIndexes = (length: number): number[] =>
  new Array(length).fill(0).map((_, index) => index)

export const getArrayWithRandomInt = (min: number, max: number, length: number) =>
  [...new Array(length)].map(() => getRandomInt(min, max))

export const move = <T>(array: T[], moveIndex: number, toIndex: number): T[] => {
  const itemRemovedArray = [
    ...array.slice(0, moveIndex),
    ...array.slice(moveIndex + 1, array.length),
  ]
  return [
    ...itemRemovedArray.slice(0, toIndex),
    array[moveIndex],
    ...itemRemovedArray.slice(toIndex, itemRemovedArray.length),
  ]
}
