import * as d3 from 'd3'

import { Item, NumberRange } from '../'
import {
  calculateSecondaryDomain,
  flipPointsOnAxes,
  getBoundary,
  getColorFromFirstLineWithBoundaries,
  getIndexWithFallbackToDefault,
  getMainTickValues,
  getSecondaryTickValues,
  getUniqValues,
  getXRange,
  getXScale,
  getYRange,
  getYScale,
  INITIAL_DOMAIN,
  invertDomain,
  padDomain,
  zoomDomain,
} from '../helpers'

const horizontalLine: ReadonlyArray<readonly Item[]> = [
  [
    { x: 1, y: 9 },
    { x: 3, y: 6 },
    { x: 5, y: 3 },
    { x: 7, y: 0 },
  ],
]

const verticalLine: ReadonlyArray<readonly Item[]> = [
  [
    { x: 9, y: 1 },
    { x: 6, y: 3 },
    { x: 3, y: 5 },
    { x: 0, y: 7 },
  ],
]

const horizontalLines: ReadonlyArray<readonly Item[]> = [
  ...horizontalLine,
  [
    { x: 1, y: -4 },
    { x: 3, y: 2 },
    { x: 5, y: 6 },
    { x: 7, y: 10 },
  ],
]

const verticalLines: ReadonlyArray<readonly Item[]> = [
  ...verticalLine,
  [
    { x: -4, y: 1 },
    { x: 2, y: 3 },
    { x: 6, y: 5 },
    { x: 10, y: 7 },
  ],
]

// Заменяем методы из LinearChart на более простую реализацию чтобы в расчетах не использовались константные отступы.
const getXDomain = (items: readonly Item[]) => d3.extent(items, v => v.x) as NumberRange
const getInvertedXDomain = (items: readonly Item[]) => invertDomain(getXDomain(items))
const getYDomain = (items: readonly Item[]) => d3.extent(items, v => v.y) as NumberRange
const getInvertedYDomain = (items: readonly Item[]) => invertDomain(getYDomain(items))

describe('calculateSecondaryDomain', () => {
  describe('горизонтальный график', () => {
    it('рассчитывает второстепенный домен для одной линии', () => {
      const domain = calculateSecondaryDomain({
        mainDomainMin: 2,
        mainDomainMax: 6,
        linesValues: horizontalLine,
        getValue: v => v.x,
        getDomain: getYDomain,
        isInverted: false,
      })
      expect(domain).toEqual([0, 9])
    })

    it('рассчитывает второстепенный домен для нескольких линии', () => {
      const domain = calculateSecondaryDomain({
        mainDomainMin: 2,
        mainDomainMax: 6,
        linesValues: horizontalLines,
        getValue: v => v.x,
        getDomain: getYDomain,
        isInverted: false,
      })
      expect(domain).toEqual([-4, 10])
    })

    it('рассчитывает перевёрнутый второстепенный домен для нескольких линии', () => {
      const domain = calculateSecondaryDomain({
        mainDomainMin: 2,
        mainDomainMax: 6,
        linesValues: horizontalLines,
        getValue: v => v.x,
        getDomain: getInvertedYDomain,
        isInverted: true,
      })
      expect(domain).toEqual([10, -4])
    })

    it('рассчитывает второстепенный домен в максимальном левом положении', () => {
      const domain = calculateSecondaryDomain({
        mainDomainMin: 1,
        mainDomainMax: 2,
        linesValues: horizontalLine,
        getValue: v => v.x,
        getDomain: getYDomain,
        isInverted: false,
      })
      expect(domain).toEqual([6, 9])
    })

    it('рассчитывает второстепенный домен в максимальном правом положении', () => {
      const domain = calculateSecondaryDomain({
        mainDomainMin: 6,
        mainDomainMax: 7,
        linesValues: horizontalLine,
        getValue: v => v.x,
        getDomain: getYDomain,
        isInverted: false,
      })
      expect(domain).toEqual([0, 3])
    })

    it('рассчитывает второстепенный домен, когда есть пропуски в середине', () => {
      const domain = calculateSecondaryDomain({
        mainDomainMin: 1,
        mainDomainMax: 2,
        linesValues: [
          [
            { x: -1, y: -1 },
            { x: 0, y: 0 },
            { x: 1, y: null },
            { x: 2, y: null },
            { x: 3, y: 3 },
            { x: 4, y: 4 },
          ],
        ],
        getValue: v => v.x,
        getDomain: getYDomain,
        isInverted: false,
      })
      expect(domain).toEqual([0, 3])
    })

    it('рассчитывает второстепенный домен, когда есть пропуски в начале', () => {
      const domain = calculateSecondaryDomain({
        mainDomainMin: 0,
        mainDomainMax: 3,
        linesValues: [
          [
            { x: 0, y: null },
            { x: 1, y: null },
            { x: 2, y: 2 },
            { x: 3, y: 3 },
          ],
        ],
        getValue: v => v.x,
        getDomain: getYDomain,
        isInverted: false,
      })
      expect(domain).toEqual([2, 3])
    })

    it('возвращает нулевой домен, если все значения — пропуски', () => {
      const domain = calculateSecondaryDomain({
        mainDomainMin: 1,
        mainDomainMax: 2,
        linesValues: [
          [
            { x: 0, y: null },
            { x: 1, y: null },
            { x: 2, y: null },
          ],
        ],
        getValue: v => v.x,
        getDomain: getYDomain,
        isInverted: false,
      })
      expect(domain).toEqual([0, 0])
    })
  })

  describe('вертикальный график', () => {
    it('рассчитывает второстепенный домен для одной линии', () => {
      const domain = calculateSecondaryDomain({
        mainDomainMin: 1.5,
        mainDomainMax: 7.5,
        linesValues: verticalLine,
        getValue: v => v.y,
        getDomain: getXDomain,
        isInverted: false,
      })
      expect(domain).toEqual([0, 9])
    })

    it('рассчитывает второстепенный домен для нескольких линии', () => {
      const domain = calculateSecondaryDomain({
        mainDomainMin: 2,
        mainDomainMax: 6,
        linesValues: verticalLines,
        getValue: v => v.y,
        getDomain: getXDomain,
        isInverted: false,
      })
      expect(domain).toEqual([-4, 10])
    })

    it('рассчитывает перевёрнутый второстепенный домен для нескольких линии', () => {
      const domain = calculateSecondaryDomain({
        mainDomainMin: 2,
        mainDomainMax: 6,
        linesValues: verticalLines,
        getValue: v => v.y,
        getDomain: getInvertedXDomain,
        isInverted: true,
      })
      expect(domain).toEqual([10, -4])
    })
  })
})

