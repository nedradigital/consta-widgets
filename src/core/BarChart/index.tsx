import React, { useRef, useState } from 'react'

import classnames from 'classnames'

import { FormatValue } from '@/common/types'
import { scaleBand, scaleLinear } from '@/common/utils/scale'
import { getTicks } from '@/common/utils/ticks'
import { useComponentSize } from '@/common/utils/use-component-size'
import { Grid } from '@/core/Grid'
import { Axis } from '@/BarChartAxis'
import { useBaseSize } from '@/BaseSizeContext'

import { ColumnItem, Group } from './components/Group'
import { Tooltip, TooltipData } from './components/Tooltip'
import {
  defaultGetAxisShowPositions,
  GetAxisShowPositions,
  getColumnSize,
  getEveryNTick,
  getGroupsDomain,
  getRange,
  getScaler,
  getValuesDomain,
  GROUP_INNER_PADDING,
  OUTER_PADDING,
  Size,
  toAxisSize,
} from './helpers'
import css from './index.css'

export const unitPositions = ['left', 'bottom', 'left-and-bottom', 'none'] as const
export type UnitPosition = typeof unitPositions[number]

export type Group = {
  name: string
  columns: ReadonlyArray<ColumnItem | undefined>
  reversedColumns: ReadonlyArray<ColumnItem | undefined>
}

export type Groups = readonly Group[]

export type OnMouseHoverColumn = (groupName: string) => void

export type Props = {
  groups: Groups
  gridTicks: number
  valuesTicks: number
  size: Size
  isHorizontal?: boolean
  showValues?: boolean
  unit?: string
  unitPosition?: UnitPosition
  isDense?: boolean
  activeSectionIndex?: number
  activeGroup?: string
  getAxisShowPositions?: GetAxisShowPositions
  formatValueForLabel?: FormatValue
  onMouseEnterColumn?: OnMouseHoverColumn
  onMouseLeaveColumn?: OnMouseHoverColumn
}

export const CoreBarChart: React.FC<Props> = props => {
  const {
    groups,
    gridTicks,
    valuesTicks,
    isHorizontal = false,
    showValues = false,
    size,
    unit,
    unitPosition = 'none',
    isDense,
    activeSectionIndex,
    activeGroup,
    getAxisShowPositions = defaultGetAxisShowPositions,
    formatValueForLabel,
    onMouseEnterColumn,
    onMouseLeaveColumn,
  } = props
  const ref = useRef(null)
  const svgRef = useRef(null)
  const { width, height } = useComponentSize(ref)
  const { getCalculatedSizeWithBaseSize } = useBaseSize()
  const [tooltipData, setTooltipData] = useState<TooltipData>()
  const [labelSize, changeLabelSize] = useState<number>(0)

  const showReversed = groups.some(group =>
    group.reversedColumns.some(column => column && column.sections)
  )

  const groupsDomain = getGroupsDomain(groups)
  const valuesDomain = getValuesDomain(groups, showReversed)
  const maxValue = valuesDomain[1]
  const columnSize = getColumnSize({
    size,
    valueLength: maxValue.toString().length,
    isHorizontal,
  })
  const padding = isHorizontal && showValues ? getCalculatedSizeWithBaseSize(50) : 0
  const paddingCount = showReversed ? 2 : 1
  const paddingTop = !isHorizontal && showValues ? labelSize : 0
  const paddingBottom = showReversed ? paddingTop : 0
  const svgWidth = width ? Math.round(width - padding * paddingCount) : 0
  const svgHeight = height ? Math.round(height - (paddingTop + paddingBottom)) : 0
  const scaler = getScaler({ maxValue, showReversed })
  const groupScale = scaleBand({
    range: getRange(isHorizontal ? svgHeight : svgWidth),
    domain: groupsDomain,
    paddingInner: isDense ? 0 : getCalculatedSizeWithBaseSize(GROUP_INNER_PADDING[columnSize]),
    paddingOuter: getCalculatedSizeWithBaseSize(OUTER_PADDING),
  })
  const valuesScale = scaleLinear({
    domain: valuesDomain,
    range: getRange(isHorizontal ? svgWidth : svgHeight, !isHorizontal),
  })
  const gridItems = getTicks(valuesDomain, gridTicks)
  const axisValues = getEveryNTick(gridItems, valuesTicks)
  const gridXTickValues = isHorizontal ? gridItems : []
  const gridYTickValues = isHorizontal ? [] : gridItems
  const axisShowPositions = getAxisShowPositions({ isHorizontal, showReversed })
  const horizontalStyles = {
    paddingLeft: showReversed ? padding : 0,
    paddingRight: padding,
  }
  const verticalStyles = {
    paddingTop,
    paddingBottom,
  }

  const handleMouseEnterColumn = (groupName: string, params: TooltipData) => {
    setTooltipData(params)

    onMouseEnterColumn && onMouseEnterColumn(groupName)
  }

  const handleMouseLeaveColumn = (groupName: string) => {
    setTooltipData(undefined)

    onMouseLeaveColumn && onMouseLeaveColumn(groupName)
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
      horizontalStyles={horizontalStyles}
      verticalStyles={verticalStyles}
    >
      <div
        ref={ref}
        className={css.main}
        style={{
          ...horizontalStyles,
          ...verticalStyles,
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
        </svg>
        <div className={classnames(css.chart, isHorizontal && css.isHorizontal)}>
          {groups.map((group, idx) => (
            <Group
              {...group}
              key={group.name}
              group={group.name}
              size={columnSize}
              isHorizontal={isHorizontal}
              isNegative={showReversed}
              showValues={showValues}
              isDense={isDense}
              activeGroup={activeGroup}
              activeSectionIndex={activeSectionIndex}
              scaler={scaler}
              formatValueForLabel={formatValueForLabel}
              onChangeLabelSize={idx === 0 ? changeLabelSize : undefined}
              onMouseEnterColumn={params => handleMouseEnterColumn(group.name, params)}
              onMouseLeaveColumn={() => handleMouseLeaveColumn(group.name)}
            />
          ))}
        </div>
        {tooltipData && (
          <Tooltip
            data={tooltipData}
            isHorizontal={isHorizontal}
            formatValue={formatValueForLabel}
          />
        )}
      </div>
    </Axis>
  )
}
