export function stringArrayToObjectMap<T extends string>(arr: ReadonlyArray<T>) {
  return arr.reduce(
    (map, item) => ({
      ...map,
      [item]: item,
    }),
    {}
  )
}