describe('getMainTickValues', () => {
  const values = [
    { x: 0, y: 9 },
    { x: 1, y: 6 },
    { x: 2, y: 3 },
    { x: 3, y: 0 },
  ] as const

  describe('горизонтальный график', () => {
    const isHorizontal = true
    const commonParams = {
      items: flipPointsOnAxes(values, isHorizontal),
      domain: [0, 3],
      isHorizontal,
    } as const

    it('вернёт пустой массив', () => {
      const result = getMainTickValues({
        ...commonParams,
        ticksCount: undefined,
      })

      expect(result).toEqual([])
    })

    it('вернёт массив с нужным количеством засечек', () => {
      const result = getMainTickValues({
        ...commonParams,
        ticksCount: 4,
      })

      expect(result).toEqual([0, 1, 2, 3])
    })

    it('вернёт засечки только в пределах указанного домена', () => {
      const result = getMainTickValues({
        ...commonParams,
        ticksCount: 4,
        domain: [0, 2],
      })

      expect(result).toEqual([0, 1, 2])
    })

    it('вернёт засечки для пропусков', () => {
      const result = getMainTickValues({
        ...commonParams,
        items: flipPointsOnAxes(
          [
            { x: 0, y: null },
            { x: 1, y: null },
            { x: 2, y: null },
            { x: 3, y: 0 },
          ],
          isHorizontal
        ),
        ticksCount: 4,
      })

      expect(result).toEqual([0, 1, 2, 3])
    })

    it('возвращает 1 засечку', () => {
      const result = getMainTickValues({
        ...commonParams,
        ticksCount: 1,
      })

      expect(result).toEqual([0])
    })

    it('возвращает 2 засечки: минимальную и максимальную', () => {
      const result = getMainTickValues({
        ...commonParams,
        ticksCount: 2,
      })

      expect(result).toEqual([0, 3])
    })

    it('вернёт массив без дробей', () => {
      const result = getMainTickValues({
        isHorizontal,
        items: flipPointsOnAxes(
          [
            { x: 0, y: 0 },
            { x: 1, y: 0 },
          ],
          isHorizontal
        ),
        domain: [0, 1],
        ticksCount: 4,
      })

      expect(result).toEqual([0, 1])
    })

    it('вернёт пустой массив для начального домена', () => {
      const result = getMainTickValues({
        ...commonParams,
        domain: INITIAL_DOMAIN,
        ticksCount: 4,
      })

      expect(result).toEqual([])
    })

    it('вернёт значения с шагом больше единицы', () => {
      const result = getMainTickValues({
        isHorizontal,
        domain: [0, 400],
        items: flipPointsOnAxes(
          [
            { x: 0, y: 0 },
            { x: 100, y: 0 },
            { x: 200, y: 0 },
            { x: 300, y: 0 },
            { x: 400, y: 0 },
          ],
          isHorizontal
        ),
        ticksCount: 5,
      })

      expect(result).toEqual([0, 100, 200, 300, 400])
    })

    it('вернёт значения с дробным шагом', () => {
      const result = getMainTickValues({
        isHorizontal,
        domain: [0, 1],
        items: flipPointsOnAxes(
          [
            { x: 0, y: 0 },
            { x: 0.2, y: 0 },
            { x: 0.4, y: 0 },
            { x: 0.6, y: 0 },
            { x: 0.8, y: 0 },
            { x: 1, y: 0 },
          ],
          isHorizontal
        ),
        ticksCount: 6,
      })

      expect(result).toEqual([0, 0.2, 0.4, 0.6, 0.8, 1])
    })

    it('вернёт только те значения, которые присутствуют во входных данных', () => {
      const result = getMainTickValues({
        ...commonParams,
        domain: [0, 1],
        items: flipPointsOnAxes(
          [
            { x: 0, y: 0 },
            { x: 0.2, y: 0 },
            { x: 0.4, y: 0 },
            { x: 0.8, y: 0 },
            { x: 1, y: 0 },
          ],
          isHorizontal
        ),
        ticksCount: 6,
      })

      expect(result).toEqual([0, 0.2, 0.4, 0.8, 1])
    })
  })

  describe('вертикальный график', () => {
    const isHorizontal = false

    it('вернёт засечки для вертикального графика', () => {
      const result = getMainTickValues({
        items: flipPointsOnAxes(values, isHorizontal),
        domain: [3, 0],
        isHorizontal,
        ticksCount: 4,
      })

      expect(result).toEqual([0, 1, 2, 3])
    })
  })
})

