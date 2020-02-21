import { isDefined } from '@csssr/gpn-utils/lib/type-guards'
import * as d3 from 'd3'
import { flattenDeep, max, min, sum } from 'lodash'

import { Column, Groups, Orientation, SingleBarChartGroups } from './'
import { ColumnDetail } from './components/Bar'

type NumberRange = readonly [number, number]

type DataColumns = ReadonlyArray<{
  groupName: string
  columnDetails: ReadonlyArray<readonly ColumnDetail[]>
}>

export const getXRange = (width: number): NumberRange => [0, width]
export const getYRange = (height: number, orientation: Orientation): NumberRange =>
  orientation === 'horizontal' ? [0, height] : [height, 0]

export const getGroupScale = (domain: readonly string[], size: number, orientation: Orientation) =>
  d3
    .scaleBand()
    .domain([...domain])
    .range(
      orientation === 'horizontal'
        ? [getYRange(size, orientation)[0], getYRange(size, orientation)[1]]
        : [getXRange(size)[0], getXRange(size)[1]]
    )

export const getValuesScale = (domain: NumberRange, size: number, orientation: Orientation) =>
  d3
    .scaleLinear()
    .domain([...domain])
    .range(orientation === 'horizontal' ? getXRange(size) : getYRange(size, orientation))

export const getColumnDetails = ({
  column,
  columnName,
  categories,
}: {
  column: Column
  columnName: string
  categories: readonly string[]
}): readonly ColumnDetail[] => {
  return categories
    .filter(category => isDefined(column[category]))
    .reduce((previousValue, category, currentIndex) => {
      const value = column[category]
      if (value === undefined) {
        return previousValue
      }

      const positionBegin =
        currentIndex === 0 ? 0 : previousValue[currentIndex - 1]?.positionEnd || 0
      const positionEnd = positionBegin + value

      const result = {
        category,
        columnName,
        positionBegin,
        positionEnd,
        value,
      }

      return previousValue.concat(result)
    }, [] as readonly ColumnDetail[])
}

export const getTotalByColumn = (columns: readonly ColumnDetail[]) =>
  sum(columns.map(column => column.value)) || 0

export const getNormalizedValue = ({
  maxValue,
  value,
  total,
}: {
  maxValue: number
  value: number
  total: number
}) => Math.round((maxValue * value) / total)

export const normalizeDetails = ({
  details,
  maxValue,
  hasRatio,
}: {
  details: ReadonlyArray<readonly ColumnDetail[]>
  maxValue: number
  hasRatio?: boolean
}): ReadonlyArray<readonly ColumnDetail[]> => {
  if (!hasRatio) {
    return details
  }

  return details.map(columns => {
    const total = getTotalByColumn(columns)

    return columns.map(column => {
      return {
        ...column,
        positionBegin: getNormalizedValue({ maxValue, value: column.positionBegin, total }),
        positionEnd: getNormalizedValue({ maxValue, value: column.positionEnd, total }),
      }
    })
  })
}

export const getDomain = (dataColumns: DataColumns): NumberRange => {
  const numbers = flattenDeep<number>(
    dataColumns.map(column => column.columnDetails.map(details => getTotalByColumn(details)))
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
}: {
  categories: readonly string[]
  groups: Groups
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
          })
        )
        .filter(isDefined),
    }))

export const transformBarChartGroupsToCommonGroups = (groups: SingleBarChartGroups): Groups =>
  groups.map(group => ({
    ...group,
    values: group.values.map(item => ({ [item.colorGroupName]: item.value })),
  }))
