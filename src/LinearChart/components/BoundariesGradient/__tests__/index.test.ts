import { ScaleLinear } from '@/LinearChart'

import { getOffsets } from '../helpers'

describe('getOffsets', () => {
  const defaultParams = {
    values: [20, 5] as const,
    scale: (n => n) as ScaleLinear,
    chartSize: 100,
  } as const

  it('возвращает отсортированный массив смещений для градиента горизонтального графика', () => {
    const isHorizontal = true

    expect(
      getOffsets({
        ...defaultParams,
        directionX: 'toRight',
        directionY: 'toBottom',
        isHorizontal,
      })
    ).toEqual([0.03, 0.18])
    expect(
      getOffsets({
        ...defaultParams,
        directionX: 'toLeft',
        directionY: 'toBottom',
        isHorizontal,
      })
    ).toEqual([0.03, 0.18])

    expect(
      getOffsets({
        ...defaultParams,
        directionX: 'toRight',
        directionY: 'toTop',
        isHorizontal,
      })
    ).toEqual([0.07, 0.22])

    expect(
      getOffsets({
        ...defaultParams,
        directionX: 'toLeft',
        directionY: 'toTop',
        isHorizontal,
      })
    ).toEqual([0.07, 0.22])
  })

  it('возвращает отсортированный массив смещений для градиента вертикального графика', () => {
    const isHorizontal = false

    expect(
      getOffsets({
        ...defaultParams,
        directionX: 'toRight',
        directionY: 'toBottom',
        isHorizontal,
      })
    ).toEqual([0.01, 0.16])
    expect(
      getOffsets({
        ...defaultParams,
        directionX: 'toLeft',
        directionY: 'toBottom',
        isHorizontal,
      })
    ).toEqual([0.09, 0.24])

    expect(
      getOffsets({
        ...defaultParams,
        directionX: 'toRight',
        directionY: 'toTop',
        isHorizontal,
      })
    ).toEqual([0.01, 0.16])

    expect(
      getOffsets({
        ...defaultParams,
        directionX: 'toLeft',
        directionY: 'toTop',
        isHorizontal,
      })
    ).toEqual([0.09, 0.24])
  })
})
