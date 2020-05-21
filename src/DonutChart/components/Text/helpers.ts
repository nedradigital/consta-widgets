import { deg2rad } from '@/common/utils/math'
import {
  isHalfDonutHorizontal as getIsHalfDonutHorizontal,
  isHalfDonutVertical as getIsHalfDonutVertical,
} from '@/DonutChart/helpers'

import { HalfDonut } from '../Donut'

const TEXT_CHORD_ANGLE_IN_RADIANS = deg2rad(40)
export const MIN_FONT_SIZE = 20
export const VALUE_MAX_FONT_SIZE = 96
export const TITLE_FONT_SIZE_RATIO = 0.4
export const SUBVALUE_FONT_SIZE_RATIO = 0.5

export const getContentBorderRadius = (radius: number, position?: HalfDonut) => {
  if (!position) {
    return `${radius}px`
  }

  const topLeft = ['bottom', 'right'].includes(position) ? radius : 0
  const topRight = ['bottom', 'left'].includes(position) ? radius : 0
  const bottomRight = ['top', 'left'].includes(position) ? radius : 0
  const bottomLeft = ['top', 'right'].includes(position) ? radius : 0

  return `${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px`
}

export const getContentHeight = ({
  diameter,
  radius,
  isHalfDonutHorizontal,
  isHalfDonutVertical,
  paddingFromBorder,
  paddingFromLine,
}: {
  diameter: number
  radius: number
  isHalfDonutHorizontal: boolean
  isHalfDonutVertical: boolean
  paddingFromBorder: number
  paddingFromLine: number
}) => {
  const isHalfDonut = isHalfDonutHorizontal || isHalfDonutVertical
  const countLines = isHalfDonut ? 1 : 2
  const offset = paddingFromBorder + paddingFromLine * countLines
  const height = isHalfDonutHorizontal ? radius : diameter

  return height - offset
}

export const getValueMaxFontSize = ({
  height,
  maxFontSize,
  halfDonut,
}: {
  height: number
  maxFontSize: number
  halfDonut?: HalfDonut
}) => {
  const ratio = getIsHalfDonutVertical(halfDonut) ? 4 : 2

  return Math.min(Math.round(height / ratio), maxFontSize)
}

/**
 * Расчитываем максимальную ширину текста по хорде окружности.
 */
export const getValueMaxWidth = (diameter: number, position?: HalfDonut) => {
  if (getIsHalfDonutHorizontal(position)) {
    return Math.round(diameter * Math.sin(TEXT_CHORD_ANGLE_IN_RADIANS))
  }

  return undefined
}
