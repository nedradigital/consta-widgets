import { sortBy } from 'lodash'

import { Boundary, DirectionX, DirectionY, ScaleLinear } from '@/LinearChart'

import { LINE_WIDTH } from '../LineWithDots'

export const getOffsets = ({
  values,
  scale,
  chartSize,
  directionX,
  directionY,
  isHorizontal,
}: {
  values: Boundary['value']
  scale: ScaleLinear
  chartSize: number
  directionX: DirectionX
  directionY: DirectionY
  isHorizontal: boolean
}) => {
  const getOffset = (value: number) => {
    // Смещаем градиент так, чтобы прямые линии на границах красились в нужный цвет
    const sign = (isHorizontal ? directionY === 'toBottom' : directionX === 'toRight') ? -1 : 1
    const multiplier = isHorizontal ? 1 : 2

    return (scale(value) + sign * multiplier * LINE_WIDTH) / chartSize
  }

  return sortBy(values.map(getOffset))
}
