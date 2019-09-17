import { concat } from 'lodash'

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

export const createArrayOfIndexes = (length: number): readonly number[] =>
  new Array(length).fill(0).map((_, index) => index)

export const getArrayWithRandomInt = (min: number, max: number, length: number) =>
  [...new Array(length)].map(() => getRandomInt(min, max))

export const move = <T>(array: readonly T[], moveIndex: number, toIndex: number): readonly T[] => {
  const itemRemovedArray = concat(
    array.slice(0, moveIndex),
    array.slice(moveIndex + 1, array.length)
  )
  return [
    ...itemRemovedArray.slice(0, toIndex),
    array[moveIndex],
    ...itemRemovedArray.slice(toIndex, itemRemovedArray.length),
  ]
}

export const updateAt = <T>(array: readonly T[], index: number, newItem: T): readonly T[] => {
  return index >= array.length
    ? array
    : [...array.slice(0, index), newItem, ...array.slice(index + 1, array.length)]
}

export const removeAt = <T>(array: readonly T[], index: number): readonly T[] => {
  return [...array.slice(0, index), ...array.slice(index + 1, array.length)]
}
