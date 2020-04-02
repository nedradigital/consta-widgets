import React, { Fragment } from 'react'

import { Text } from '@gpn-design/uikit'
import * as _ from 'lodash'

import { FormatValue } from '@/dashboard'
import { getFormattedValue } from '@/utils/chart'
import { TextSize } from '@/utils/ui-kit'

import { angleToCoord, Axis, RadarChartLabelSize } from '../../'

import css from './index.css'

type Props = {
  ticks: number
  maxValue: number
  backgroundColor: string
  axesAngles: readonly Axis[]
  labelSize: RadarChartLabelSize
  formatValueForLabel?: FormatValue
  colors?: readonly string[]
  activeAxis?: Axis
  onChangeActiveAxis: (axis?: Axis) => void
}

const labelTextSizes: Record<RadarChartLabelSize, TextSize> = {
  s: '2xs',
  m: 'xs',
}

export const RadarChartAxes: React.FC<Props> = ({
  ticks,
  maxValue,
  backgroundColor,
  axesAngles,
  labelSize,
  formatValueForLabel,
  colors,
  activeAxis,
  onChangeActiveAxis,
}) => {
  const circles = _.times(ticks, v => {
    const fraction = (v + 1) / ticks
    return {
      r: fraction / 2,
      label: getFormattedValue(_.round(fraction * maxValue, 2), formatValueForLabel),
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
              <div key={idx} className={css.label} style={{ backgroundColor }}>
                <Text
                  tag="div"
                  size={labelTextSizes[labelSize]}
                  weight={labelSize === 'm' ? 'bold' : undefined}
                  view="secondary"
                  className={css.labelText}
                >
                  {circle.label}
                </Text>
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
                className={css.axisArea}
                onMouseEnter={() => onChangeActiveAxis(axis)}
                onMouseLeave={() => onChangeActiveAxis(undefined)}
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

      {activeAxis && (
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
