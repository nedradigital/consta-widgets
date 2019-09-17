function getEnumValues(e: any): ReadonlyArray<number | string> {
  return Object.keys(e).map(k => e[k])
}

export function enumToStringArray(e: any) {
  return getEnumValues(e).filter(v => typeof v === 'string') as readonly string[]
}

export function enumToStringMap(e: any) {
  return enumToStringArray(e).reduce(
    (acc, v) => ({
      ...acc,
      [v]: e[v],
    }),
    {}
  )
}