describe('getSecondaryTickValues', () => {
  const values = [
    { x: 0, y: 9 },
    { x: 1, y: 6 },
    { x: 2, y: 3 },
    { x: 3, y: 0 },
  ] as const

  describe('горизонтальный график', () => {
    const isHorizontal = true
    const commonParams = {
      items: flipPointsOnAxes(values, isHorizontal),
      domain: [0, 10],
      isHorizontal,
    } as const

    it('вернёт пустой массив', () => {
      const result = getSecondaryTickValues({
        ...commonParams,
        ticksCount: undefined,
      })

      expect(result).toEqual([])
    })

    it('вернёт массив с засечками', () => {
      const result = getSecondaryTickValues({
        ...commonParams,
        ticksCount: 4,
      })

      expect(result).toEqual([0, 2, 4, 6, 8, 10])
    })

    it('возвращает 2 засечки: минимальную и максимальную', () => {
      const result = getSecondaryTickValues({
        ...commonParams,
        ticksCount: 2,
      })

      expect(result).toEqual([0, 9])
    })

    it('вернёт пустой массив для начального домена', () => {
      const result = getSecondaryTickValues({
        ...commonParams,
        domain: INITIAL_DOMAIN,
        ticksCount: 4,
      })

      expect(result).toEqual([])
    })

    it('вернёт массив с заполненными пропусками', () => {
      const result = getSecondaryTickValues({
        isHorizontal,
        items: flipPointsOnAxes(
          [
            { x: 0, y: 0 },
            { x: 0, y: 0.4 },
            { x: 0, y: 0.8 },
            { x: 0, y: 1 },
          ],
          isHorizontal
        ),
        domain: [0, 1],
        ticksCount: 6,
      })

      expect(result).toEqual([0, 0.2, 0.4, 0.6, 0.8, 1])
    })
  })

  describe('вертикальный график', () => {
    const isHorizontal = false

    it('вернёт засечки для вертикального графика', () => {
      const result = getSecondaryTickValues({
        items: flipPointsOnAxes(values, isHorizontal),
        domain: [10, 0],
        isHorizontal,
        ticksCount: 4,
      })

      expect(result).toEqual([10, 8, 6, 4, 2, 0])
    })
  })
})

