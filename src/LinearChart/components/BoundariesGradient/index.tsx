import { sortBy } from 'lodash'

import { Boundary, DirectionX, DirectionY, ScaleLinear } from '@/LinearChart'

import { getOffsets } from './helpers'

type Props = {
  id: string
  color: string
  boundaries: readonly Boundary[]
  scaleX: ScaleLinear
  scaleY: ScaleLinear
  svgHeight: number
  svgWidth: number
  directionX: DirectionX
  directionY: DirectionY
  isHorizontal: boolean
}

export const BoundariesGradient: React.FC<Props> = ({
  id,
  color,
  boundaries,
  scaleX,
  scaleY,
  svgHeight,
  svgWidth,
  directionX,
  directionY,
  isHorizontal,
}) => {
  const scale = isHorizontal ? scaleY : scaleX
  const chartSize = isHorizontal ? svgHeight : svgWidth
  const direction = isHorizontal
    ? { x1: '0%', x2: '0%', y1: '0%', y2: '100%' }
    : { x1: '0%', x2: '100%', y1: '0%', y2: '0%' }

  return (
    <linearGradient id={id} gradientUnits="userSpaceOnUse" {...direction}>
      {sortBy(
        boundaries.map(boundary => ({
          offsets: getOffsets({
            values: boundary.value,
            scale,
            chartSize,
            directionX,
            directionY,
            isHorizontal,
          }),
          boundaryColor: boundary.color,
        })),
        b => b.offsets[0]
      )
        .filter(({ offsets }) => offsets.every(Number.isFinite))
        .map(({ offsets, boundaryColor }, index) => {
          return (
            <React.Fragment key={index}>
              <stop offset={offsets[0]} stopColor={color} />
              <stop offset={offsets[0]} stopColor={boundaryColor} />
              <stop offset={offsets[1]} stopColor={boundaryColor} />
              <stop offset={offsets[1]} stopColor={color} />
            </React.Fragment>
          )
        })}
    </linearGradient>
  )
}
