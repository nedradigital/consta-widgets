import React, { useRef } from 'react'
import { useUID } from 'react-uid'

import { getCalculatedSize } from '@gaz/utils/lib/css'
import { isDefined } from '@gaz/utils/lib/type-guards'
import useComponentSize from '@rehooks/component-size'
import * as d3 from 'd3'

import { Axis, UnitPosition } from '@/components/BarChartAxis'
import { Grid } from '@/components/Grid'
import { ColorGroups } from '@/dashboard/types'
import { getEveryN } from '@/utils/array'
import { getTicks } from '@/utils/ticks'

import { Bar } from './components/Bar'
import css from './index.css'

type NumberRange = readonly [number, number]

export const sizes = ['s', 'm'] as const
export type Size = typeof sizes[number]

export type Orientation = 'horizontal' | 'vertical'

export type Data = {
  label: string
  values: ReadonlyArray<{
    colorGroupName: string
    value: number | undefined
  }>
}

type Props = {
  data: readonly Data[]
  colorGroups: ColorGroups
  orientation: Orientation
  gridTicks: number
  valuesTicks: number
  /** Показывать значение рядом с линиями. Работает только при orientation: horizontal */
  showValues?: boolean
  unit?: string
  unitPosition?: UnitPosition
  size?: Size
}

const getXRange = (width: number): NumberRange => [0, width]
const getYRange = (height: number, orientation: Orientation): NumberRange =>
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

const getDomain = (items: readonly Data[]): NumberRange => {
  // tslint:disable-next-line:readonly-array
  const numbers = items.reduce<number[]>((mutableAcc, curr) => {
    mutableAcc.push(...curr.values.map(i => i.value).filter(isDefined))
    return mutableAcc
  }, [])

  const minNumber = d3.min(numbers) || 0
  const maxNumber = d3.max(numbers) || 0
  const maxInDomain = d3.max([-minNumber, maxNumber]) || 0

  if (minNumber < 0) {
    return [-maxInDomain, maxInDomain]
  }

  return [0, maxNumber] as NumberRange
}

const getPadding = (orientation: Orientation, showValues?: boolean) =>
  orientation === 'horizontal' && showValues ? getCalculatedSize(50) : 0

export const BarChart: React.FC<Props> = ({
  data = [],
  orientation,
  colorGroups,
  showValues,
  gridTicks,
  valuesTicks,
  unit,
  unitPosition = 'none',
  size = 'm',
}) => {
  const ref = useRef(null)
  const { width, height } = useComponentSize(ref)

  const clipId = `barchart_clipPath_${useUID()}`
  const isHorizontal = orientation === 'horizontal'

  const groupDomains = data.map(item => item.label)
  const valuesDomains = getDomain(data)
  const isNegative = Math.min(...valuesDomains) < 0

  const paddingCount = isNegative ? 2 : 1
  const padding = getPadding(orientation, showValues)
  const svgWidth = width ? Math.round(width - padding * paddingCount) : 0
  const svgHeight = height ? Math.round(height) : 0

  const groupScale = getGroupScale(groupDomains, isHorizontal ? svgHeight : svgWidth, orientation)
  const valuesScale = getValuesScale(
    valuesDomains,
    isHorizontal ? svgWidth : svgHeight,
    orientation
  )

  const gridItems = getTicks(valuesDomains, gridTicks)
  const axisValues = getEveryN(gridItems, valuesTicks)

  const gridXTickValues = isHorizontal ? gridItems : []
  const gridYTickValues = isHorizontal ? [] : gridItems

  const axisShowPositions = {
    top: !isHorizontal && isNegative,
    right: isHorizontal && isNegative,
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
      isHorizontal={isHorizontal}
      showPositions={axisShowPositions}
      unit={unit}
      unitPosition={unitPosition}
      horizontalStyles={style}
    >
      <div ref={ref} className={css.main} style={style}>
        <svg className={css.svg} width={svgWidth} height={svgHeight}>
          <defs>
            <clipPath id={clipId}>
              <rect width={svgWidth} height={svgHeight} />
            </clipPath>
          </defs>
          <Grid
            scalerX={valuesScale}
            scalerY={valuesScale}
            xTickValues={gridXTickValues}
            yTickValues={gridYTickValues}
            width={svgWidth}
            height={svgHeight}
          />
          {data.map(item => (
            <Bar
              key={item.label}
              orientation={orientation}
              data={item}
              groupScale={groupScale}
              valuesScale={valuesScale}
              colorGroups={colorGroups}
              clipId={clipId}
              showValues={showValues}
              size={size}
            />
          ))}
        </svg>
      </div>
    </Axis>
  )
}
