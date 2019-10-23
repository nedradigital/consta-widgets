import React, { useState } from 'react'
import { useUID } from 'react-uid'
import useDimensions from 'react-use-dimensions'

import { getCalculatedSize } from '@gaz/utils'
import * as d3 from 'd3'
import { isEqual } from 'lodash'

import { Axis } from './components/Axis'
import { Bar } from './components/Bar'
import css from './index.css'

type NumberRange = readonly [number, number]

export type Orientation = 'horizontal' | 'vertical'

export type Data = {
  groupName: string
  values: readonly number[]
}

export type Colors = readonly string[]

type Props = {
  data: readonly Data[]
  colors: Colors
  orientation: Orientation
  /** Показывать значение рядом с линиями. Работает только при orientation: horizontal */
  showValues?: boolean
  valuesTick?: number
}

const getColumnSize = () => getCalculatedSize(12)
const getColumnPadding = () => getCalculatedSize(4)
const getXRange = (width: number) => [0, width] as NumberRange
const getYRange = (height: number) =>
  [
    // Чтобы нарисовался гридлайн на нижней оси
    height - 1,
    0,
  ] as NumberRange

const getGroupScale = (domain: readonly string[], size: number, orientation: Orientation) =>
  d3
    .scaleBand()
    .domain([...domain])
    .range(
      orientation === 'horizontal'
        ? [getYRange(size)[0], getYRange(size)[1]]
        : [getXRange(size)[0], getXRange(size)[1]]
    )

const getValuesScale = (domain: NumberRange, size: number, orientation: Orientation) =>
  d3
    .scaleLinear()
    .domain([...domain])
    .range(orientation === 'horizontal' ? getXRange(size) : getYRange(size))

const getDomain = (items: readonly Data[]): NumberRange => {
  // tslint:disable-next-line:readonly-array
  const numbers = items.reduce<number[]>((acc, curr) => {
    acc.push(...curr.values)
    return acc
  }, [])

  return [0, d3.max(numbers)] as NumberRange
}

export const BarChart: React.FC<Props> = ({
  data = [],
  orientation,
  colors,
  showValues,
  valuesTick = 4,
}) => {
  const [ref, { width, height }] = useDimensions()
  const [{ paddingX, paddingY }, changePadding] = useState({ paddingX: 0, paddingY: 0 })
  const columnSize = getColumnSize()
  const columnPadding = getColumnPadding()

  const clipId = `barchart_clipPath_${useUID()}`

  const onAxisSizeChange = ({
    xAxisHeight,
    yAxisWidth,
  }: {
    xAxisHeight: number
    yAxisWidth: number
  }) => {
    const newPaddings = {
      paddingX: yAxisWidth,
      paddingY: xAxisHeight,
    }

    if (!isEqual({ paddingX, paddingY }, newPaddings)) {
      changePadding(newPaddings)
    }
  }

  const svgWidth = width ? Math.round(width - paddingX) : 0
  const svgHeight = height ? Math.round(height - paddingY) : 0

  const groupDomains = data.map(item => item.groupName)
  const valuesDomains = getDomain(data)
  const barDomains = data.length ? data[0].values.map((_, index) => String(index)) : []

  const barSize = (columnSize + columnPadding) * (data.length ? data[0].values.length : 0)

  const groupScale = getGroupScale(
    groupDomains,
    orientation === 'horizontal' ? svgHeight : svgWidth,
    orientation
  )
  const valuesScale = getValuesScale(
    valuesDomains,
    orientation === 'horizontal' ? svgWidth : svgHeight,
    orientation
  )
  const barScale = getGroupScale(barDomains, barSize, orientation)

  return (
    <div
      ref={ref}
      className={css.main}
      style={{
        paddingLeft: paddingX,
      }}
    >
      <svg className={css.svg} width={svgWidth} height={svgHeight}>
        <defs>
          <clipPath id={clipId}>
            <rect width={svgWidth} height={svgHeight} />
          </clipPath>
        </defs>
        <Axis
          width={svgWidth}
          height={svgHeight}
          groupScale={groupScale}
          valuesScale={valuesScale}
          valuesTick={valuesTick}
          orientation={orientation}
          onAxisSizeChange={onAxisSizeChange}
        />
        {data.map(item => (
          <Bar
            key={item.groupName}
            orientation={orientation}
            data={item}
            groupScale={groupScale}
            valuesScale={valuesScale}
            barScale={barScale}
            barSize={barSize}
            colors={colors}
            clipId={clipId}
            columnSize={columnSize}
            padding={columnPadding}
            showValues={showValues}
          />
        ))}
      </svg>
    </div>
  )
}
