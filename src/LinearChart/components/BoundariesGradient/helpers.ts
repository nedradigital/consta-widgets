import _ from 'lodash'

import { Boundary, DirectionX, DirectionY, NumberRange, ScaleLinear } from '@/LinearChart'

const SHIFT_VALUE = 1

export const getBoundaries = ({
  boundaries,
  domain,
  color,
}: {
  boundaries: readonly Boundary[]
  domain: NumberRange
  color: string
}): readonly Boundary[] => {
  const numbers = boundaries.map(item => item.value).flat()
  const min = _.min(numbers)
  const max = _.max(numbers)
  const [minDomain, maxDomain] = _.sortBy(domain)

  return [
    ...boundaries,
    ...(_.isNumber(min) && min > minDomain ? [{ color, value: [minDomain, min] as const }] : []),
    ...(_.isNumber(max) && max < maxDomain ? [{ color, value: [max, maxDomain] as const }] : []),
  ]
}

export const getOffsets = ({
  values,
  scale,
  chartSize,
  isHorizontal,
  directionX,
  directionY,
}: {
  values: Boundary['value']
  scale: ScaleLinear
  chartSize: number
  directionX: DirectionX
  directionY: DirectionY
  isHorizontal: boolean
}) => {
  const getOffset = (value: number, index: number) => {
    const sign = (isHorizontal ? directionY === 'toBottom' : directionX === 'toRight') ? -1 : 1
    const percentage = (scale(value) * 100) / chartSize

    return _.round(percentage + (index === 0 ? -SHIFT_VALUE : SHIFT_VALUE) * sign, 3)
  }

  /**
   * Тут необходимо делать 2 сортировки, потому что первоначальные данные могут придти в разном порядке.
   * Нам требуется строгий порядок по возрастанию. Вторая сортировка нужна, чтобы получившиеся процента тоже шли
   * по порядку, иначе градиент может построиться не корректный.
   */
  return _.sortBy(_.sortBy(values).map(getOffset))
}
