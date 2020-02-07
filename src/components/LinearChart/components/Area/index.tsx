import React from 'react'
import { useUID } from 'react-uid'

import * as d3 from 'd3'

import { NotEmptyItem, ScaleLinear } from '../../'

type Props = {
  values: readonly NotEmptyItem[]
  scaleX: ScaleLinear
  scaleY: ScaleLinear
  isHorizontal: boolean
  areaBottom: number
}

export const Area: React.FC<Props> = ({ values, scaleX, scaleY, isHorizontal, areaBottom }) => {
  const uid = useUID()
  const linearGradientId = `line_area_${uid}`
  const area = isHorizontal
    ? d3
        .area<NotEmptyItem>()
        .x(({ x }) => scaleX(x))
        .y1(({ y }) => scaleY(y))
        .y0(scaleY(areaBottom))
    : d3
        .area<NotEmptyItem>()
        .y(({ y }) => scaleY(y))
        .x0(({ x }) => scaleX(x))
        .x1(scaleX(areaBottom))

  return (
    <>
      <linearGradient
        id={linearGradientId}
        {...(isHorizontal
          ? { x1: '0%', y1: '0%', x2: '0%', y2: '100%' }
          : { x1: '100%', y1: '0%', x2: '0%', y2: '0%' })}
      >
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.4" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
      </linearGradient>
      <path
        d={area([...values]) || undefined}
        style={{
          fill: `url(#${linearGradientId})`,
        }}
      />
    </>
  )
}
