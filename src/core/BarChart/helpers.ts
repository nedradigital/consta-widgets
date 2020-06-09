import { isDefined } from '@csssr/gpn-utils/lib/type-guards'
import { flattenDeep, sum } from 'lodash'

import { getEveryN } from '@/common/utils/array'
import { NumberRange, Scaler } from '@/common/utils/scale'
import { ShowPositions } from '@/BarChartAxis'
import { Size as TickSize } from '@/Ticks'

import { Column, Group, Groups } from './'
import { ColumnDetail } from './components/Bar'

export const barCharSizes = ['s', 'm', 'l', 'xl', 'xxl', 'auto'] as const
export type Size = typeof barCharSizes[number]
export type ColumnSize = Exclude<Size, 'auto'>

type DataColumns = ReadonlyArray<{
  groupName: string
  columnDetails: ReadonlyArray<readonly ColumnDetail[]>
}>

export type GetGroupSize = (params: {
  columnPadding: number
  columnWidth: number
  group: Group
}) => number
export type GetGroupsDomain = (groups: Groups) => readonly string[]
export type GetValuesDomain = (groups: Groups) => NumberRange
export type GetAxisShowPositions = (params: {
  isHorizontal: boolean
  isNegative: boolean
}) => ShowPositions

export const CHART_MIN_HEIGHT = 153
const BAR_MIN_SIZE = 5

export const GROUP_INNER_PADDING: Record<ColumnSize, number> = {
  s: 8,
  m: 18,
  l: 18,
  xl: 18,
  xxl: 18,
}

export const OUTER_PADDING = 2

export const getRange = (size: number, shouldFlip?: boolean): NumberRange => {
  return shouldFlip ? [size, 0] : [0, size]
}

export const getTotalByColumn = (column: Column) => sum(Object.values(column)) || 0

export const getNormalizedValue = ({
  maxValue,
  value,
  total,
}: {
  maxValue: number
  value: number
  total: number
}) => (maxValue * value) / total

export const getColumnDetails = ({
  column,
  columnName,
  categories,
  valuesScale,
  maxValue,
  hasRatio,
}: {
  column: Column
  columnName: string
  categories: readonly string[]
  valuesScale: Scaler<number>
  maxValue: number
  hasRatio?: boolean
}): readonly ColumnDetail[] => {
  const zeroPoint = Math.ceil(valuesScale.scale(0))

  return categories.reduce<readonly ColumnDetail[]>((previousValue, category) => {
    const value = column[category]

    if (value === undefined) {
      return previousValue
    }

    const normalizedValue = hasRatio
      ? getNormalizedValue({
          maxValue,
          value,
          total: getTotalByColumn(column),
        })
      : value

    const prevElement = previousValue[previousValue.length - 1]
    const positionBegin = prevElement ? prevElement.positionEnd : zeroPoint
    const positionEnd = Math.round(positionBegin + (zeroPoint - valuesScale.scale(normalizedValue)))
    const size = Math.abs(positionBegin - positionEnd)
    const columnSize = size < BAR_MIN_SIZE && value !== 0 ? BAR_MIN_SIZE : size

    const result = {
      category,
      columnName,
      positionBegin,
      positionEnd: zeroPoint > 0 ? positionBegin - columnSize : positionBegin + columnSize,
      columnSize,
      value,
    }

    return previousValue.concat(result)
  }, [])
}

export const defaultGetValuesDomain: GetValuesDomain = groups => {
  const numbers = flattenDeep(groups.map(group => group.values.map(getTotalByColumn)))

  const minNumber = Math.min(...numbers, 0)
  const maxNumber = Math.max(...numbers, 0)
  const maxInDomain = Math.max(-minNumber, maxNumber)

  if (minNumber < 0) {
    return [-maxInDomain, maxInDomain]
  }

  return [0, maxNumber]
}

export const defaultGetGroupsDomain: GetGroupsDomain = groups => {
  return groups.map(g => g.groupName)
}

export const getDataColumns = ({
  categories,
  groups,
  valuesScale,
  maxValue,
  hasRatio,
}: {
  categories: readonly string[]
  groups: Groups
  maxValue: number
  hasRatio?: boolean
  valuesScale: Scaler<number>
}): DataColumns =>
  groups
    .map(group => ({
      ...group,
      values: group.values.filter(value => Object.keys(value).some(key => isDefined(value[key]))),
    }))
    .map(group => ({
      groupName: group.groupName,
      columnDetails: Object.keys(group.values)
        .map(name =>
          getColumnDetails({
            column: group.values[Number(name)],
            columnName: name,
            categories,
            valuesScale,
            maxValue,
            hasRatio,
          })
        )
        .filter(isDefined),
    }))

