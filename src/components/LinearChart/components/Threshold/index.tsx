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

export const Threshold: React.FC<Props> = ({ scaleX, scaleY, maxPoints, minPoints, clipPath }) => {
  const getRectPath = d3
    .line<NotEmptyItem>()
    .x(({ x }) => scaleX(x))
    .y(({ y }) => scaleY(y))

  const fillPoints = getFillPoints(maxPoints, minPoints)
  const fillPath = getRectPath(fillPoints) || undefined

  return (
    <g className={css.wrapper} clipPath={clipPath}>
      <Line className={css.line} points={maxPoints} scaleX={scaleX} scaleY={scaleY} />
      {minPoints && (
        <>
          <path className={css.fill} d={fillPath} />
          <Line className={css.line} points={minPoints} scaleX={scaleX} scaleY={scaleY} />
        </>
      )}
    </g>
  )
}
