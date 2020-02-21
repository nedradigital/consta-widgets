import React, { useRef, useState } from 'react'

import useComponentSize from '@rehooks/component-size'

import { Axis, UnitPosition } from '@/components/BarChartAxis'
import { Grid } from '@/components/Grid'
import { useBaseSize } from '@/contexts'
import { ColorGroups, FormatValue } from '@/dashboard/types'
import { getEveryN } from '@/utils/array'
import { getTicks } from '@/utils/ticks'

import { Bar } from './components/Bar'
import { TooltipComponent as Tooltip } from './components/Tooltip'
import {
  getDataColumns,
  getDomain,
  getGroupScale,
  getValuesScale,
  normalizeDetails,
} from './helpers'
import css from './index.css'

export type Orientation = 'horizontal' | 'vertical'
export const sizes = ['s', 'm'] as const
export type Size = typeof sizes[number]

export type SingleBarChartGroups = ReadonlyArray<{
  groupName: string
  values: ReadonlyArray<{
    colorGroupName: string
    value: number | undefined
  }>
}>

export type Column = {
  [key: string]: number | undefined
}

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

export const BarChart: React.FC<Props> = props => {
  const {
    groups,
    formatValueForLabel,
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
  const categories = Object.keys(colorGroups)

  const groupsDomain = groups.map(group => group.groupName)

  const dataColumns = getDataColumns({ groups, categories })

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
