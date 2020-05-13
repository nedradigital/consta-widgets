import React, { useRef, useState } from 'react'

import useComponentSize from '@rehooks/component-size'

import { Axis } from '@/components/BarChartAxis'
import { Grid } from '@/components/Grid'
import { useBaseSize } from '@/contexts'
import { ColorGroups, FormatValue } from '@/dashboard'
import { BarChartParams, TornadoChartParams } from '@/dashboard/widget-params'
import { scaleLinear } from '@/utils/scale'
import { getTicks } from '@/utils/ticks'

import { Bar, COLUMN_PADDING, COLUMN_WIDTHS, TooltipData } from './components/Bar'
import { TooltipComponent as Tooltip } from './components/Tooltip'
import {
  CHART_MIN_HEIGHT,
  createFormatValue,
  getAxisShowPositions,
  getDataColumns,
  getDomain,
  getEveryNTick,
  getGroupDomain,
  getRange,
  GROUP_INNER_PADDING,
  OUTER_PADDING,
  scaleBand,
} from './helpers'
import css from './index.css'

export type Size = BarChartParams['size']

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
  unitPosition?: BarChartParams['unitPosition']
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
        orientation: BarChartParams['orientation']
      }
    | {
        isTornado: true
        xAxisShowPosition: TornadoChartParams['xAxisShowPosition']
        yAxisShowPosition: TornadoChartParams['yAxisShowPosition']
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
  const isNegative = Math.min(...valuesDomain) < 0
  const paddingCount = isNegative || props.isTornado ? 2 : 1
  const chartMinHeight = getCalculatedSizeWithBaseSize(CHART_MIN_HEIGHT)
  const paddingInner = getCalculatedSizeWithBaseSize(GROUP_INNER_PADDING[size])
  const paddingOuter = getCalculatedSizeWithBaseSize(OUTER_PADDING)
  const padding =
    !isVertical && !props.isMultiBar && props.showValues ? getCalculatedSizeWithBaseSize(50) : 0

  const svgWidth = width ? Math.round(width - padding * paddingCount) : 0
  const svgHeight = height ? Math.round(height) : 0

  const getGroupsSizes = () => {
    const columnSize = getCalculatedSizeWithBaseSize(COLUMN_WIDTHS[size])
    const columnPadding = getCalculatedSizeWithBaseSize(COLUMN_PADDING[size])

    return groups.reduce<Record<string, number>>((acc, group) => {
      const { groupName, values } = group

      const countColumns = values.length
      const groupSize = countColumns * columnSize + (countColumns - 1) * columnPadding

      acc[groupName] = groupSize < columnSize ? columnSize : groupSize

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
    maxValue: valuesDomain[1],
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
      size={size}
      formatValue={formatValue}
      showPositions={axisShowPositions}
      horizontalStyles={commonStyle}
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
                size={size}
                showValues={!props.isMultiBar && props.showValues}
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
            size={size}
          />
        )}
      </div>
    </Axis>
  )
}
