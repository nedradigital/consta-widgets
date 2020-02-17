import React, { useRef, useState } from 'react'

import { isDefined } from '@csssr/gpn-utils/lib/type-guards'
import useComponentSize from '@rehooks/component-size'
import * as d3 from 'd3'
import { flattenDeep, max, min, sum, uniq } from 'lodash'

import { Axis, UnitPosition } from '@/components/BarChartAxis'
import { Grid } from '@/components/Grid'
import { useBaseSize } from '@/contexts'
import { ColorGroups, FormatValue } from '@/dashboard/types'
import { getEveryN } from '@/utils/array'
import { getTicks } from '@/utils/ticks'

import { Bar, ColumnDetail } from './components/Bar'
import { TooltipComponent as Tooltip } from './components/Tooltip'
import css from './index.css'

export type Orientation = 'horizontal' | 'vertical'
type NumberRange = readonly [number, number]
export const sizes = ['s', 'm'] as const
export type Size = typeof sizes[number]

type Column = {
  [key: string]: number | undefined
}

type Group = {
  values: readonly Column[]
  groupName: string
}

export type Data = {
  categories: readonly string[]
  groups: readonly Group[]
  unit?: string
  formatValueForLabel?: FormatValue
}

type Props = {
  orientation: Orientation
  colorGroups: ColorGroups
  gridTicks: number
  valuesTicks: number
  unitPosition?: UnitPosition
  size?: Size
} & Data &
  (
    | {
        isMultiBar: true
        hasRatio?: boolean
      }
    | {
        isMultiBar: false
        showValues?: boolean
      }
  )

type DataColumns = ReadonlyArray<{
  groupName: string
  columnDetails: ReadonlyArray<readonly ColumnDetail[]>
}>

const getXRange = (width: number): NumberRange => [0, width]
const getYRange = (height: number, orientation: Orientation): NumberRange =>
  orientation === 'horizontal' ? [0, height] : [height, 0]

const getGroupScale = (domain: readonly string[], size: number, orientation: Orientation) =>
  d3
    .scaleBand()
    .domain([...domain])
    .range(
      orientation === 'horizontal'
        ? [getYRange(size, orientation)[0], getYRange(size, orientation)[1]]
        : [getXRange(size)[0], getXRange(size)[1]]
    )

const getValuesScale = (domain: NumberRange, size: number, orientation: Orientation) =>
  d3
    .scaleLinear()
    .domain([...domain])
    .range(orientation === 'horizontal' ? getXRange(size) : getYRange(size, orientation))