describe('padDomain', () => {
  const padding = 0.1

  it('вернёт домен с отступами когда зум = 1', () => {
    const paddedDomain = padDomain({
      domain: [0, 10],
      paddingStart: padding,
      paddingEnd: padding,
      zoomScale: 1,
    })
    expect(paddedDomain).toEqual([-1, 11])
  })

  it('вернёт домен с отступами когда зум = 2', () => {
    const paddedDomain = padDomain({
      domain: [-10, 10],
      paddingStart: padding,
      paddingEnd: padding,
      zoomScale: 2,
    })
    expect(paddedDomain).toEqual([-11, 11])
  })

  it('вернёт домен с отступами когда зум = 4', () => {
    const paddedDomain = padDomain({
      domain: [40, 100],
      paddingStart: padding,
      paddingEnd: padding,
      zoomScale: 4,
    })
    expect(paddedDomain).toEqual([38.5, 101.5])
  })

  it('вернёт домен с отступами когда зум = 8', () => {
    const paddedDomain = padDomain({
      domain: [-50, 50],
      paddingStart: padding,
      paddingEnd: padding,
      zoomScale: 8,
    })
    expect(paddedDomain).toEqual([-51.25, 51.25])
  })

  it('вернёт домен с отступами когда значения начала и конца одинаковые', () => {
    const paddedDomain = padDomain({
      domain: [10, 10],
      paddingStart: padding,
      paddingEnd: padding,
      zoomScale: 1,
    })
    expect(paddedDomain).toEqual([9, 11])
  })
})

describe('zoomDomain', () => {
  it('возвращает тот же домен при зуме x1', () => {
    expect(zoomDomain([-10, 10], [0, 1])).toEqual([-10, 10])
  })

  it('возвращает домен при зуме x2 по центру', () => {
    expect(zoomDomain([-10, 10], [0.25, 0.75])).toEqual([-5, 5])
  })

  it('возвращает домен при зуме x2 со сдвигом в крайнее положение', () => {
    expect(zoomDomain([-10, 10], [0, 0.5])).toEqual([-10, 0])
    expect(zoomDomain([-10, 10], [0.5, 1])).toEqual([0, 10])
  })

  it('возвращает домен при зуме x10 со сдвигом', () => {
    expect(zoomDomain([-10, 10], [0.1, 0.2])).toEqual([-8, -6])
  })

  it('возвращает инвертированный домен при зуме x2', () => {
    expect(zoomDomain([10, 0], [0.25, 0.75])).toEqual([7.5, 2.5])
  })

  it('возвращает инвертированный домен при зуме x2 со сдвигом в крайнее положение', () => {
    expect(zoomDomain([10, 0], [0, 0.5])).toEqual([10, 5])
    expect(zoomDomain([10, 0], [0.5, 1])).toEqual([5, 0])
  })
})

describe('getIndexWithFallbackToDefault', () => {
  it('получаем индекс элемента если он не входит в отрицательный диапазон', () => {
    expect(getIndexWithFallbackToDefault(1, 1)).toEqual(1)
  })

  it('получаем индекс элемента если он входит в отрицательный диапазон', () => {
    expect(getIndexWithFallbackToDefault(-1, 1)).toEqual(1)
  })
})

describe('getXRange', () => {
  it('получение диапазона для оси X', () => {
    expect(getXRange(100)).toEqual([0, 100])
  })
})

describe('getYRange', () => {
  it('получение диапазона для оси Y', () => {
    expect(getYRange(100)).toEqual([99, 0])
  })
})

describe('getXScale', () => {
  const DOMAIN = [1, 2] as const
  const WIDTH = 100

  it('получение значение позиции точки на оси X в пикселях', () => {
    const scaler = getXScale(DOMAIN, WIDTH)

    expect(scaler(1)).toEqual(0)
    expect(scaler(2)).toEqual(100)
  })
})

describe('getYScale', () => {
  const DOMAIN = [1, 2] as const
  const HEIGHT = 100

  it('получение значение позиции точки на оси Y в пикселях', () => {
    const scaler = getYScale(DOMAIN, HEIGHT)

    expect(scaler(1)).toEqual(99)
    expect(scaler(2)).toEqual(0)
  })
})

