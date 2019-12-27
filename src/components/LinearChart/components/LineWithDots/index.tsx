import React from 'react'

import classnames from 'classnames'

import { Item, ScaleLinear } from '../../'
import { Function } from '../HoverLines'
import { Line } from '../Line'

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

export const LineWithDots: React.FC<Props> = ({
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
  return (
    <g style={{ color }}>
      <Line
        className={css.line}
        points={values}
        scaleX={scaleX}
        scaleY={scaleY}
        clipPath={lineClipPath}
      />
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
