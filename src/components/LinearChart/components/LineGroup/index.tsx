import React, { createRef, useLayoutEffect } from 'react'

import classnames from 'classnames'
import * as d3 from 'd3'

import { Line, Orientation } from '@/components/LinearChart'

import css from './index.css'

export const LineGroup: React.FC<{
  item: Line
  width: number
  height: number
  valueRange: [number, number]
  orientation: Orientation
}> = ({ item, width, height, valueRange, orientation }) => {
  const lineValueRange = item.valueRange || valueRange
  const lineRef = createRef<SVGPathElement>()
  const backgroundRef = createRef<SVGPathElement>()
  const circleRef = createRef<SVGCircleElement>()
  const isHorizontal = orientation === 'horizontal'

  useLayoutEffect(() => {
    const widthRange = [0, width]
    const heightRange = [height, 0]

    const scaleHeight = d3.scaleLinear()
    const scaleWidth = d3.scaleLinear()

    const itemsRange = [0, item.values.length - 1]

    scaleWidth.domain(isHorizontal ? itemsRange : lineValueRange).range(widthRange)
    scaleHeight.domain(isHorizontal ? lineValueRange : itemsRange).range(heightRange)

    const LineBackground = d3
      .line<number>()
      .x((value, index) => scaleWidth(isHorizontal ? index : value))
      .y((value, index) => scaleHeight(isHorizontal ? value : index))

    d3.select(lineRef.current)
      .datum(item.values)
      .attr('d', LineBackground)

    if (item.circle) {
      d3.select(circleRef.current)
        .datum(item.values[item.values.length - 1])
        .attr('r', 2)
        .attr('cx', widthRange[1])
        .attr('cy', value => scaleHeight(value))
    }

    if (item.background) {
      const AreaForeground = d3
        .area<number>()
        .x((_, index) => scaleWidth(index))
        .y0(heightRange[0])
        .y1(value => scaleHeight(value))

      d3.select(backgroundRef.current)
        .datum(item.values)
        .attr('d', AreaForeground)
    }
  })

  return (
    <g>
      <path
        ref={lineRef}
        className={classnames(css.line, item.classNameLine)}
        style={{
          ...item.lineStyles,
          stroke: item.colors.line,
        }}
      />

      {item.background && <path ref={backgroundRef} style={item.areaStyles} />}

      {item.circle && (
        <circle
          ref={circleRef}
          style={{
            fill: item.colors.line,
            ...item.circleStyles,
          }}
        />
      )}
    </g>
  )
}