const getColumnDetails = ({
  column,
  columnName,
  categories,
}: {
  column: Column
  columnName: string
  categories: readonly string[]
}): readonly ColumnDetail[] => {
  return categories.reduce((previousValue, category, currentIndex) => {
    const value = column[category]
    if (value === undefined) {
      return previousValue
    }

    const positionBegin = currentIndex === 0 ? 0 : previousValue[currentIndex - 1]?.positionEnd || 0
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

const getTotalByColumn = (columns: readonly ColumnDetail[]) =>
  sum(columns.map(column => column.value)) || 0

const getNormalizedValue = ({
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

export const getUniqColumnNames = (groups: readonly Group[]): readonly string[] =>
  uniq(flattenDeep(groups.map(group => group.values.map((_, index) => String(index)))))

const getDomain = (dataColumns: DataColumns): NumberRange => {
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
  uniqueColumnNames,
}: {
  categories: readonly string[]
  groups: readonly Group[]
  uniqueColumnNames: readonly string[]
}): DataColumns =>
  groups
    .map(group => ({
      ...group,
      values: group.values.filter(value => Object.keys(value).some(key => isDefined(value[key]))),
    }))
    .map(group => ({
      groupName: group.groupName,
      columnDetails: uniqueColumnNames
        .map(
          name =>
            group.values[Number(name)] &&
            getColumnDetails({
              column: group.values[Number(name)],
              columnName: name,
              categories,
            })
        )
        .filter(isDefined),
    }))

export const BarChart: React.FC<Props> = props => {
  const {
    groups,
    formatValueForLabel,
    categories,
    unit,
    orientation,
    gridTicks,
    valuesTicks,
    colorGroups,
    unitPosition = 'none',
    size = 'm',
  } = props
  const [activeBar, setActiveBar] = useState()

  const ref = useRef(null)
  const svgRef = useRef(null)
  const { width, height } = useComponentSize(ref)
  const { getCalculatedSizeWithBaseSize } = useBaseSize()
  const isVertical = orientation !== 'horizontal'

  const groupsDomain = groups.map(group => group.groupName)
  const uniqueColumnNames = getUniqColumnNames(groups)

  const dataColumns = getDataColumns({ groups, categories, uniqueColumnNames })

  const valuesDomain = getDomain(dataColumns)
  const isNegative = Math.min(...valuesDomain) < 0
  const paddingCount = isNegative ? 2 : 1
  const padding =
    !isVertical && !props.isMultiBar && props.showValues ? getCalculatedSizeWithBaseSize(50) : 0

  const svgWidth = width ? Math.round(width - padding * paddingCount) : 0
  const svgHeight = height ? Math.round(height) : 0

  const ySize = isVertical ? svgHeight : svgWidth
  const xSize = isVertical ? svgWidth : svgHeight

  const groupScale = getGroupScale(groupsDomain, xSize, orientation)
  const valuesScale = getValuesScale(valuesDomain, ySize, orientation)

  const gridItems = getTicks(valuesDomain, gridTicks)
  const axisValues = getEveryN(gridItems, valuesTicks)

  const gridXTickValues = isVertical ? [] : gridItems
  const gridYTickValues = isVertical ? gridItems : []

  const axisShowPositions = {
    top: isVertical && isNegative,
    right: !isVertical && isNegative,
    bottom: true,
    left: true,
  }
  const style = {
    paddingLeft: isNegative ? padding : 0,
    paddingRight: padding,
  }

  return (
    <Axis
      values={axisValues}
      labels={groupScale.domain()}
      valuesScaler={valuesScale}
      labelsScaler={groupScale}
      isHorizontal={!isVertical}
      unit={unit}
      unitPosition={unitPosition}
      formatValue={formatValueForLabel}
      showPositions={axisShowPositions}
      horizontalStyles={style}
    >
      <div ref={ref} className={css.main} style={style}>
        <svg className={css.svg} width={svgWidth} height={svgHeight} ref={svgRef}>
          <Grid
            scalerX={valuesScale}
            scalerY={valuesScale}
            xTickValues={gridXTickValues}
            yTickValues={gridYTickValues}
            width={svgWidth}
            height={svgHeight}
          />
          {dataColumns.map((bar, idx) => {
            return (
              <Bar
                key={idx}
                groupName={bar.groupName}
                columnDetails={normalizeDetails({
                  details: bar.columnDetails,
                  maxValue: valuesDomain[1],
                  hasRatio: props.isMultiBar ? props.hasRatio : false,
                })}
                isVertical={isVertical}
                groupScale={groupScale}
                valuesScale={valuesScale}
                color={colorGroups}
                uniqueColumnNames={uniqueColumnNames}
                onMouseLeave={() => setActiveBar(undefined)}
                onMouseEnter={setActiveBar}
                parentRef={svgRef}
                formatValue={formatValueForLabel}
                size={size}
                showValues={!props.isMultiBar && props.showValues}
              />
            )
          })}
        </svg>
        {activeBar && (
          <Tooltip
            barColumn={activeBar}
            isVertical={isVertical}
            uniqueColumnNames={uniqueColumnNames}
            isVisible
            svgParentRef={svgRef}
            color={colorGroups}
            formatValue={formatValueForLabel}
            size={size}
          />
        )}
      </div>
    </Axis>
  )
}
