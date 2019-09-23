/* tslint:disable:readonly-array */
import React, { useLayoutEffect } from 'react'

import * as d3 from 'd3'

import { Item } from '../../'

import css from './index.css'

type Props = {
  values: Item[]
  color: string
  dotRadius?: number
  lineClipPath: string
  dotsClipPath: string
  scaleX: d3.ScaleLinear<number, number>
  scaleY: d3.ScaleLinear<number, number>
}

export const Line: React.FC<Props> = ({
  values,
  color,
  dotRadius,
  scaleX,
  scaleY,
  lineClipPath,
  dotsClipPath,
}) => {
  const lineRef = React.createRef<SVGPathElement>()
  const dotsRef = React.createRef<SVGGElement>()

  useLayoutEffect(() => {
    // Line
    d3.select(lineRef.current)
      .datum(values)
      .attr(
        'd',
        d3
          .line<Item>()
          .x(({ x }) => scaleX(x))
          .y(({ y }) => scaleY(y))
      )

    // Dots
    if (dotRadius) {
      d3.select(dotsRef.current)
        .selectAll('circle')
        .data(values)
        .join('circle')
        .attr('class', css.circle)
        .attr('cx', d => scaleX(d.x))
        .attr('cy', d => scaleY(d.y))
        .attr('r', dotRadius)
    }
  })

  return (
    <g style={{ color }}>
      <path ref={lineRef} className={css.line} clipPath={lineClipPath} />
      <g ref={dotsRef} clipPath={dotsClipPath} />
    </g>
  )
}
