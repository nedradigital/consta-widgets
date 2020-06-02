import React, { useRef, useState } from 'react'

import useComponentSize from '@rehooks/component-size'

import { ColorGroups, FormatValue } from '@/common/types'
import { scaleLinear } from '@/common/utils/scale'
import { getTicks } from '@/common/utils/ticks'
import { Axis } from '@/BarChartAxis'
import { useBaseSize } from '@/BaseSizeContext'
import { Grid } from '@/Grid'

import { Bar, COLUMN_PADDING_HORIZONTAL, COLUMN_WIDTHS, TooltipData } from './components/Bar'
import { TooltipComponent as Tooltip } from './components/Tooltip'
import {
  CHART_MIN_HEIGHT,
  defaultGetAxisShowPositions,
  defaultGetGroupsDomain,
  defaultGetGroupSize,
  defaultGetValuesDomain,
  GetAxisShowPositions,
  getColumnSize,
  getDataColumns,
  getEveryNTick,
  GetGroupsDomain,
  GetGroupSize,
  getMinChartSize,
  getRange,
  GetValuesDomain,
  GROUP_INNER_PADDING,
  OUTER_PADDING,
  scaleBand,
  Size,
  toAxisSize,
} from './helpers'
import css from './index.css'

export const unitPositions = ['left', 'bottom', 'left-and-bottom', 'none'] as const
export type UnitPosition = typeof unitPositions[number]

export type Column = Record<string, number | undefined>

export type Group = {
  values: readonly Column[]
  groupName: string
}

export type Groups = readonly Group[]

export type Props = {
  colorGroups: ColorGroups
  groups: Groups
  gridTicks: number
  valuesTicks: number
  size: Size
  hasRatio?: boolean
  isHorizontal?: boolean
  isTornado?: boolean
  showValues?: boolean
  unit?: string
  unitPosition?: UnitPosition
  getGroupSize?: GetGroupSize
  getGroupsDomain?: GetGroupsDomain
  getValuesDomain?: GetValuesDomain
  getAxisShowPositions?: GetAxisShowPositions
  formatValueForLabel?: FormatValue
}

export const CoreBarChart: React.FC<Props> = props => {
  const {
    colorGroups,
    groups,
    gridTicks,
    valuesTicks,
    hasRatio,
    isHorizontal = false,
    isTornado,
    showValues,
    size,
    unit,
    unitPosition = 'none',
    getGroupSize = defaultGetGroupSize,
    getGroupsDomain = defaultGetGroupsDomain,
    getValuesDomain = defaultGetValuesDomain,
    getAxisShowPositions = defaultGetAxisShowPositions,
    formatValueForLabel,
  } = props
  const [tooltipData, setTooltipData] = useState<TooltipData>()

  const ref = useRef(null)
  const svgRef = useRef(null)
  const { width, height } = useComponentSize(ref)
  const { getCalculatedSizeWithBaseSize } = useBaseSize()
  const categories = Object.keys(colorGroups)

  const groupsDomain = getGroupsDomain(groups)
  const valuesDomain = getValuesDomain(groups)
  const maxValue = valuesDomain[1]
  const columnSize = getColumnSize({
    size,
    valueLength: maxValue.toString().length,
    isHorizontal,
  })
  const isNegative = Math.min(...valuesDomain) < 0
  const paddingCount = isNegative ? 2 : 1
  const chartMinHeight = getCalculatedSizeWithBaseSize(CHART_MIN_HEIGHT)
  const paddingInner = getCalculatedSizeWithBaseSize(GROUP_INNER_PADDING[columnSize])
  const paddingOuter = getCalculatedSizeWithBaseSize(OUTER_PADDING)
  const padding = isHorizontal && showValues ? getCalculatedSizeWithBaseSize(50) : 0

  const svgWidth = width ? Math.round(width - padding * paddingCount) : 0
  const svgHeight = height ? Math.round(height) : 0

  const columnPadding = getCalculatedSizeWithBaseSize(COLUMN_PADDING_HORIZONTAL[columnSize])
  const columnWidth = getCalculatedSizeWithBaseSize(COLUMN_WIDTHS[columnSize])
  const groupsSizes = groups.reduce<Record<string, number>>((acc, group) => {
    acc[group.groupName] = getGroupSize({ columnPadding, columnWidth, group })
    return acc
  }, {})
  const groupScale = scaleBand({
    groupsSizes,
    range: getRange(isHorizontal ? svgHeight : svgWidth),
    groupsNames: groupsDomain,
    paddingInner,
    paddingOuter,
  })
  const valuesScale = scaleLinear({
    domain: valuesDomain,
    range: getRange(isHorizontal ? svgWidth : svgHeight, !isHorizontal),
  })
  const dataColumns = getDataColumns({
    groups,
    categories,
    valuesScale,
    hasRatio,
    maxValue,
  })
  const minSize = getMinChartSize({ groupsSizes, paddingInner, paddingOuter })
  const gridItems = getTicks(valuesDomain, gridTicks)
  const axisValues = getEveryNTick(gridItems, valuesTicks)

  const gridXTickValues = isHorizontal ? gridItems : []
  const gridYTickValues = isHorizontal ? [] : gridItems

  const axisShowPositions = getAxisShowPositions({ isHorizontal, isNegative })
  const commonStyle = {
    paddingLeft: isNegative ? padding : 0,
    paddingRight: padding,
  }

  return (
    <Axis
      values={axisValues}
      labels={groupsDomain}
      valuesScaler={valuesScale}
      labelsScaler={groupScale}
      isHorizontal={isHorizontal}
      unit={unit}
      unitPosition={unitPosition}
      size={toAxisSize(columnSize)}
      formatValue={formatValueForLabel}
      showPositions={axisShowPositions}
      horizontalStyles={commonStyle}
      showValues={showValues}
      isNegative={isNegative}
    >
      <div
        ref={ref}
        className={css.main}
        style={{
          ...commonStyle,
          minWidth: isHorizontal ? undefined : minSize,
          minHeight: isHorizontal ? minSize : chartMinHeight,
        }}
      >
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
                columnDetails={bar.columnDetails}
                isHorizontal={isHorizontal}
                groupScale={groupScale}
                valuesScale={valuesScale}
                color={colorGroups}
                onMouseLeave={() => setTooltipData(undefined)}
                onMouseEnter={setTooltipData}
                parentRef={svgRef}
                formatValue={formatValueForLabel}
                size={columnSize}
                showValues={showValues}
                isTornado={isTornado}
              />
            )
          })}
        </svg>
        {tooltipData && (
          <Tooltip
            data={tooltipData}
            isHorizontal={isHorizontal}
            isVisible
            svgParentRef={svgRef}
            color={colorGroups}
            formatValue={formatValueForLabel}
            size={columnSize}
          />
        )}
      </div>
    </Axis>
  )
}
