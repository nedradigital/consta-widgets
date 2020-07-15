import React from 'react'
import { useUID } from 'react-uid'

import * as d3 from 'd3'

import { DirectionX, DirectionY } from '@/LinearChart'

import { NotEmptyItem, ScaleLinear } from '../../'

type Props = {
  values: readonly NotEmptyItem[]
  color: string
  scaleX: ScaleLinear
  scaleY: ScaleLinear
  isHorizontal: boolean
  areaBottom: number
  directionX: DirectionX
  directionY: DirectionY
}

const getGradientDirection = ({
  isHorizontal,
  directionX,
  directionY,
}: {
  isHorizontal: boolean
  directionX: DirectionX
  directionY: DirectionY
}) => {
  if (isHorizontal && directionY === 'toBottom') {
    return {
      x1: '0%',
      y1: '100%',
      x2: '0%',
      y2: '0%',
    }
  }

  if (isHorizontal && directionY === 'toTop') {
    return {
      x1: '0%',
      y1: '0%',
      x2: '0%',
      y2: '100%',
    }
  }

  if (!isHorizontal && directionX === 'toLeft') {
    return {
      x1: '0%',
      y1: '0%',
      x2: '100%',
      y2: '0%',
    }
  }

  if (!isHorizontal && directionX === 'toRight') {
    return {
      x1: '100%',
      y1: '0%',
      x2: '0%',
      y2: '0%',
    }
  }
}

export const Area: React.FC<Props> = ({
  values,
  color,
  scaleX,
  scaleY,
  isHorizontal,
  areaBottom,
  directionX,
  directionY,
}) => {
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
        {...getGradientDirection({ isHorizontal, directionX, directionY })}
      >
        <stop offset="0%" stopColor={color} stopOpacity="0.4" />
        <stop offset="100%" stopColor={color} stopOpacity="0" />
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
