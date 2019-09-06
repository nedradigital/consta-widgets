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
