import React, { useState } from 'react'
import { useUID } from 'react-uid'
import useDimensions from 'react-use-dimensions'

import * as d3 from 'd3'
import { isEqual } from 'lodash'

import { Axis } from './components/Axis'
import { Bar } from './components/Bar'
import css from './index.css'

type NumberRange = readonly [number, number]

export type Orientation = 'horizontal' | 'vertical'

type Value = {
  value: number
  description: string
}

export type Data = {
  category: string
  values: readonly Value[]
}

export type Colors = { [key in string]: string }

type Props = {
  data: readonly Data[]
  colors: Colors
  orientation: Orientation
  /** Показывать значение рядом с линиями. Работает только при orientation: horizontal */
  showValues?: boolean
  valuesTick?: number
}

const getColumnSize = () => 12
const getColumnPadding = () => 4
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

const getComain = (items: readonly Data[]): NumberRange => {
  const numbers = items.reduce(
    (acc, curr) => acc.concat(curr.values.map(i => i.value)),
    [] as readonly number[]
  )
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

  const svgWidth = Math.round(width - paddingX)
  const svgHeight = Math.round(height - paddingY)

  const groupDomains = data.map(item => item.category)
  const valuesDomains = getComain(data)
  const barDomains = data.length ? data[0].values.map(item => item.description) : []

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
    <div ref={ref} className={css.main}>
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
            key={item.category}
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
