import React, { createRef, useLayoutEffect } from 'react'

import classnames from 'classnames'
import * as d3 from 'd3'

import { Line, Orientation } from '@/legacy/LinearChart'

import css from './index.css'

/* tslint:disable-next-line:readonly-array */
type WritableNumberTuple = [number, number] // для d3

export const LineGroup: React.FC<{
  item: Line
  width: number
  height: number
  valueRange: readonly [number, number]
  orientation: Orientation
}> = ({ item, width, height, valueRange, orientation }) => {
  const lineValueRange = (item.valueRange || valueRange) as Writeable<typeof valueRange>
  const lineRef = createRef<SVGPathElement>()
  const backgroundRef = createRef<SVGPathElement>()
  const circleRef = createRef<SVGCircleElement>()
  const isHorizontal = orientation === 'horizontal'

  useLayoutEffect(() => {
    const widthRange: WritableNumberTuple = [0, width]
    const heightRange: WritableNumberTuple = [height, 0]

    const scaleHeight = d3.scaleLinear()
    const scaleWidth = d3.scaleLinear()

    const itemValues = item.values as Writeable<typeof item.values>
    const itemsRange: WritableNumberTuple = [0, itemValues.length - 1]

    scaleWidth.domain(isHorizontal ? itemsRange : lineValueRange).range(widthRange)
    scaleHeight.domain(isHorizontal ? lineValueRange : itemsRange).range(heightRange)

    const LineBackground = d3
      .line<number>()
      .x((value, index) => scaleWidth(isHorizontal ? index : value))
      .y((value, index) => scaleHeight(isHorizontal ? value : index))

    d3.select(lineRef.current)
      .datum(itemValues)
      .attr('d', LineBackground)

    if (circleRef.current) {
      d3.select(circleRef.current)
        .datum(item.values[item.values.length - 1])
        .attr('r', 2)
        .attr('cx', value => (isHorizontal ? widthRange[1] : scaleWidth(value)))
        .attr('cy', value => (isHorizontal ? scaleHeight(value) : heightRange[1]))
    }

    if (backgroundRef.current) {
      const AreaForeground = isHorizontal
        ? d3
            .area<number>()
            .x((_, index) => scaleWidth(index))
            .y0(heightRange[0])
            .y1(value => scaleHeight(value))
        : d3
            .area<number>()
            .x0(widthRange[0])
            .x1(value => scaleWidth(value))
            .y((_, index) => scaleHeight(index))

      d3.select(backgroundRef.current)
        .datum(itemValues)
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
          stroke: item.color,
        }}
      />

      {item.areaStyles && <path ref={backgroundRef} style={item.areaStyles} />}

      {item.circle && (
        <circle
          ref={circleRef}
          style={{
            fill: item.color,
            ...item.circleStyles,
          }}
        />
      )}
    </g>
  )
}
