import React from 'react'

import classnames from 'classnames'

import { HoveredMainValue, Item, ScaleLinear } from '../../'
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
  hoveredMainValue: HoveredMainValue
  isHorizontal: boolean
}

const isActiveCircle = (position: Item, isHorizontal: boolean, activeValue?: number) => {
  return (isHorizontal ? position.x : position.y) === activeValue
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
  hoveredMainValue,
  isHorizontal,
}) => {
  return (
    <g style={{ color }} className={css.main}>
      <Line
        className={css.line}
        points={values}
        scaleX={scaleX}
        scaleY={scaleY}
        clipPath={lineClipPath}
      />
      <g clipPath={dotsClipPath}>
        {values.map((item, idx) => {
          const isActive = isActiveCircle(item, isHorizontal, hoveredMainValue)
          const radius = hasDotRadius || isActive ? defaultDotRadius : 0
          const radiusCircle = isActive ? radius * 2 : radius

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
            />
          )
        })}
      </g>
    </g>
  )
}
