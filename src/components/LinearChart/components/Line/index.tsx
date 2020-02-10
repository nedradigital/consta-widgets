import classnames from 'classnames'
import * as d3 from 'd3'
import * as _ from 'lodash'

import { getSolidSegments } from '@/utils/line'

import { Item, itemIsNotEmpty, NotEmptyItem, ScaleLinear } from '../../'

import css from './index.css'

type SVGPPathAttributes = Omit<React.SVGAttributes<SVGPathElement>, 'points'>

type Props = SVGPPathAttributes & {
  points: readonly Item[]
  scaleX: ScaleLinear
  scaleY: ScaleLinear
}

type Segment = {
  type: 'solid' | 'dashed'
  points: readonly NotEmptyItem[]
}

export const divideBySegments = (points: readonly Item[]): readonly Segment[] => {
  const solidSegments = getSolidSegments<Item, NotEmptyItem>(points, itemIsNotEmpty)

  return _.flatMap(solidSegments, (segment, idx) => {
    // Между сплошными сегментами вставляем пунктирные для обозначения пропусков
    if (idx > 0) {
      const previousSegment = solidSegments[idx - 1]
      const dashStart = previousSegment.points[previousSegment.points.length - 1]
      const dashEnd = segment.points[0]

      return [
        {
          type: 'dashed',
          points: [dashStart, dashEnd],
        },
        segment,
      ] as const
    }

    return [segment]
  }).filter(segment => segment.points.length > 1)
}

export const Line: React.FC<Props> = ({ points, scaleX, scaleY, className, ...rest }) => {
  const segments = divideBySegments(points)
  const getLinePath = d3
    .line<NotEmptyItem>()
    .x(({ x }) => scaleX(x))
    .y(({ y }) => scaleY(y))

  return (
    <>
      {segments.map((segment, idx) => (
        <path
          key={idx}
          className={classnames(className, css.line, segment.type === 'dashed' && css.isDashed)}
          d={getLinePath([...segment.points]) || undefined}
          {...rest}
        />
      ))}
    </>
  )
}
