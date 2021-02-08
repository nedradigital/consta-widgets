import React from 'react'

import * as d3 from 'd3'
import { reverse } from 'lodash'

import { NotEmptyItem, ScaleLinear } from '../..'
import { Line } from '../Line'

import css from './index.css'

type Props = {
  scaleX: ScaleLinear
  scaleY: ScaleLinear
  maxPoints: readonly NotEmptyItem[]
  minPoints?: readonly NotEmptyItem[]
  clipPath?: string
}

export const THRESHOLD_COLOR = 'var(--color-bg-caution)'

export const getFillPoints = (
  maxPoints: readonly NotEmptyItem[],
  minPoints?: readonly NotEmptyItem[]
) => {
  if (!minPoints) {
    return []
  }

  const firstMaxPoint = maxPoints[0]
  const lastMinPoint = minPoints[minPoints.length - 1]

  return [
    ...maxPoints.slice(1),
    lastMinPoint,
    ...reverse(minPoints.slice(0, minPoints.length - 1)),
    firstMaxPoint,
  ]
}

export const isStraightLine = (items: readonly NotEmptyItem[], isHorizontal: boolean): boolean => {
  const getSecondaryValue = (item: NotEmptyItem) => item[isHorizontal ? 'y' : 'x']
  return items.every(item => getSecondaryValue(item) === getSecondaryValue(items[0]))
}

export const Threshold: React.FC<Props> = ({ scaleX, scaleY, maxPoints, minPoints, clipPath }) => {
  const getRectPath = d3
    .line<NotEmptyItem>()
    .x(({ x }) => scaleX(x))
    .y(({ y }) => scaleY(y))

  const fillPoints = getFillPoints(maxPoints, minPoints)
  const fillPath = getRectPath(fillPoints) || undefined

  const renderLine = (points: readonly NotEmptyItem[]) => (
    <Line
      className={css.line}
      points={points}
      scaleX={scaleX}
      scaleY={scaleY}
      shapeRendering={isStraightLine(points, true) ? 'crispEdges' : undefined}
      transform={'translate(0, 0.5)'}
      stroke={THRESHOLD_COLOR}
    />
  )

  return (
    <g className={css.wrapper} clipPath={clipPath} style={{ color: THRESHOLD_COLOR }}>
      {renderLine(maxPoints)}
      {minPoints && (
        <>
          <path className={css.fill} d={fillPath} />
          {renderLine(minPoints)}
        </>
      )}
    </g>
  )
}
