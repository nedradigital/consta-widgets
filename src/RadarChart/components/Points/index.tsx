import React from 'react'

import { Point } from '../../'

type Props = {
  points: readonly Point[]
  lineColor: string
  activeAxis: string
  backgroundColor: string
}

const STROKE_WIDTH = 2

export const RadarChartPoints: React.FC<Props> = ({
  points,
  lineColor,
  activeAxis,
  backgroundColor,
}) => {
  return (
    <>
      {points.map((point, idx) => {
        const isActive = activeAxis === point.axisName

        return (
          <circle
            key={idx}
            cx={`${point.xPercent}%`}
            cy={`${point.yPercent}%`}
            r={2 + (isActive ? STROKE_WIDTH / 2 : 0)}
            fill={lineColor}
            stroke={backgroundColor}
            strokeWidth={isActive ? STROKE_WIDTH : 0}
            style={{
              pointerEvents: 'none',
            }}
          />
        )
      })}
    </>
  )
}
