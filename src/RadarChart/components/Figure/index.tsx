import classnames from 'classnames'
import * as _ from 'lodash'

import { getSolidSegments } from '@/common/utils/line'
import { NotEmptyPoint, pointIsNotEmpty } from '@/RadarChart'

import { Point } from '../../'

import css from './index.css'

type Props = {
  size: number
  points: readonly Point[]
  lineColor: string
  withFill: boolean
}

type Segment = {
  type: 'solid' | 'dashed'
  points: readonly Point[]
}

export const CENTER_POINT = {
  xPercent: 50,
  yPercent: 50,
  label: null,
  axisName: '',
  originalValue: null,
}

export const divideBySegments = (points: readonly Point[]): readonly Segment[] => {
  const solidSegments = getSolidSegments<Point, NotEmptyPoint>(points, pointIsNotEmpty)

  return _.flatMap(solidSegments, (segment, idx) => {
    if (
      solidSegments.length === 1 &&
      (!pointIsNotEmpty(points[0]) || !pointIsNotEmpty(points[points.length - 1]))
    ) {
      if (solidSegments[0].points.length === 1) {
        return [
          {
            type: 'dashed',
            points: [CENTER_POINT, segment.points[0]],
          },
        ] as const
      }

      const lastPointWithDataIdx = _.findLastIndex(points, point => pointIsNotEmpty(point))
      const firstPointWithDataIdx = _.findIndex(points, point => pointIsNotEmpty(point))

      return [
        segment,
        {
          type: 'dashed',
          points: [points[lastPointWithDataIdx], CENTER_POINT, points[firstPointWithDataIdx]],
        },
      ] as const
    }

    if (solidSegments.length > 1 && idx === solidSegments.length - 1) {
      const previousSegment = solidSegments[idx - 1]
      const dashStart = previousSegment.points[previousSegment.points.length - 1]
      const dashEnd = segment.points[0]

      if (pointIsNotEmpty(points[0])) {
        return [
          {
            type: 'dashed',
            points: [dashStart, CENTER_POINT, dashEnd],
          },
          { ...segment, points: [...segment.points, points[0]] },
        ] as const
      }

      const closingDashStart = segment.points[segment.points.length - 1]
      const firstPointWithDataIdx = _.findIndex(points, point => pointIsNotEmpty(point))

      return [
        {
          type: 'dashed',
          points: [dashStart, CENTER_POINT, dashEnd],
        },
        segment,
        {
          type: 'dashed',
          points: [closingDashStart, CENTER_POINT, points[firstPointWithDataIdx]],
        },
      ] as const
    }

    if (idx > 0) {
      const previousSegment = solidSegments[idx - 1]
      const dashStart = previousSegment.points[previousSegment.points.length - 1]
      const dashEnd = segment.points[0]

      return [
        {
          type: 'dashed',
          points: [dashStart, CENTER_POINT, dashEnd],
        },
        segment,
      ] as const
    }

    return [segment]
  }).filter(segment => segment.points.length > 1)
}

const getLinePathD = ({
  points,
  size,
  isClosedPath,
}: {
  points: readonly Point[]
  size: number
  isClosedPath: boolean
}) => {
  const path = points
    .map((point, idx) =>
      [
        idx === 0 ? 'M' : 'L',
        (point.xPercent / 100) * size,
        ' ',
        (point.yPercent / 100) * size,
      ].join('')
    )
    .join(' ')

  return isClosedPath ? path + ' Z' : path
}

export const RadarChartFigure: React.FC<Props> = ({ size, points, lineColor, withFill }) => {
  const segments = divideBySegments(points)
  const fillPoints = _.flatMap(segments, segment => segment.points)
  const isClosedPath = segments.length === 1

  return (
    <>
      {withFill && (
        <path
          d={getLinePathD({ points: fillPoints, size, isClosedPath: true })}
          className={classnames(css.fill)}
          style={{
            fill: lineColor,
          }}
        />
      )}
      {segments.map((segment, idx) => (
        <path
          key={idx}
          d={getLinePathD({ points: segment.points, size, isClosedPath })}
          className={classnames(css.line, segment.type === 'dashed' && css.isDashed)}
          style={{
            stroke: lineColor,
          }}
        />
      ))}
    </>
  )
}
