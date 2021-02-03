import { isTruthy } from '@consta/widgets-utils/lib/type-guards'
import { startCase, sum } from 'lodash'

import { getEveryN } from '@/_private/utils/array'
import { NumberRange } from '@/_private/utils/scale'

import { Threshold } from './'
import { ColumnItem, GroupItem } from './components/Group'
import { Position, Size as TickSize } from './components/Ticks'

export const barCharSizes = ['s', 'm', 'l', 'xl', '2xl', '3xl', 'auto'] as const
export type Size = typeof barCharSizes[number]
export type ColumnSize = Exclude<Size, 'auto'>
export type ShowPositions = {
  [key in Position]: boolean
}

export type GetGroupSize = (params: {
  columnPadding: number
  columnWidth: number
  group: GroupItem
}) => number
export type GetGroupsDomain = (groups: readonly GroupItem[]) => readonly string[]
export type GetValuesDomain = (params: {
  groups: readonly GroupItem[]
  showReversed: boolean
  threshold?: Threshold
}) => NumberRange
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

export const getValuesDomain: GetValuesDomain = ({ groups, showReversed, threshold }) => {
  const numbers = groups
    .map(({ columns, reversedColumns }) => columns.concat(reversedColumns).map(getTotalByColumn))
    .flat()

  const thresholdValue = threshold?.value ?? 0

  const maxNumber = Math.max(...numbers, Math.abs(thresholdValue), 0)

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

export const getScaler = (maxValue: number) => (value: number) => {
  const percent = (Math.abs(value) / maxValue) * 100
  return percent > 100 ? 100 : percent
}

const getAreaNames = (count: number, handler: (i: number) => string) =>
  [...Array(count).keys()].map(handler).join(' ')

const joinStrings = (arr: ReadonlyArray<string | boolean | undefined>): string =>
  arr.filter(isTruthy).join(' ')

const joinAreasRow: typeof joinStrings = arr => `"${joinStrings(arr)}"`

export const getGridSettings = (
  params: {
    countGroups: number
    // showUnitBottom: boolean
    // showUnitLeft: boolean
    maxColumn: number
  } & ({ isHorizontal: true; axisShowPositions: ShowPositions } | { isHorizontal: false })
): React.CSSProperties => {
  // const { countGroups, showUnitBottom, showUnitLeft, maxColumn } = params
  const { countGroups, maxColumn } = params

  if (params.isHorizontal) {
    const { axisShowPositions } = params
    const withTopRow = axisShowPositions.top
    const withBottomTicksRow = axisShowPositions.bottom
    // const withBottomUnitRow = showUnitBottom
    const withLeftColumn = axisShowPositions.left
    const withRightColumn = axisShowPositions.right

    return {
      gridTemplateRows: joinStrings([
        withTopRow && 'auto',
        getAreaNames(countGroups, () => '1fr'),
        withBottomTicksRow && 'auto',
        'auto',
      ]),
      gridTemplateColumns: joinStrings([
        withLeftColumn && 'auto',
        '1fr',
        withRightColumn && 'auto',
      ]),
      gridTemplateAreas: joinStrings([
        withTopRow &&
          joinAreasRow([withLeftColumn && 'topLeft', 'topTicks', withRightColumn && 'topRight']),
        getAreaNames(countGroups, index =>
          joinAreasRow([
            withLeftColumn && `labelLeft${index}`,
            `group${index}`,
            withRightColumn && `labelRight${index}`,
          ])
        ),
        withBottomTicksRow &&
          joinAreasRow([
            withLeftColumn && 'bottomLeft',
            'bottomTicks',
            withRightColumn && 'bottomRight',
          ]),
        joinAreasRow([
          withLeftColumn && 'bottomLeft',
          'bottomUnit',
          withRightColumn && 'bottomUnit',
        ]),
      ]),
    }
  }

  return {
    gridTemplateRows: joinStrings(['auto', '1fr', 'auto', 'auto']),
    gridTemplateColumns: `auto ${getAreaNames(
      countGroups,
      () =>
        `minmax(calc((var(--column-size) * ${maxColumn}) + (var(--column-padding) * ${maxColumn -
          1})), 1fr)`
    )}`,
    gridTemplateAreas: joinStrings([
      `"topLeft ${getAreaNames(countGroups, index => `labelTop${index}`)}"`,
      `"leftTicks ${getAreaNames(countGroups, index => `group${index}`)}"`,
      `"bottomLeft ${getAreaNames(countGroups, index => `labelBottom${index}`)}"`,
      `"bottomLeft ${getAreaNames(countGroups, () => 'bottomUnit')}"`,
    ]),
  }
}

export const getLabelGridAreaName = (position: Position) => (index: number) => {
  return `label${startCase(position)}${index}`
}

export const isShowReversed = ({
  groups,
  threshold,
}: {
  groups: readonly GroupItem[]
  threshold?: Threshold
}) => {
  return (
    Boolean(threshold && threshold.value < 0) ||
    groups.some(group => group.reversedColumns.some(column => column && column.sections))
  )
}

export const isMultiColumn = (groups: readonly GroupItem[]) => {
  return groups.some(group => group.columns.length > 1 || group.reversedColumns.length > 1)
}

export const getCommonGroupsMaxColumns = (groups: readonly GroupItem[]) => {
  if (!groups.length) {
    return 0
  }

  return Math.max(
    ...groups.map(group => Math.max(group.columns.length, group.reversedColumns.length))
  )
}

export const GRID_GAP_SPACE = {
  '2xs': 'var(--space-2xs)',
  xs: 'var(--space-xs)',
  m: 'var(--space-m)',
  s: 'var(--space-s)',
}

export const getGridRowGap = (axisSize: Size, isHorizontal?: boolean): string => {
  if (isHorizontal && axisSize === 's') {
    return GRID_GAP_SPACE.xs
  }

  if (isHorizontal && axisSize === 'm') {
    return GRID_GAP_SPACE.m
  }

  if (axisSize === 's') {
    return GRID_GAP_SPACE['2xs']
  }

  return GRID_GAP_SPACE.xs
}

export const getGridColumnGap = (axisSize: Size): string => {
  if (axisSize === 's') {
    return GRID_GAP_SPACE.xs
  }

  return GRID_GAP_SPACE.m
}
