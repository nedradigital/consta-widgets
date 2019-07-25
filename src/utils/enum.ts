function getEnumValues(e: any): Array<number | string> {
  return Object.keys(e).map(k => e[k]);
}

export function enumToStringArray(e: any) {
  return getEnumValues(e).filter(v => typeof v === 'string') as string[];
}

export function enumToStringMap(e: any) {
  return enumToStringArray(e).reduce(
    (acc, v) => ({
      ...acc,
      [v]: e[v],
    }),
    {}
  );
}
