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
  createFormatValue,
  getAxisShowPositions,
  getColumnSize,
  getDataColumns,
  getDomain,
  getEveryNTick,
  getGroupDomain,
  getRange,
  GROUP_INNER_PADDING,
  OUTER_PADDING,
  scaleBand,
  Size,
  toAxisSize,
} from './helpers'
import css from './index.css'

export const unitPositions = ['left', 'bottom', 'left-and-bottom', 'none'] as const
export type UnitPosition = typeof unitPositions[number]
export const orientation = ['horizontal', 'vertical'] as const
export type Orientation = typeof orientation[number]

type CommonAxisShowPosition = 'both' | 'none'
export type XAxisShowPosition = 'top' | 'bottom' | CommonAxisShowPosition
export type YAxisShowPosition = 'left' | 'right' | CommonAxisShowPosition

export type SingleBarChartGroups = ReadonlyArray<{
  groupName: string
  values: ReadonlyArray<{
    colorGroupName: string
    value: number | undefined
  }>
}>

export type Column = Record<string, number | undefined>

type Group = {
  values: readonly Column[]
  groupName: string
}

export type Data = {
  unit?: string
  formatValueForLabel?: FormatValue
}

export type Groups = readonly Group[]

type Props = {
  groups: Groups
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
  ) &
  (
    | {
        isTornado?: false
        orientation: Orientation
      }
    | {
        isTornado: true
        xAxisShowPosition: XAxisShowPosition
        yAxisShowPosition: YAxisShowPosition
      }
  )

export const BarChart: React.FC<Props> = props => {
  const {
    groups,
    formatValueForLabel,
    unit,
    gridTicks,
    valuesTicks,
    colorGroups,
    unitPosition = 'none',
    size = 'm',
  } = props
  const [tooltipData, setTooltipData] = useState<TooltipData>()

  const ref = useRef(null)
  const svgRef = useRef(null)
  const { width, height } = useComponentSize(ref)
  const { getCalculatedSizeWithBaseSize } = useBaseSize()
  const isVertical = !props.isTornado && props.orientation !== 'horizontal'
  const categories = Object.keys(colorGroups)

  const groupsDomain = getGroupDomain(groups, props.isTornado)

  const valuesDomain = getDomain(groups, props.isTornado)
  const maxValue = valuesDomain[1]
  const columnSize = getColumnSize({
    size,
    valueLength: maxValue.toString().length,
    isVertical,
  })
  const isNegative = Math.min(...valuesDomain) < 0
  const paddingCount = isNegative || props.isTornado ? 2 : 1
  const chartMinHeight = getCalculatedSizeWithBaseSize(CHART_MIN_HEIGHT)
  const paddingInner = getCalculatedSizeWithBaseSize(GROUP_INNER_PADDING[columnSize])
  const paddingOuter = getCalculatedSizeWithBaseSize(OUTER_PADDING)
  const padding =
    !isVertical && !props.isMultiBar && props.showValues ? getCalculatedSizeWithBaseSize(50) : 0

  const svgWidth = width ? Math.round(width - padding * paddingCount) : 0
  const svgHeight = height ? Math.round(height) : 0
  const isMultiColumn = groups.some(group => group.values.length > 2)
  const isVerticalMultiColumn = isVertical ? isMultiColumn : false
  const showValues = !props.isMultiBar && props.showValues && !isVerticalMultiColumn

  const getGroupsSizes = () => {
    const columnWidth = getCalculatedSizeWithBaseSize(COLUMN_WIDTHS[columnSize])
    const columnPadding = getCalculatedSizeWithBaseSize(COLUMN_PADDING_HORIZONTAL[columnSize])

    return groups.reduce<Record<string, number>>((acc, group) => {
      const { groupName, values } = group

      const countColumns = values.length
      const groupSize = countColumns * columnWidth + (countColumns - 1) * columnPadding

      /**
       * Для торнадо данные приходят в виде 2 баров, но рисуются они на одной оси
       * Поэтому отступа между ними быть не может и размер группы всегда равен размеру бара
       */
      if (props.isTornado) {
        acc[groupName] = columnWidth
      } else {
        acc[groupName] = groupSize < columnWidth ? columnWidth : groupSize
      }

      return acc
    }, {})
  }

  const groupScale = scaleBand({
    groupsSizes: getGroupsSizes(),
    range: getRange(isVertical ? svgWidth : svgHeight),
    groupsNames: groupsDomain,
    paddingInner,
    paddingOuter,
  })
  const valuesScale = scaleLinear({
    domain: valuesDomain,
    range: getRange(isVertical ? svgHeight : svgWidth, isVertical),
  })
  const dataColumns = getDataColumns({
    groups,
    categories,
    valuesScale,
    hasRatio: props.isMultiBar ? props.hasRatio : false,
    maxValue,
  })

  const getMinSize = () => {
    const items = Object.values(getGroupsSizes())

    return Math.round(
      items.reduce((acc, i) => acc + i, 0) + paddingOuter * 2 + paddingInner * (items.length - 1)
    )
  }

  const minSize = getMinSize()
  const gridItems = getTicks(valuesDomain, gridTicks)
  const axisValues = getEveryNTick(gridItems, valuesTicks)

  const gridXTickValues = isVertical ? [] : gridItems
  const gridYTickValues = isVertical ? gridItems : []

  const axisShowPositions = {
    top: isVertical && isNegative,
    right: !isVertical && isNegative,
    bottom: true,
    left: true,
    ...(props.isTornado && getAxisShowPositions(props.xAxisShowPosition, props.yAxisShowPosition)),
  }
  const commonStyle = {
    paddingLeft: isNegative ? padding : 0,
    paddingRight: padding,
  }

  const formatValue = createFormatValue({
    isTornado: props.isTornado,
    formatValue: formatValueForLabel,
  })

  return (
    <Axis
      values={axisValues}
      labels={groupsDomain}
      valuesScaler={valuesScale}
      labelsScaler={groupScale}
      isHorizontal={!isVertical}
      unit={unit}
      unitPosition={unitPosition}
      size={toAxisSize(columnSize)}
      formatValue={formatValue}
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
          minWidth: isVertical ? minSize : undefined,
          minHeight: isVertical ? chartMinHeight : minSize,
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
                isVertical={isVertical}
                groupScale={groupScale}
                valuesScale={valuesScale}
                color={colorGroups}
                onMouseLeave={() => setTooltipData(undefined)}
                onMouseEnter={setTooltipData}
                parentRef={svgRef}
                formatValue={formatValueForLabel}
                size={columnSize}
                showValues={showValues}
                isTornado={props.isTornado}
              />
            )
          })}
        </svg>
        {tooltipData && (
          <Tooltip
            data={tooltipData}
            isVertical={isVertical}
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
