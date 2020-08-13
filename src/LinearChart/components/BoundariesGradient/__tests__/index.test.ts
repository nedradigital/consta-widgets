import { ScaleLinear } from '@/LinearChart'

import { getBoundaries, getOffsets } from '../helpers'

describe('getBoundaries', () => {
  it('возвращает первоначальный массив границ', () => {
    const boundaries = [
      {
        color: 'red',
        value: [10, 15],
      },
      {
        color: 'yellow',
        value: [0, 10],
      },
    ] as const

    const result = getBoundaries({
      boundaries,
      domain: [0, 15],
      color: 'green',
    })

    expect(result).toEqual(boundaries)
  })

  it('возвращает обновленный массив границ с границей для оставшегося пространства', () => {
    const result = getBoundaries({
      boundaries: [
        {
          color: 'red',
          value: [10, 15],
        },
        {
          color: 'yellow',
          value: [5, 10],
        },
      ],
      domain: [0, 20],
      color: 'green',
    })

    expect(result).toEqual([
      {
        color: 'red',
        value: [10, 15],
      },
      {
        color: 'yellow',
        value: [5, 10],
      },
      {
        color: 'green',
        value: [0, 5],
      },
      {
        color: 'green',
        value: [15, 20],
      },
    ])
  })
})

describe('getOffsets', () => {
  const defaultParams = {
    values: [20, 5] as const,
    scale: (n => n) as ScaleLinear,
    chartSize: 100,
  } as const

  it('возвращает отсортированный массив смещений в процентах для градиента горизонтального графика', () => {
    const isHorizontal = true

    expect(
      getOffsets({
        ...defaultParams,
        directionX: 'toRight',
        directionY: 'toBottom',
        isHorizontal,
      })
    ).toEqual([6, 19])
    expect(
      getOffsets({
        ...defaultParams,
        directionX: 'toLeft',
        directionY: 'toBottom',
        isHorizontal,
      })
    ).toEqual([6, 19])

    expect(
      getOffsets({
        ...defaultParams,
        directionX: 'toRight',
        directionY: 'toTop',
        isHorizontal,
      })
    ).toEqual([4, 21])

    expect(
      getOffsets({
        ...defaultParams,
        directionX: 'toLeft',
        directionY: 'toTop',
        isHorizontal,
      })
    ).toEqual([4, 21])
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
    ).toEqual([6, 19])
    expect(
      getOffsets({
        ...defaultParams,
        directionX: 'toLeft',
        directionY: 'toBottom',
        isHorizontal,
      })
    ).toEqual([4, 21])

    expect(
      getOffsets({
        ...defaultParams,
        directionX: 'toRight',
        directionY: 'toTop',
        isHorizontal,
      })
    ).toEqual([6, 19])

    expect(
      getOffsets({
        ...defaultParams,
        directionX: 'toLeft',
        directionY: 'toTop',
        isHorizontal,
      })
    ).toEqual([4, 21])
  })
})
