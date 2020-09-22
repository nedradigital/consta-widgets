import { isNotNil } from '@consta/widgets-utils/lib/type-guards'

import { Column, Group } from './'

const getDefaultColumnItem = (isEmptyColumnsHidden: boolean) =>
  isEmptyColumnsHidden
    ? undefined
    : {
        total: 0,
        sections: undefined,
      }

const getTransformColumn = (
  colors: readonly string[],
  isEmptyColumnsHidden: boolean,
  filter: (value: number) => boolean
) => (column: Column, index: number) => {
  const defaultColumnItem = getDefaultColumnItem(isEmptyColumnsHidden)

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
  colors: readonly string[],
  isEmptyColumnsHidden: boolean
) => {
  const getColumns = getTransformColumn(colors, isEmptyColumnsHidden, v => v >= 0)
  const getReversedColumns = getTransformColumn(colors, isEmptyColumnsHidden, v => v < 0)

  return groups.map(({ groupName, values }) => {
    const columns = values.map(getColumns)
    const reversedColumns = values.map(getReversedColumns)

    return {
      name: groupName,
      columns: isEmptyColumnsHidden ? columns.filter(Boolean) : columns,
      reversedColumns: isEmptyColumnsHidden ? reversedColumns.filter(Boolean) : reversedColumns,
    }
  })
}
