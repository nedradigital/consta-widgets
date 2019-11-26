import React, { Fragment } from 'react'

import classnames from 'classnames'
import * as _ from 'lodash'

import { angleToCoord, Axis, RadarChartFormatLabel, RadarChartLabelSize } from '../../'

import css from './index.css'

function mapHandlerByCondition<T>(condition: boolean, handler: T) {
  return condition ? handler : undefined
}

type Props = {
  ticks: number
  maxValue: number
  backgroundColor: string
  axesAngles: readonly Axis[]
  labelSize: RadarChartLabelSize
  formatLabel: RadarChartFormatLabel
  isHoverable: boolean
  colors?: readonly string[]
  activeAxis?: Axis
  onMouseEnter: (axis: Axis) => void
  onMouseLeave: () => void
}

export const RadarChartAxes: React.FC<Props> = ({
  ticks,
  maxValue,
  backgroundColor,
  axesAngles,
  labelSize,
  formatLabel,
  isHoverable,
  colors,
  activeAxis,
  onMouseEnter,
  onMouseLeave,
}) => {
  const circles = _.times(ticks, v => {
    const fraction = (v + 1) / ticks
    return {
      r: fraction / 2,
      label: formatLabel(_.round(fraction * maxValue, 2)),
    }
  })

  const activeAxisCoords = activeAxis
    ? angleToCoord(activeAxis.angle, 1)
    : { xPercent: 0, yPercent: 0 }

  return (
    <g className={css.main}>
      {circles.map((circle, idx) => {
        const circleColor = colors && colors[idx]

        return (
          <Fragment key={idx}>
            <circle
              cx="50%"
              cy="50%"
              r={`${circle.r * 100}%`}
              className={css.circle}
              style={
                circleColor
                  ? {
                      stroke: circleColor,
                      opacity: 0.3,
                    }
                  : undefined
              }
            />
            <foreignObject x="50%" y={`${50 - 100 * circle.r}%`}>
              <div
                key={idx}
                className={classnames(
                  css.label,
                  {
                    s: css.sizeS,
                    m: css.sizeM,
                  }[labelSize]
                )}
                style={{ backgroundColor }}
              >
                <span className={css.labelText}>{circle.label}</span>
              </div>
            </foreignObject>
          </Fragment>
        )
      })}

      <g opacity={0.2}>
        <circle cx="50%" cy="50%" r={3} className={css.innerCircle} />
        {axesAngles.map((axis, idx) => {
          const coords = angleToCoord(axis.angle, 1)

          return (
            <g key={idx}>
              <line
                x1="50%"
                y1="50%"
                x2={`${coords.xPercent}%`}
                y2={`${coords.yPercent}%`}
                className={classnames(css.axisArea, isHoverable && css.isHoverable)}
                onMouseEnter={mapHandlerByCondition(isHoverable, () => onMouseEnter(axis))}
                onMouseLeave={mapHandlerByCondition(isHoverable, onMouseLeave)}
              />
              <line
                x1="50%"
                y1="50%"
                x2={`${coords.xPercent}%`}
                y2={`${coords.yPercent}%`}
                className={css.axis}
              />
            </g>
          )
        })}
      </g>

      {activeAxis && isHoverable && (
        <line
          x1="50%"
          y1="50%"
          x2={`${activeAxisCoords.xPercent}%`}
          y2={`${activeAxisCoords.yPercent}%`}
          className={css.axis}
        />
      )}
    </g>
  )
}
