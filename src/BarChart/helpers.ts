import { isNotNil } from '@csssr/gpn-utils/lib/type-guards'

import { Column, Group } from './'

const defaultColumnItem = {
  total: 0,
  sections: undefined,
}

const getTransformColumn = (colors: readonly string[], filter: (value: number) => boolean) => (
  column: Column,
  index: number
) => {
  if (!isNotNil(column)) {
    return defaultColumnItem
  }

  return filter(column)
    ? {
        total: column,
        sections: [{ color: colors[index], value: column }],
      }
    : defaultColumnItem
}

export const transformGroupsToCommonGroups = (
  groups: readonly Group[],
  colors: readonly string[]
) => {
  const getColumns = getTransformColumn(colors, v => v >= 0)
  const getReversedColumns = getTransformColumn(colors, v => v < 0)

  return groups.map(group => {
    return {
      name: group.groupName,
      columns: group.values.map(getColumns),
      reversedColumns: group.values.map(getReversedColumns),
    }
  })
}
