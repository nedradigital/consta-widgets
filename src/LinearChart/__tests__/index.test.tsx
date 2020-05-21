import * as d3 from 'd3'

import { Item, NumberRange } from '../'
import {
  calculateSecondaryDomain,
  flipPointsOnAxes,
  getIndexWithFallbackToDefault,
  getMainTickValues,
  getSecondaryTickValues,
  getUniqValues,
  getXRange,
  getXScale,
  getYRange,
  getYScale,
  INITIAL_DOMAIN,
  padDomain,
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
const getYDomain = (items: readonly Item[]) => d3.extent(items, v => v.y) as NumberRange

describe('calculateSecondaryDomain', () => {
  describe('горизонтальный график', () => {
    it('рассчитывает второстепенный домен для одной линии', () => {
      const domain = calculateSecondaryDomain(2, 6, horizontalLine, v => v.x, getYDomain)
      expect(domain).toEqual([0, 9])
    })

    it('рассчитывает второстепенный домен для нескольких линии', () => {
      const domain = calculateSecondaryDomain(2, 6, horizontalLines, v => v.x, getYDomain)
      expect(domain).toEqual([-4, 10])
    })

    it('рассчитывает второстепенный домен в максимальном левом положении', () => {
      const domain = calculateSecondaryDomain(1, 2, horizontalLine, v => v.x, getYDomain)
      expect(domain).toEqual([6, 9])
    })

    it('рассчитывает второстепенный домен в максимальном правом положении', () => {
      const domain = calculateSecondaryDomain(6, 7, horizontalLine, v => v.x, getYDomain)
      expect(domain).toEqual([0, 3])
    })

    it('рассчитывает второстепенный домен, когда есть пропуски в середине', () => {
      const domain = calculateSecondaryDomain(
        1,
        2,
        [
          [
            { x: -1, y: -1 },
            { x: 0, y: 0 },
            { x: 1, y: null },
            { x: 2, y: null },
            { x: 3, y: 3 },
            { x: 4, y: 4 },
          ],
        ],
        v => v.x,
        getYDomain
      )
      expect(domain).toEqual([0, 3])
    })

    it('рассчитывает второстепенный домен, когда есть пропуски в начале', () => {
      const domain = calculateSecondaryDomain(
        0,
        3,
        [
          [
            { x: 0, y: null },
            { x: 1, y: null },
            { x: 2, y: 2 },
            { x: 3, y: 3 },
          ],
        ],
        v => v.x,
        getYDomain
      )
      expect(domain).toEqual([2, 3])
    })

    it('возвращает нулевой домен, если все значения — пропуски', () => {
      const domain = calculateSecondaryDomain(
        1,
        2,
        [
          [
            { x: 0, y: null },
            { x: 1, y: null },
            { x: 2, y: null },
          ],
        ],
        v => v.x,
        getYDomain
      )
      expect(domain).toEqual([0, 0])
    })
  })

  describe('вертикальный график', () => {
    it('рассчитывает второстепенный домен для одной линии', () => {
      const domain = calculateSecondaryDomain(1.5, 7.5, verticalLine, v => v.y, getXDomain)
      expect(domain).toEqual([0, 9])
    })

    it('рассчитывает второстепенный домен для нескольких линии', () => {
      const domain = calculateSecondaryDomain(2, 6, verticalLines, v => v.y, getXDomain)
      expect(domain).toEqual([-4, 10])
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

  const getGridConfig = ({ labelTicks = 0, gridTicks = 0, guide = false }) => ({
    x: {
      labelTicks,
      gridTicks,
      guide,
    },
    y: {
      labelTicks,
      gridTicks,
      guide,
    },
  })

  describe('горизонтальный график', () => {
    const isHorizontal = true
    const commonParams = {
      items: flipPointsOnAxes(values, isHorizontal),
      domain: [0, 3],
      gridConfig: getGridConfig({}),
      guideValue: 0,
      isHorizontal,
    } as const

    it('вернёт пустой массив', () => {
      const result = getMainTickValues({
        ...commonParams,
        items: flipPointsOnAxes(values, isHorizontal),
        tickType: 'labelTicks',
      })

      expect(result).toEqual([])
    })

    it('вернёт массив со значением нулевой оси для сетки', () => {
      const result = getMainTickValues({
        ...commonParams,
        gridConfig: getGridConfig({ guide: true }),
        tickType: 'gridTicks',
      })

      expect(result).toEqual([0])
    })

    it('вернёт пустой массив для сетки, если значение нулевой оси не входит в диапазон домена', () => {
      const result = getMainTickValues({
        ...commonParams,
        gridConfig: getGridConfig({ guide: true }),
        tickType: 'gridTicks',
        guideValue: -2,
      })

      expect(result).toEqual([])
    })

    it('вернёт пустой массив для засечек', () => {
      const result = getMainTickValues({
        ...commonParams,
        gridConfig: getGridConfig({ guide: true }),
        tickType: 'labelTicks',
        guideValue: 1,
      })

      expect(result).toEqual([])
    })

    it('вернёт массив с уникальными значениями', () => {
      const result = getMainTickValues({
        ...commonParams,
        gridConfig: getGridConfig({ labelTicks: 4, guide: true }),
        tickType: 'labelTicks',
      })

      expect(result).toEqual([0, 1, 2, 3])
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
        gridConfig: getGridConfig({ labelTicks: 4, guide: true }),
        tickType: 'labelTicks',
      })

      expect(result).toEqual([0, 1, 2, 3])
    })

    it('вернёт массив нужной длины', () => {
      const result = getMainTickValues({
        ...commonParams,
        domain: [0, 1],
        gridConfig: getGridConfig({ labelTicks: 4, guide: true }),
        tickType: 'labelTicks',
      })

      expect(result).toEqual([0, 1])
    })

    it('вместо 1 засечки возвращает 2: минимальную и максимальную', () => {
      const result = getMainTickValues({
        ...commonParams,
        domain: [0, 1],
        gridConfig: getGridConfig({ labelTicks: 1, guide: true }),
        tickType: 'labelTicks',
      })

      expect(result).toEqual([0, 1])
    })

    it('возвращает 2 засечки: минимальную и максимальную', () => {
      const result = getMainTickValues({
        ...commonParams,
        domain: [0, 1],
        gridConfig: getGridConfig({ labelTicks: 2, guide: true }),
        tickType: 'labelTicks',
      })

      expect(result).toEqual([0, 1])
    })

    it('вернёт массив без дробей', () => {
      const result = getMainTickValues({
        ...commonParams,
        items: flipPointsOnAxes(
          [
            { x: 0, y: 0 },
            { x: 1, y: 0 },
          ],
          isHorizontal
        ),
        domain: [0, 1],
        gridConfig: getGridConfig({ labelTicks: 4, guide: true }),
        tickType: 'labelTicks',
      })

      expect(result).toEqual([0, 1])
    })

    it('вернёт пустой массив для начального домена', () => {
      const result = getMainTickValues({
        ...commonParams,
        domain: INITIAL_DOMAIN,
        tickType: 'labelTicks',
      })

      expect(result).toEqual([])
    })

    it('вернёт значения с шагом не по единице', () => {
      const result = getMainTickValues({
        ...commonParams,
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
        gridConfig: getGridConfig({ labelTicks: 5 }),
        tickType: 'labelTicks',
      })

      expect(result).toEqual([0, 100, 200, 300, 400])
    })

    it('вернёт значения с дробным шагом', () => {
      const result = getMainTickValues({
        ...commonParams,
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
        gridConfig: getGridConfig({ labelTicks: 6 }),
        tickType: 'labelTicks',
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
        gridConfig: getGridConfig({ labelTicks: 6 }),
        tickType: 'labelTicks',
      })

      expect(result).toEqual([0, 0.2, 0.4, 0.8, 1])
    })
  })

  describe('вертикальный график', () => {
    const isHorizontal = false
    const commonParams = {
      items: flipPointsOnAxes(values, isHorizontal),
      domain: [3, 0],
      gridConfig: getGridConfig({}),
      guideValue: 0,
      isHorizontal,
    } as const

    it('вернёт пустой массив', () => {
      const result = getMainTickValues({
        ...commonParams,
        items: flipPointsOnAxes(values, isHorizontal),
        tickType: 'labelTicks',
      })

      expect(result).toEqual([])
    })

    it('вернёт массив со значением нулевой оси для сетки', () => {
      const result = getMainTickValues({
        ...commonParams,
        gridConfig: getGridConfig({ guide: true }),
        tickType: 'gridTicks',
        guideValue: 3,
      })

      expect(result).toEqual([3])
    })

    it('вернёт пустой массив для сетки, если значение нулевой оси не входит в диапазон домена', () => {
      const result = getMainTickValues({
        ...commonParams,
        gridConfig: getGridConfig({ guide: true }),
        tickType: 'gridTicks',
        guideValue: -2,
      })

      expect(result).toEqual([])
    })

    it('вернёт пустой массив для засечек', () => {
      const result = getMainTickValues({
        ...commonParams,
        gridConfig: getGridConfig({ guide: true }),
        tickType: 'labelTicks',
        guideValue: 1,
      })

      expect(result).toEqual([])
    })

    it('вернёт массив с уникальными значениями', () => {
      const result = getMainTickValues({
        ...commonParams,
        gridConfig: getGridConfig({ labelTicks: 4, guide: true }),
        tickType: 'labelTicks',
      })

      expect(result).toEqual([0, 1, 2, 3])
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
        gridConfig: getGridConfig({ labelTicks: 4, guide: true }),
        tickType: 'labelTicks',
      })

      expect(result).toEqual([0, 1, 2, 3])
    })

    it('вернёт массив нужной длины', () => {
      const result = getMainTickValues({
        ...commonParams,
        domain: [1, 0],
        gridConfig: getGridConfig({ labelTicks: 4, guide: true }),
        tickType: 'labelTicks',
      })

      expect(result).toEqual([0, 1])
    })

    it('вместо 1 засечки возвращает 2: минимальную и максимальную', () => {
      const result = getMainTickValues({
        ...commonParams,
        domain: [1, 0],
        gridConfig: getGridConfig({ labelTicks: 1, guide: true }),
        tickType: 'labelTicks',
      })

      expect(result).toEqual([0, 1])
    })

    it('возвращает 2 засечки: минимальную и максимальную', () => {
      const result = getMainTickValues({
        ...commonParams,
        domain: [1, 0],
        gridConfig: getGridConfig({ labelTicks: 2, guide: true }),
        tickType: 'labelTicks',
      })

      expect(result).toEqual([0, 1])
    })

    it('вернёт массив без дробей', () => {
      const result = getMainTickValues({
        ...commonParams,
        items: flipPointsOnAxes(
          [
            { x: 0, y: 0 },
            { x: 1, y: 0 },
          ],
          isHorizontal
        ),
        domain: [1, 0],
        gridConfig: getGridConfig({ labelTicks: 4, guide: true }),
        tickType: 'labelTicks',
      })

      expect(result).toEqual([0, 1])
    })

    it('вернёт пустой массив для начального домена', () => {
      const result = getMainTickValues({
        ...commonParams,
        domain: INITIAL_DOMAIN,
        tickType: 'labelTicks',
      })

      expect(result).toEqual([])
    })

    it('вернёт значения с шагом не по единице', () => {
      const result = getMainTickValues({
        ...commonParams,
        domain: [400, 0],
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
        gridConfig: getGridConfig({ labelTicks: 5 }),
        tickType: 'labelTicks',
      })

      expect(result).toEqual([0, 100, 200, 300, 400])
    })

    it('вернёт значения с дробным шагом', () => {
      const result = getMainTickValues({
        ...commonParams,
        domain: [1, 0],
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
        gridConfig: getGridConfig({ labelTicks: 6 }),
        tickType: 'labelTicks',
      })

      expect(result).toEqual([0, 0.2, 0.4, 0.6, 0.8, 1])
    })

    it('вернёт только те значения, которые присутствуют во входных данных', () => {
      const result = getMainTickValues({
        ...commonParams,
        domain: [1, 0],
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
        gridConfig: getGridConfig({ labelTicks: 6 }),
        tickType: 'labelTicks',
      })

      expect(result).toEqual([0, 0.2, 0.4, 0.8, 1])
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

  const getGridConfig = ({ labelTicks = 0, gridTicks = 0, guide = false }) => ({
    x: {
      labelTicks,
      gridTicks,
      guide,
    },
    y: {
      labelTicks,
      gridTicks,
      guide,
    },
  })

  describe('горизонтальный график', () => {
    const isHorizontal = true
    const commonParams = {
      items: flipPointsOnAxes(values, isHorizontal),
      domain: [0, 10],
      gridConfig: getGridConfig({}),
      guideValue: 0,
      isHorizontal,
    } as const
    it('вернёт пустой массив', () => {
      const result = getSecondaryTickValues({
        ...commonParams,
        tickType: 'labelTicks',
      })

      expect(result).toEqual([])
    })

    it('вернёт массив со значением нулевой оси для сетки', () => {
      const result = getSecondaryTickValues({
        ...commonParams,
        gridConfig: getGridConfig({ guide: true }),
        tickType: 'gridTicks',
      })

      expect(result).toEqual([0])
    })

    it('вернёт пустой массив для сетки, если значение нулевой оси мне входит в диапазон домена', () => {
      const result = getSecondaryTickValues({
        ...commonParams,
        gridConfig: getGridConfig({ guide: true }),
        tickType: 'gridTicks',
        guideValue: -2,
      })

      expect(result).toEqual([])
    })

    it('вернёт массив с уникальными значениями', () => {
      const result = getSecondaryTickValues({
        ...commonParams,
        gridConfig: getGridConfig({ labelTicks: 4, guide: true }),
        tickType: 'labelTicks',
      })

      expect(result).toEqual([0, 2, 4, 6, 8, 10])
    })

    it('вместо 1 засечки возвращает 2: минимальную и максимальную', () => {
      const result = getSecondaryTickValues({
        ...commonParams,
        domain: [0, 4],
        gridConfig: getGridConfig({ labelTicks: 1, guide: true }),
        tickType: 'labelTicks',
      })

      expect(result).toEqual([0, 3])
    })

    it('возвращает 2 засечки: минимальную и максимальную', () => {
      const result = getSecondaryTickValues({
        ...commonParams,
        domain: [0, 4],
        gridConfig: getGridConfig({ labelTicks: 2, guide: true }),
        tickType: 'labelTicks',
      })

      expect(result).toEqual([0, 3])
    })

    it('вернёт пустой массив для начального домена', () => {
      const result = getSecondaryTickValues({
        ...commonParams,
        domain: INITIAL_DOMAIN,
        tickType: 'labelTicks',
      })

      expect(result).toEqual([])
    })

    it('вернёт массив с заполненными пропусками', () => {
      const result = getSecondaryTickValues({
        ...commonParams,
        domain: [0, 1],
        items: flipPointsOnAxes(
          [
            { x: 0, y: 0 },
            { x: 0, y: 0.4 },
            { x: 0, y: 0.8 },
            { x: 0, y: 1 },
          ],
          isHorizontal
        ),
        gridConfig: getGridConfig({ labelTicks: 6 }),
        tickType: 'labelTicks',
      })

      expect(result).toEqual([0, 0.2, 0.4, 0.6, 0.8, 1])
    })
  })

  describe('вертикальный график', () => {
    const isHorizontal = false
    const commonParams = {
      items: flipPointsOnAxes(values, isHorizontal),
      domain: [10, 0],
      gridConfig: getGridConfig({}),
      guideValue: 0,
      isHorizontal,
    } as const

    it('вернёт пустой массив', () => {
      const result = getSecondaryTickValues({
        ...commonParams,
        tickType: 'labelTicks',
      })

      expect(result).toEqual([])
    })

    it('вернёт массив со значением нулевой оси для сетки', () => {
      const result = getSecondaryTickValues({
        ...commonParams,
        gridConfig: getGridConfig({ guide: true }),
        tickType: 'gridTicks',
        guideValue: 10,
      })

      expect(result).toEqual([10])
    })

    it('вернёт пустой массив для сетки, если значение нулевой оси мне входит в диапазон домена', () => {
      const result = getSecondaryTickValues({
        ...commonParams,
        gridConfig: getGridConfig({ guide: true }),
        tickType: 'gridTicks',
        guideValue: -2,
      })

      expect(result).toEqual([])
    })

    it('вернёт массив с уникальными значениями', () => {
      const result = getSecondaryTickValues({
        ...commonParams,
        gridConfig: getGridConfig({ labelTicks: 4, guide: true }),
        tickType: 'labelTicks',
      })

      expect(result).toEqual([10, 8, 6, 4, 2, 0])
    })

    it('вместо 1 засечки возвращает 2: минимальную и максимальную', () => {
      const result = getSecondaryTickValues({
        ...commonParams,
        domain: [4, 0],
        gridConfig: getGridConfig({ labelTicks: 1, guide: true }),
        tickType: 'labelTicks',
      })

      expect(result).toEqual([0, 3])
    })

    it('возвращает 2 засечки: минимальную и максимальную', () => {
      const result = getSecondaryTickValues({
        ...commonParams,
        domain: [4, 0],
        gridConfig: getGridConfig({ labelTicks: 2, guide: true }),
        tickType: 'labelTicks',
      })

      expect(result).toEqual([0, 3])
    })

    it('вернёт пустой массив для начального домена', () => {
      const result = getSecondaryTickValues({
        ...commonParams,
        domain: INITIAL_DOMAIN,
        tickType: 'labelTicks',
      })

      expect(result).toEqual([])
    })

    it('вернёт массив с заполненными пропусками', () => {
      const result = getSecondaryTickValues({
        ...commonParams,
        domain: [1, 0],
        items: flipPointsOnAxes(
          [
            { x: 0, y: 0 },
            { x: 0, y: 0.4 },
            { x: 0, y: 0.8 },
            { x: 0, y: 1 },
          ],
          isHorizontal
        ),
        gridConfig: getGridConfig({ labelTicks: 6 }),
        tickType: 'labelTicks',
      })

      expect(result).toEqual([1, 0.8, 0.6, 0.4, 0.2, 0])
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
      zoom: 1,
    })
    expect(paddedDomain).toEqual([-1, 11])
  })

  it('вернёт домен с отступами когда зум = 2', () => {
    const paddedDomain = padDomain({
      domain: [-10, 10],
      paddingStart: padding,
      paddingEnd: padding,
      zoom: 2,
    })
    expect(paddedDomain).toEqual([-11, 11])
  })

  it('вернёт домен с отступами когда зум = 4', () => {
    const paddedDomain = padDomain({
      domain: [40, 100],
      paddingStart: padding,
      paddingEnd: padding,
      zoom: 4,
    })
    expect(paddedDomain).toEqual([38.5, 101.5])
  })

  it('вернёт домен с отступами когда зум = 8', () => {
    const paddedDomain = padDomain({
      domain: [-50, 50],
      paddingStart: padding,
      paddingEnd: padding,
      zoom: 8,
    })
    expect(paddedDomain).toEqual([-51.25, 51.25])
  })

  it('вернёт домен с отступами когда значения начала и конца одинаковые', () => {
    const paddedDomain = padDomain({
      domain: [10, 10],
      paddingStart: padding,
      paddingEnd: padding,
      zoom: 1,
    })
    expect(paddedDomain).toEqual([9, 11])
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

  it('получение значение позиции точки на оси X в пикселях для построения графика справа налево', () => {
    const scaler = getXScale(DOMAIN, WIDTH, 'toLeft')

    expect(scaler(1)).toEqual(100)
    expect(scaler(2)).toEqual(0)
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
