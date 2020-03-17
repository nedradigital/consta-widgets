import { isDefined } from '@csssr/gpn-utils/lib/type-guards'
import { flattenDeep, max, min, sum } from 'lodash'

import { getEveryN } from '@/utils/array'
import { Scaler } from '@/utils/scale'

import { Column, Groups, SingleBarChartGroups, Size } from './'
import { ColumnDetail } from './components/Bar'

type NumberRange = readonly [number, number]

type DataColumns = ReadonlyArray<{
  groupName: string
  columnDetails: ReadonlyArray<readonly ColumnDetail[]>
}>

export const CHART_MIN_HEIGHT = 220
const BAR_MIN_SIZE = 5

export const GROUP_INNER_PADDING: Record<Size, number> = {
  s: 8,
  m: 18,
}

export const OUTER_PADDING = 2

export const getRange = (size: number, shouldFlip?: boolean): NumberRange => {
  return shouldFlip ? [size, 0] : [0, size]
}

export const getTotalByColumn = (column: Column) =>
  sum(Object.keys(column).map(key => column[key])) || 0

export const getNormalizedValue = ({
  maxValue,
  value,
  total,
}: {
  maxValue: number
  value: number
  total: number
}) => Math.round((maxValue * value) / total)

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

  return categories
    .filter(category => isDefined(column[category]))
    .map(category => {
      const value = column[category]

      if (!hasRatio || !value) {
        return {
          value,
          normalizedValue: value,
          category,
        }
      }

      const total = getTotalByColumn(column)

      return {
        value,
        normalizedValue: getNormalizedValue({ maxValue, value, total }),
        category,
      }
    })
    .reduce((previousValue, curr, currentIndex) => {
      const { value, normalizedValue, category } = curr

      if (value === undefined || normalizedValue === undefined) {
        return previousValue
      }

      const prevElement = previousValue[currentIndex - 1]
      const positionBegin = prevElement ? prevElement.positionEnd : zeroPoint
      const positionEnd = Math.ceil(
        positionBegin + (zeroPoint - valuesScale.scale(normalizedValue))
      )
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
    }, [] as readonly ColumnDetail[])
}

export const getDomain = (groups: Groups): NumberRange => {
  const numbers = flattenDeep(
    groups.map(group =>
      group.values.map(value =>
        sum(Object.keys(value).map(key => (isDefined(value[key]) ? value[key] : 0)))
      )
    )
  )

  const minNumber = min(numbers) || 0
  const maxNumber = max(numbers) || 0
  const maxInDomain = max([-minNumber, maxNumber]) || 0

  if (minNumber < 0) {
    return [-maxInDomain, maxInDomain]
  }

  return [0, maxNumber]
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

export const transformBarChartGroupsToCommonGroups = (groups: SingleBarChartGroups): Groups =>
  groups.map(group => ({
    ...group,
    values: group.values.map(item => ({ [item.colorGroupName]: item.value })),
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
}: {
  groupsSizes: Record<string, number>
  range: NumberRange
  paddingInner?: number
  paddingOuter?: number
  align?: number
}): Scaler<string> => {
  const groupsNames = Object.keys(groupsSizes)
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
