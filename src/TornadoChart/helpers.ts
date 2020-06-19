import { isDefined } from '@csssr/gpn-utils/lib/type-guards'
import _ from 'lodash'

import { FormatValue } from '@/common/types'
import { ShowPositions } from '@/BarChartAxis'

import { Column, Group, XAxisShowPosition, YAxisShowPosition } from './'

export const getFormatter = (formatter?: FormatValue): FormatValue => value => {
  const positiveValue = Math.abs(value)

  return formatter ? formatter(positiveValue) : String(positiveValue)
}

export const getAxisShowPositions = (x: XAxisShowPosition, y: YAxisShowPosition): ShowPositions => {
  return {
    left: y === 'left' || y === 'both',
    right: y === 'right' || y === 'both',
    top: x === 'top' || x === 'both',
    bottom: x === 'bottom' || x === 'both',
  }
}

const getTransformColumn = (
  colorGroups: Record<string, string>,
  filter: (index: number) => boolean
) => (column: Column, columnIdx: number) => {
  const total = _.sum(Object.values(column))
  const sections = Object.entries(column)
    .map(([key, value]) => {
      if (value === undefined) {
        return
      }

      return {
        color: colorGroups[key],
        value,
      }
    })
    .filter(isDefined)

  return filter(columnIdx)
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
  const getColumns = getTransformColumn(colorGroups, i => i % 2 !== 0)
  const getReversedColumns = getTransformColumn(colorGroups, i => i % 2 === 0)

  return _.orderBy(
    groups.map(group => {
      const total = _.sum(group.values.flatMap(column => Object.values(column)))
      const columns = group.values.map(getColumns).filter(isDefined)
      const reversedColumns = group.values.map(getReversedColumns).filter(isDefined)

      return {
        name: group.groupName,
        total,
        columns,
        reversedColumns,
      }
    }),
    g => g.total,
    'desc'
  )
}