export const getEveryNTick = (items: readonly number[], n: number) => {
  const isNegative = Math.min(...items) < 0
  if (isNegative) {
    const zeroIndex = items.findIndex(item => item === 0)
    const positiveTicks = getEveryN(items.slice(zeroIndex), n)
    const negativeTicks = positiveTicks
      .slice(1)
      .reverse()
      .map(tick => tick * -1)

    return [...negativeTicks, ...positiveTicks]
  }

  return getEveryN(items, n)
}

export const getGraphStepSize = (graphSize: number, groupsSizes: readonly number[]): number => {
  if (groupsSizes.length === 0) {
    return graphSize
  }

  const step = Math.round(graphSize / groupsSizes.length)
  const sizes = groupsSizes.filter(size => size > step)

  if (sizes.length === 0) {
    return step
  }

  const sumSizes = sum(sizes)
  const groupsCount = groupsSizes.length - sizes.length
  const nextGraphSize = graphSize - sumSizes

  if (groupsCount === 1) {
    return nextGraphSize
  }

  return getGraphStepSize(
    nextGraphSize,
    groupsSizes.filter(size => size <= step)
  )
}

export const scaleBand = ({
  groupsSizes,
  range,
  paddingInner = 0,
  paddingOuter = 0,
  align = 0.5,
  groupsNames,
}: {
  groupsSizes: Record<string, number>
  range: NumberRange
  paddingInner?: number
  paddingOuter?: number
  align?: number
  groupsNames: readonly string[]
}): Scaler<string> => {
  const [start, end] = range
  const fullPaddingOuter = paddingOuter * 2
  const fullPaddingInner = paddingInner * (groupsNames.length - 1)
  const graphSize = end - start - fullPaddingOuter - fullPaddingInner
  const sizes = groupsNames.map(name => groupsSizes[name])
  const step = getGraphStepSize(graphSize, sizes)
  const startWithOffset = start + fullPaddingOuter * align

  const values = groupsNames.reduce<Record<string, number>>((acc, name, i) => {
    if (i === 0) {
      acc[name] = startWithOffset
    } else {
      const prevColumnSize = acc[groupsNames[i - 1]]
      const columnSize = groupsSizes[groupsNames[i - 1]]

      acc[name] = Math.round(
        prevColumnSize + (columnSize > step ? columnSize : step) + paddingInner
      )
    }
    return acc
  }, {})

  return {
    scale: (key: string) => values[key],
    bandwidth: (key?: string) => {
      if (!key) {
        return 0
      }

      const size = groupsSizes[key]

      return size > step ? size : step
    },
  }
}

export const toAxisSize = (size: Size): TickSize => {
  if (size === 's') {
    return 's'
  }

  return 'm'
}

type GetColumnSizeParams = {
  size: Size
  valueLength: number
  isHorizontal: boolean
}

export const getColumnSize = (params: GetColumnSizeParams): ColumnSize => {
  const { size, valueLength, isHorizontal } = params

  if (size !== 'auto') {
    return size
  }

  if (size === 'auto' && isHorizontal) {
    return 'm'
  }

  switch (valueLength) {
    case 1:
      return 's'
    case 2:
      return 'm'
    case 3:
      return 'l'
    case 4:
      return 'xl'
    default:
      return 'xxl'
  }
}

export const isLeftTornadoBar = (barIndex: number) => {
  return barIndex % 2 === 0
}

export const defaultGetGroupSize: GetGroupSize = ({ columnPadding, columnWidth, group }) => {
  const countColumns = group.values.length
  const groupSize = countColumns * columnWidth + (countColumns - 1) * columnPadding

  return groupSize < columnWidth ? columnWidth : groupSize
}

export const getMinChartSize = ({
  groupsSizes,
  paddingInner,
  paddingOuter,
}: {
  groupsSizes: Record<string, number>
  paddingInner: number
  paddingOuter: number
}) => {
  const items = Object.values(groupsSizes)

  return Math.round(
    items.reduce((acc, i) => acc + i, 0) + paddingOuter * 2 + paddingInner * (items.length - 1)
  )
}

export const defaultGetAxisShowPositions: GetAxisShowPositions = ({
  isHorizontal,
  isNegative,
}) => ({
  top: !isHorizontal && isNegative,
  right: isHorizontal && isNegative,
  bottom: true,
  left: true,
})
