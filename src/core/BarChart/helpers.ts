import { sum } from 'lodash'

import { getEveryN } from '@/common/utils/array'
import { NumberRange } from '@/common/utils/scale'
import { ShowPositions } from '@/BarChartAxis'
import { Size as TickSize } from '@/Ticks'

import { Group, Groups } from './'
import { ColumnItem } from './components/Group'

export const barCharSizes = ['s', 'm', 'l', 'xl', '2xl', '3xl', 'auto'] as const
export type Size = typeof barCharSizes[number]
export type ColumnSize = Exclude<Size, 'auto'>

export type GetGroupSize = (params: {
  columnPadding: number
  columnWidth: number
  group: Group
}) => number
export type GetGroupsDomain = (groups: Groups) => readonly string[]
export type GetValuesDomain = (groups: Groups, showReversed: boolean) => NumberRange
export type GetAxisShowPositions = (params: {
  isHorizontal: boolean
  showReversed: boolean
}) => ShowPositions

export const CHART_MIN_HEIGHT = 153

export const GROUP_INNER_PADDING: Record<ColumnSize, number> = {
  s: 8,
  m: 18,
  l: 18,
  xl: 18,
  '2xl': 18,
  '3xl': 18,
}

export const OUTER_PADDING = 2

export const getRange = (size: number, shouldFlip?: boolean): NumberRange => {
  return shouldFlip ? [size, 0] : [0, size]
}

export const getTotalByColumn = (column: ColumnItem | undefined) => {
  return column ? Math.abs(column.total) : 0
}

export const getValuesDomain: GetValuesDomain = (groups, showReversed) => {
  const numbers = groups
    .map(({ columns, reversedColumns }) => columns.concat(reversedColumns).map(getTotalByColumn))
    .flat()

  const maxNumber = Math.max(...numbers, 0)

  return showReversed ? [-maxNumber, maxNumber] : [0, maxNumber]
}

export const getGroupsDomain: GetGroupsDomain = groups => {
  return groups.map(g => g.name)
}

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
      return 'xl'
    case 4:
      return '2xl'
    default:
      return '3xl'
  }
}

export const defaultGetAxisShowPositions: GetAxisShowPositions = ({
  isHorizontal,
  showReversed,
}) => ({
  top: !isHorizontal && showReversed,
  right: isHorizontal && showReversed,
  bottom: true,
  left: true,
})

export const getScaler = ({
  maxValue,
  showReversed,
}: {
  maxValue: number
  showReversed: boolean
}) => (size: number, value: number) => {
  const percent = Math.abs(value) / maxValue
  const maxLength = showReversed ? size / 2 : size
  const length = maxLength * percent
  return length > maxLength ? maxLength : length
}
