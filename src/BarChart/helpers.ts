import { isNotNil } from '@consta/widgets-utils/lib/type-guards'

import { Column, Group } from './'

const defaultColumnItem = {
  total: 0,
  sections: undefined,
}

const getTransformColumn = ({
  colors,
  skipEmptyColumns,
  filter,
}: {
  colors: readonly string[]
  skipEmptyColumns?: boolean
  filter: (value: number) => boolean
}) => (column: Column, index: number) => {
  if (!isNotNil(column)) {
    return skipEmptyColumns ? undefined : defaultColumnItem
  }

  return filter(column)
    ? {
        total: column,
        sections: [{ color: colors[index], value: column }],
      }
    : defaultColumnItem
}

export const transformGroupsToCommonGroups = ({
  colors,
  groups,
  skipEmptyColumns,
  skipEmptyGroups,
}: {
  groups: readonly Group[]
  colors: readonly string[]
  skipEmptyColumns?: boolean
  skipEmptyGroups?: boolean
}) => {
  const getColumns = getTransformColumn({
    colors,
    skipEmptyColumns,
    filter: v => v >= 0,
  })
  const getReversedColumns = getTransformColumn({
    colors,
    skipEmptyColumns,
    filter: v => v < 0,
  })

  const result = groups.map(group => {
    const columns = group.values.map(getColumns)
    const reversedColumns = group.values.map(getReversedColumns)

    return {
      name: group.groupName,
      columns: skipEmptyColumns ? columns.filter(Boolean) : columns,
      reversedColumns: skipEmptyColumns ? reversedColumns.filter(Boolean) : reversedColumns,
    }
  })

  return skipEmptyGroups
    ? result.filter(group => group.columns.length && group.reversedColumns.length)
    : result
}
