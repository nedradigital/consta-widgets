import React, { createRef, useLayoutEffect, useState } from 'react'

import classnames from 'classnames'
import * as d3 from 'd3'
import { SeriesPoint } from 'd3'

import { ElementType, GeologyIntervals } from '../SludgeBlock'

import css from './index.css'

type Props = {
  className?: string
  geologyIntervals?: GeologyIntervals
  elements?: readonly ElementType[]
  hoveredElement?: string
  maxDepthSteps?: number
}

type Result = {
  depth: number
  [key: string]: number
}

const svgDropShadow = 'svgDropShadow'

const gradients = [
  'linearGradient1',
  'linearGradient2',
  'linearGradient3',
  'linearGradient4',
  'linearGradient5',
  'linearGradient6',
  'linearGradient7',
  'linearGradient8',
] as const

export const SludgeChart: React.FC<Props> = ({
  maxDepthSteps = 5,
  className,
  geologyIntervals = [],
  hoveredElement,
  elements = [],
}) => {
  const [height, changeHeight] = useState(0)
  const [width, changeWidth] = useState(0)
  const ref = createRef<SVGSVGElement>()

  const depths = geologyIntervals
    .reduce(
      (acc, interval) =>
        acc.concat([interval.depthInterval.top || 0, interval.depthInterval.bottom || 0]),
      [] as readonly number[]
    )
    .filter((depth, index, arr) => arr.indexOf(depth) === index)
    .sort()

  const minDepth = Math.min(...depths)
  const maxDepth = Math.max(...depths)
  const result = depths
    .filter((_, index, arr) => {
      const step = Math.round((arr.length - 1) / maxDepthSteps) || 1

      return (
        index === 0 ||
        index === arr.length - 1 ||
        (index % step === 0 && index <= arr.length - 1 - step)
      )
    })
    .sort()

  useLayoutEffect(() => {
    if (ref.current) {
      changeHeight(ref.current.getBoundingClientRect().height)
      changeWidth(ref.current.getBoundingClientRect().width)
    }
  })

  useLayoutEffect(() => {
    if (!width || !height) {
      return
    }

    const materials = elements.map(element => element.name)

    const data = depths.map(depth => {
      const interval = geologyIntervals.find(
        item => item.depthInterval.top === depth || item.depthInterval.bottom === depth
      )

      const acc = {
        depth,
      } as Result

      materials.map(material => {
        const element = interval ? interval.elements.find(item => item.name === material) : null

        acc[material] = element ? element.value : 0
      })

      return acc
    })

    const maxStackedValue = geologyIntervals.reduce((acc, interval) => {
      const stackedValue = interval.elements
        .map(element => element.value)
        .reduce((sum, value) => sum + value, 0)

      return stackedValue > acc ? stackedValue : acc
    }, 0)

    const scaleMaterials = d3
      .scaleLinear()
      .domain([0, maxStackedValue])
      .range([0, width])

    const scaleDepths = d3
      .scaleLinear()
      .domain([Math.min(...depths), Math.max(...depths)])
      .range([0, height])

    const stack = d3.stack<Result>().keys(materials.concat().reverse())

    const series = stack(data)

    const area = d3
      .area<SeriesPoint<Result>>()
      .x((_, i) => scaleDepths(depths[i]))
      .y0(d => scaleMaterials(d[0]))
      .y1(d => scaleMaterials(d[1]))

    d3.select(ref.current)
      .select('g')
      .attr('transform', 'translate(' + width + ', 0) rotate(90)')
      .selectAll('path')
      .data(series)
      .join('path')
      .attr('d', area)
      .attr('class', value => classnames(css.area, value.key === hoveredElement && css.hovered))
      .attr('style', (_, index: number) => `fill: url(#linearGradient${index + 1})`)
  })

  return (
    <div className={classnames(css.chart, className)}>
      <div className={css.scale}>
        {result.map((depth, index) => {
          return (
            <div
              className={css.scaleSection}
              style={{ top: ((depth - minDepth) / (maxDepth - minDepth)) * 100 + '%' }}
              key={depth}
            >
              {index > 0 && <div className={css.scaleSectionDepth}>{depth}</div>}
            </div>
          )
        })}
      </div>
      <svg className={css.svg} ref={ref}>
        <defs>
          <filter id={svgDropShadow}>
            <feDropShadow dx="0" dy="0" stdDeviation="5" />
          </filter>
          {gradients.map(name => (
            <linearGradient key={name} id={name} x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" className={classnames(css[name], css.start)} />
              <stop offset="100%" className={classnames(css[name], css.stop)} />
            </linearGradient>
          ))}
        </defs>
        <g />
      </svg>
    </div>
  )
}
