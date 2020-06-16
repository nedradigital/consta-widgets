import { isDefined } from '@csssr/gpn-utils/lib/type-guards'
import _ from 'lodash'

import { Column, Group } from './'

const getTransformColumn = (
  colorGroups: Record<string, string>,
  filter: (value: number) => boolean
) => (column: Column) => {
  const total = _.sum(Object.values(column))
  const sections = Object.entries(column)
    .map(([key, value]) => {
      if (value === undefined || !filter(value)) {
        return
      }

      return {
        color: colorGroups[key],
        value,
      }
    })
    .filter(isDefined)

  return sections.length > 0
    ? {
        total,
        sections,
      }
    : undefined
}

export const transformGroupsToCommonGroups = (
  groups: readonly Group[],
  colorGroups: Record<string, string>
) => {
  const getColumns = getTransformColumn(colorGroups, v => v >= 0)
  const getReversedColumns = getTransformColumn(colorGroups, v => v < 0)

  return groups.map(group => {
    const total = _.sum(group.values.flatMap(column => Object.values(column)))
    const columns = group.values.map(getColumns)
    const reversedColumns = group.values.map(getReversedColumns)

    return {
      name: group.groupName,
      total,
      columns,
      reversedColumns,
    }
  })
}
