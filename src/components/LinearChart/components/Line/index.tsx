import React, { useLayoutEffect } from 'react'

import classnames from 'classnames'
import * as d3 from 'd3'

import { Item, ScaleLinear } from '../../'
import { Function } from '../HoverLines'

import css from './index.css'

type Props = {
  values: readonly Item[]
  color: string
  hasDotRadius?: boolean
  defaultDotRadius: number
  lineClipPath: string
  dotsClipPath: string
  scaleX: ScaleLinear
  scaleY: ScaleLinear
  activeHoverLine?: number
  isVertical: boolean
  setActiveHoverLine: Function
}

const isActiveCircle = (position: Item, isVertical: boolean, activeAxis?: number) => {
  return (isVertical ? position.y : position.x) === activeAxis
}

export const Line: React.FC<Props> = ({
  values,
  color,
  hasDotRadius,
  defaultDotRadius,
  scaleX,
  scaleY,
  lineClipPath,
  dotsClipPath,
  activeHoverLine,
  isVertical,
  setActiveHoverLine,
}) => {
  const lineRef = React.createRef<SVGPathElement>()

  useLayoutEffect(() => {
    // Line
    d3.select(lineRef.current)
      .datum([...values])
      .attr(
        'd',
        d3
          .line<Item>()
          .x(({ x }) => scaleX(x))
          .y(({ y }) => scaleY(y))
      )
  })

  return (
    <g style={{ color }}>
      <path ref={lineRef} className={css.line} clipPath={lineClipPath} />
      <g clipPath={dotsClipPath}>
        {values.map((item, idx) => {
          const isActive = isActiveCircle(item, isVertical, activeHoverLine)
          const radius = hasDotRadius || isActive ? defaultDotRadius : 0
          const radiusCircle = isActive ? radius * 2 : radius
          const hoverLinePosition = isVertical ? item.y : item.x

          return (
            <circle
              key={idx}
              cx={scaleX(item.x)}
              cy={scaleY(item.y)}
              r={radiusCircle}
              className={classnames(css.circle, isActive && css.isActive)}
              style={{
                strokeWidth: radiusCircle,
              }}
              onMouseLeave={() => setActiveHoverLine()}
              onMouseEnter={() => setActiveHoverLine(hoverLinePosition)}
            />
          )
        })}
      </g>
    </g>
  )
}
