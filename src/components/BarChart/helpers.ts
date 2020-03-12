import { isDefined } from '@csssr/gpn-utils/lib/type-guards'
import { flattenDeep, max, min, sum } from 'lodash'

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

      const positionBegin = previousValue[currentIndex - 1]?.positionEnd || zeroPoint
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
