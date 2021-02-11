import React from 'react'

import classnames from 'classnames'
import * as _ from 'lodash'

import {
  DirectionX,
  DirectionY,
  HoveredDotValue,
  HoveredMainValue,
  Item,
  itemIsNotEmpty,
  ScaleLinear,
} from '../..'
import { Area } from '../Area'
import { Line } from '../Line'

import css from './index.css'

type GradientProps =
  | {
      withGradient: false
    }
  | {
      withGradient: true
      gradientDirectionX?: DirectionX
      gradientDirectionY: DirectionY
      areaBottom: number
    }

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
  hoveredDotValue: HoveredDotValue
  showValues?: boolean
  dashed?: boolean
} & GradientProps

const isActiveLineCircle = (position: Item, activeValue?: number) => {
  return position.x === activeValue
}

const isActiveDotCircle = (position: Item, activeValue?: Item) => {
  return _.isEqual(position, activeValue)
}

export const LINE_WIDTH = 2

export const LineWithDots: React.FC<Props> = props => {
  const {
    values,
    color,
    hasDotRadius,
    defaultDotRadius,
    scaleX,
    scaleY,
    lineClipPath,
    dotsClipPath,
    hoveredMainValue,
    hoveredDotValue,
    showValues,
    dashed,
  } = props

  return (
    <g className={css.main}>
      <g clipPath={lineClipPath}>
        <Line
          points={values}
          scaleX={scaleX}
          scaleY={scaleY}
          stroke={color}
          strokeWidth={LINE_WIDTH}
          dashed={dashed}
        />

        {props.withGradient && (
          <Area
            values={values.filter(itemIsNotEmpty)}
            color={color}
            scaleX={scaleX}
            scaleY={scaleY}
            areaBottom={props.areaBottom}
            directionX={props.gradientDirectionX}
            directionY={props.gradientDirectionY}
          />
        )}
      </g>

      <g clipPath={dotsClipPath}>
        {values.filter(itemIsNotEmpty).map((item, idx, items) => {
          const isActive =
            isActiveLineCircle(item, hoveredMainValue) || isActiveDotCircle(item, hoveredDotValue)
          const radius = hasDotRadius || isActive || items.length === 1 ? defaultDotRadius : 0
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
              color={color}
            />
          )
        })}
      </g>
      {showValues && (
        <g clipPath={dotsClipPath}>
          {values.filter(itemIsNotEmpty).map((item, idx) => {
            return (
              <text
                key={idx}
                x={scaleX(item.x)}
                y={scaleY(item.y)}
                className={classnames(css.label, css.isHorizontal)}
                textAnchor="middle"
              >
                {item.y}
              </text>
            )
          })}
        </g>
      )}
    </g>
  )
}
