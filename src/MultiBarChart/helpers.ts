import { isDefined, isNotNil } from '@consta/widgets-utils/lib/type-guards'
import _ from 'lodash'

import { Column, Group } from './'

const defaultColumnItem = {
  total: 0,
  sections: undefined,
}

const getTransformColumn = ({
  skipEmptyColumns,
  filter,
}: {
  skipEmptyColumns?: boolean
  filter: (value: number) => boolean
}) => (column: Column | undefined | null) => {
  if (!isNotNil(column)) {
    return skipEmptyColumns ? undefined : defaultColumnItem
  }

  const total = _.sum(column.map(item => item.value))
  const sections = column
    .map(({ value, color }) => {
      if (!isNotNil(value) || !filter(value)) {
        return
      }

      return {
        color,
        value,
      }
    })
    .filter(isDefined)

  return sections.length > 0
    ? {
        total,
        sections,
      }
    : defaultColumnItem
}

export const transformGroupsToCommonGroups = ({
  groups,
  skipEmptyColumns,
  skipEmptyGroups,
}: {
  groups: ReadonlyArray<Group | undefined | null>
  skipEmptyColumns?: boolean
  skipEmptyGroups?: boolean
}) => {
  const getColumns = getTransformColumn({ skipEmptyColumns, filter: v => v >= 0 })
  const getReversedColumns = getTransformColumn({ skipEmptyColumns, filter: v => v < 0 })

  const result = groups.filter(isNotNil).map(group => {
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