describe('flipPointsOnAxes', () => {
  const ITEMS = [
    { x: 0, y: 1 },
    { x: 1, y: 3 },
    { x: 2, y: null },
  ] as const

  it('переворачивает значения на осях для вертикального графика', () => {
    expect(flipPointsOnAxes(ITEMS, false)).toEqual([
      { x: 1, y: 0 },
      { x: 3, y: 1 },
      { x: null, y: 2 },
    ])
  })

  it('не переворачивает значения на осях для горизонтального графика', () => {
    expect(flipPointsOnAxes(ITEMS, true)).toEqual(ITEMS)
  })
})

describe('getUniqValues', () => {
  const ITEMS = [
    { x: 0, y: 0 },
    { x: 0, y: 4 },
    { x: 1, y: 2 },
    { x: 1, y: 4 },
    { x: 2, y: null },
    { x: 3, y: 2 },
  ] as const

  it('возвращает пустой массив если значения находятся за пределом домена', () => {
    expect(getUniqValues(ITEMS, [-100, -100], 'x')).toEqual([])
    expect(getUniqValues(ITEMS, [-100, -100], 'y')).toEqual([])
  })

  describe('горизонтальный график', () => {
    it('возвращает уникальные элементы для всего домена по X', () => {
      expect(getUniqValues(ITEMS, [0, 3], 'x')).toEqual([0, 1, 2, 3])
    })

    it('возвращает уникальные элементы по выборке из домена для X', () => {
      expect(getUniqValues(ITEMS, [0, 1], 'x')).toEqual([0, 1])
    })

    it('возвращает уникальные элементы для всего домена по Y', () => {
      expect(getUniqValues(ITEMS, [0, 4], 'y')).toEqual([0, 2, 4])
    })

    it('возвращает уникальные элементы по выборке из домена для Y', () => {
      expect(getUniqValues(ITEMS, [0, 2], 'y')).toEqual([0, 2])
    })
  })

  describe('вертикальный график график', () => {
    it('возвращает уникальные элементы для всего домена по X', () => {
      expect(getUniqValues(ITEMS, [3, 0], 'x')).toEqual([0, 1, 2, 3])
    })

    it('возвращает уникальные элементы по выборке из домена для X', () => {
      expect(getUniqValues(ITEMS, [1, 0], 'x')).toEqual([0, 1])
    })

    it('возвращает уникальные элементы для всего домена по Y', () => {
      expect(getUniqValues(ITEMS, [4, 0], 'y')).toEqual([0, 2, 4])
    })

    it('возвращает уникальные элементы по выборке из домена для Y', () => {
      expect(getUniqValues(ITEMS, [2, 0], 'y')).toEqual([0, 2])
    })
  })
})

describe('getBoundary', () => {
  const boundary = { value: [3, 5] as const, color: 'red' }

  it('возвращает границу по заданным значениям для горизонтального графика', () => {
    expect(
      getBoundary({ boundaries: [boundary], item: { x: null, y: 4 }, isHorizontal: true })
    ).toEqual(boundary)
  })

  it('возвращает границу по заданным значениям для вертикального графика', () => {
    expect(
      getBoundary({ boundaries: [boundary], item: { x: 4, y: null }, isHorizontal: false })
    ).toEqual(boundary)
  })

  it('возвращает undefined если граница отсутствует в заданных координатах', () => {
    expect(
      getBoundary({ boundaries: [boundary], item: { x: 0, y: 0 }, isHorizontal: true })
    ).toBeUndefined()
  })

  it('возвращает undefined если у переданной точки отсутствуют координаты', () => {
    expect(
      getBoundary({ boundaries: [boundary], item: { x: null, y: null }, isHorizontal: true })
    ).toBeUndefined()
  })
})

describe('getColorFromFirstLineWithBoundaries', () => {
  it('получение цвета, если список линий пустой', () => {
    const result = getColorFromFirstLineWithBoundaries([])

    expect(result).toBe('transparent')
  })

  it('получение цвета первой линии с границами', () => {
    const result = getColorFromFirstLineWithBoundaries([
      {
        color: 'red',
        lineName: 'first',
        values: [],
      },
      {
        color: 'blue',
        lineName: 'second',
        values: [],
        withBoundaries: true,
      },
    ])

    expect(result).toBe('blue')
  })
})
