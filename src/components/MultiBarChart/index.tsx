import React, { useRef, useState } from 'react'

import useComponentSize from '@rehooks/component-size'
import { max, uniq } from 'lodash'

import { getGroupScale, getValuesScale } from '@/components/BarChart'
import { Axis, UnitPosition } from '@/components/BarChartAxis'
import { Grid } from '@/components/Grid'
import { ColorGroups, FormatValue } from '@/dashboard/types'
import { getEveryN } from '@/utils/array'
import { getTicks } from '@/utils/ticks'

import { ColumnDetail, MultiBar } from './components/MultiBar'
import { TooltipComponent as Tooltip } from './components/Tooltip'
import css from './index.css'

export type Orientation = 'horizontal' | 'vertical'

type Column = {
  [key: string]: number
}

type Value = {
  [key: string]: number | string | Column
}

export type UniqueInnerColumns = readonly string[]

export type Data = {
  categories: readonly string[]
  values: readonly Value[]
  keyGroup: string
}

type Props = {
  data: Data
  orientation: Orientation
  colorGroups: ColorGroups
  gridTicks: number
  valuesTicks: number
  hasRatio?: boolean
  formatValueForLabel?: FormatValue
  unit?: string
  unitPosition?: UnitPosition
}

const getColumnDetails = (
  column: Column,
  columnName: string,
  categories: readonly string[]
): readonly ColumnDetail[] => {
  return categories.reduce<readonly ColumnDetail[]>((previousValue, category, currentIndex) => {
    const value = column[category]
    const positionBegin = currentIndex === 0 ? 0 : previousValue[currentIndex - 1].positionEnd
    const positionEnd = positionBegin + value

    const result = {
      category,
      columnName,
      positionBegin,
      positionEnd,
      value,
    }

    return previousValue.concat(result)
  }, [])
}

const getTotalByColumn = (columns: readonly ColumnDetail[]) =>
  max(columns.map(obj => obj.positionEnd)) || 0

const getNormalizedValue = (yMaxValue: number, value: number, total: number) =>
  Math.round((yMaxValue * value) / total)

const normalizeDetails = (
  columns: readonly ColumnDetail[],
  yMaxValue: number
): readonly ColumnDetail[] => {
  const total = getTotalByColumn(columns)

  return columns.map(column => {
    return {
      ...column,
      positionBegin: getNormalizedValue(yMaxValue, column.positionBegin, total),
      positionEnd: getNormalizedValue(yMaxValue, column.positionEnd, total),
    }
  })
}

export const MultiBarChart: React.FC<Props> = ({
  data,
  orientation,
  gridTicks,
  valuesTicks,
  hasRatio,
  colorGroups,
  formatValueForLabel,
  unit,
  unitPosition = 'none',
}) => {
  const [activeBar, setActiveBar] = useState()

  const ref = useRef(null)
  const svgRef = useRef(null)
  const { width, height } = useComponentSize(ref)

  const { categories, values, keyGroup } = data
  const isVertical = orientation !== 'horizontal'

  const groupsDomain = values.map(d => String(d[keyGroup]))
  const innerColumns = values.map(obj => Object.keys(obj).filter(key => key !== keyGroup)).flat()
  const uniqueInnerColumns: UniqueInnerColumns = uniq(innerColumns)

  let dataColumns = data.values.map(obj => {
    return {
      keyGroup: String(obj[keyGroup]),
      columnDetails: uniqueInnerColumns.map(column =>
        getColumnDetails(obj[column] as Column, column, categories)
      ),
    }
  })

  const yMaxValue =
    max(dataColumns.map(obj => max(obj.columnDetails.map(column => getTotalByColumn(column))))) || 0

  const valuesDomain: readonly [number, number] = [0, yMaxValue]
  const ySize = isVertical ? height : width
  const xSize = isVertical ? width : height

  const groupScale = getGroupScale(groupsDomain, xSize, orientation)
  const valuesScale = getValuesScale(valuesDomain, ySize, orientation)

  if (hasRatio) {
    dataColumns = dataColumns.map(obj => {
      return {
        ...obj,
        columnDetails: obj.columnDetails.map(column => normalizeDetails(column, yMaxValue)),
      }
    })
  }

  const gridItems = getTicks(valuesDomain, gridTicks)
  const axisValues = getEveryN(gridItems, valuesTicks)

  const gridXTickValues = isVertical ? [] : gridItems
  const gridYTickValues = isVertical ? gridItems : []

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
    >
      <div ref={ref} className={css.main}>
        <svg className={css.svg} width={width} height={height} ref={svgRef}>
          <Grid
            scalerX={valuesScale}
            scalerY={valuesScale}
            xTickValues={gridXTickValues}
            yTickValues={gridYTickValues}
            width={width}
            height={height}
          />
          {dataColumns.map((barColumns, idx) => {
            return (
              <MultiBar
                key={idx}
                data={barColumns}
                isVertical={isVertical}
                groupScale={groupScale}
                valuesScale={valuesScale}
                color={colorGroups}
                uniqueInnerColumns={uniqueInnerColumns}
                onMouseLeave={() => setActiveBar(undefined)}
                onMouseEnter={setActiveBar}
                parentRef={svgRef}
                formatValue={formatValueForLabel}
              />
            )
          })}
        </svg>
        {activeBar && (
          <Tooltip
            barColumn={activeBar}
            isVertical={isVertical}
            uniqueInnerColumns={uniqueInnerColumns}
            isVisible
            svgParentRef={svgRef}
            color={colorGroups}
            formatValue={formatValueForLabel}
          />
        )}
      </div>
    </Axis>
  )
}
