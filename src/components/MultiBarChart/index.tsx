import React, { useLayoutEffect, useRef, useState } from 'react'
import { useUID } from 'react-uid'

import useComponentSize from '@rehooks/component-size'
import * as d3 from 'd3'
import { isEqual } from 'lodash'

import { Axis } from '@/components/BarChart/components/Axis'
import { ColorGroups } from '@/dashboard/types'

import { Control } from './components/Control'
import { MultiBar } from './components/MultiBar'
import { Tooltip } from './components/Tooltip'
import css from './index.css'

export type Orientation = 'horizontal' | 'vertical'

export type Value = {
  [key: string]: string | number
}

export type Data = {
  categories: readonly string[]
  values: readonly Value[]
  keyGroup: string
  additionalKeyGroup?: string
}

type Props = {
  data: Data
  orientation: Orientation
  valuesTick?: number
  hasRatio?: boolean
  colorGroups: ColorGroups
}

type Result = {
  [key: number]: Layer | number | string
}

export type Layers = readonly Layer[] & {
  index: number
  key: string
}

export type Layer = {
  0: number
  1: number
  data: Value
}

export const MultiBarChart: React.FC<Props> = ({
  data,
  orientation,
  valuesTick = 4,
  hasRatio,
  colorGroups,
}) => {
  const [paddingX, setPaddingX] = useState(0)
  const [paddingY, setPaddingY] = useState(0)
  const [showValues, setShowValues] = useState(false)
  const ref = useRef(null)
  const { width, height } = useComponentSize(ref)
  const [{ svgWidth, svgHeight }, setSizeSvg] = useState({ svgWidth: 0, svgHeight: 0 })
  const uid = useUID()
  const clipId = `multibarchart_clipPath_${uid}`
  const keys = data.categories
  const { values, keyGroup, additionalKeyGroup } = data
  const isVertical = orientation !== 'horizontal'

  useLayoutEffect(() => {
    const w = Math.round(width - paddingX) || 0
    const h = Math.round(height - paddingY) || 0

    setSizeSvg({ svgWidth: w, svgHeight: h })
  }, [width, height, paddingX, paddingY])

  const changeShowValues = () => {
    setShowValues(!showValues)
  }

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

    if (!isEqual(newPaddings, { paddingX, paddingY })) {
      setPaddingX(yAxisWidth)
      setPaddingY(xAxisHeight)
    }
  }

  const getLayers = () => {
    const stack = d3.stack<Result>().keys([...keys])
    // нормализовать значения на графике
    if (hasRatio) {
      stack.offset(d3.stackOffsetExpand)
    }

    return stack([...values]) as readonly Layers[]
  }

  const groupDomains = values.map(d => String(d[keyGroup]))
  const layers = getLayers()
  const yStackMax = d3.max(layers, layer => d3.max(layer, d => d[1])) || 0

  const xScale = d3
    .scaleBand()
    .paddingInner(0.05)
    .align(0.1)
    .domain(groupDomains)
    .range(isVertical ? [0, svgWidth] : [svgHeight, 0])

  const yScale = d3
    .scaleLinear()
    .domain([0, yStackMax])
    .range(isVertical ? [svgHeight, 0] : [0, svgWidth])

  return (
    <div
      ref={ref}
      className={css.main}
      style={{
        paddingLeft: paddingX,
      }}
    >
      <svg className={css.icon} width={svgWidth} height={svgHeight}>
        <defs>
          <clipPath id={clipId}>
            {/* 100 - сделано для того, чтобы не обрезались tooltip/complex tooltip */}
            <rect width={svgWidth + 200} height={svgHeight + 200} y={-100} x={-100} />
          </clipPath>
        </defs>
        <Axis
          width={svgWidth}
          height={svgHeight}
          groupScale={xScale}
          valuesScale={yScale}
          valuesTick={valuesTick}
          orientation={orientation}
          onAxisSizeChange={onAxisSizeChange}
          valuesSpecifier={hasRatio ? '%' : undefined}
        />
        {layers.map((d, idx) => (
          <MultiBar
            key={idx}
            data={d}
            keyGroup={keyGroup}
            clipId={clipId}
            showValues={showValues}
            isVertical={isVertical}
            xScale={xScale}
            yScale={yScale}
            paddingX={paddingX}
            color={colorGroups[d.key]}
            svgWidth={svgWidth}
            svgHeight={svgHeight}
            countLayers={values.length}
            additionalKeyGroup={additionalKeyGroup}
          />
        ))}
      </svg>
      <Control paddingX={paddingX} changeDisplayValues={changeShowValues} />
      <Tooltip isVertical={isVertical} />
    </div>
  )
}
