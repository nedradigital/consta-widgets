import * as d3 from 'd3'

import {
  calculateSecondaryDomain,
  getMainTickValues,
  getSecondaryTickValues,
  Item,
  Line,
  NumberRange,
  padDomain,
} from '../'

const horizontalLine: readonly Line[] = [
  {
    colorGroupName: 'red',
    values: [{ x: 1, y: 9 }, { x: 3, y: 6 }, { x: 5, y: 3 }, { x: 7, y: 0 }],
    lineName: 'Северный бур',
  },
]

const verticalLine: readonly Line[] = [
  {
    colorGroupName: 'red',
    values: [{ x: 9, y: 1 }, { x: 6, y: 3 }, { x: 3, y: 5 }, { x: 0, y: 7 }],
    lineName: 'Северный бур',
  },
]

const horizontalLines: readonly Line[] = [
  ...horizontalLine,
  {
    colorGroupName: 'blue',
    values: [{ x: 1, y: -4 }, { x: 3, y: 2 }, { x: 5, y: 6 }, { x: 7, y: 10 }],
    lineName: 'Южное месторождение',
  },
]

const verticalLines: readonly Line[] = [
  ...verticalLine,
  {
    colorGroupName: 'blue',
    values: [{ x: -4, y: 1 }, { x: 2, y: 3 }, { x: 6, y: 5 }, { x: 10, y: 7 }],
    lineName: 'Южное месторождение',
  },
]

// Заменяем методы из LinearChart на более простую реализацию чтобы в расчетах не использовались константные отступы.
const getXDomain = (items: readonly Item[]) => d3.extent(items, v => v.x) as NumberRange
const getYDomain = (items: readonly Item[]) => d3.extent(items, v => v.y) as NumberRange

describe('<LinearChart />', () => {
  describe('calculateSecondaryDomain', () => {
    it('рассчитать второстепенный домен для горизонтального режима и одной линии', () => {
      const domain = calculateSecondaryDomain(2, 6, horizontalLine, v => v.x, getYDomain)
      expect(domain).toEqual([0, 9])
    })

    it('рассчитать второстепенный домен для горизонтального режима и нескольких линии', () => {
      const domain = calculateSecondaryDomain(2, 6, horizontalLines, v => v.x, getYDomain)
      expect(domain).toEqual([-4, 10])
    })

    it('рассчитать второстепенный домен для горизонтального режима и максимальном левом положении', () => {
      const domain = calculateSecondaryDomain(1, 2, horizontalLine, v => v.x, getYDomain)
      expect(domain).toEqual([6, 9])
    })

    it('рассчитать второстепенный домен для горизонтального режима и максимальном правом положении', () => {
      const domain = calculateSecondaryDomain(6, 7, horizontalLine, v => v.x, getYDomain)
      expect(domain).toEqual([0, 3])
    })

    it('рассчитать второстепенный домен для вертикального режима и одной линии', () => {
      const domain = calculateSecondaryDomain(1.5, 7.5, verticalLine, v => v.y, getXDomain)
      expect(domain).toEqual([0, 9])
    })

    it('рассчитать второстепенный домен для вертикального режима и нескольких линии', () => {
      const domain = calculateSecondaryDomain(2, 6, verticalLines, v => v.y, getXDomain)
      expect(domain).toEqual([-4, 10])
    })
  })

  describe('getMainTickValues', () => {
    const values = [{ x: 0, y: 9 }, { x: 1, y: 6 }, { x: 2, y: 3 }, { x: 3, y: 0 }] as const
    const getGridConfig = ({ labelTicks = 0, gridTicks = 0, guide = false }) => ({
      x: {
        labelTicks,
        gridTicks,
        guide,
      },
      y: {},
    })
    const domain = [0, 3] as const

    it('вернет пустой массив', () => {
      const result = getMainTickValues({
        items: values,
        domain,
        gridConfig: getGridConfig({}),
        tickType: 'labelTicks',
        guideValue: 0,
        isVertical: false,
      })
      expect(result).toEqual([])
    })

    it('вернет массив со значением нулевой оси для сетки', () => {
      const result = getMainTickValues({
        items: values,
        domain,
        gridConfig: getGridConfig({ guide: true }),
        tickType: 'gridTicks',
        guideValue: 0,
        isVertical: false,
      })
      expect(result).toEqual([0])
    })

    it('вернет пустой массив для сетки, если значение нулевой оси мне входит в диапазон домена', () => {
      const result = getMainTickValues({
        items: values,
        domain,
        gridConfig: getGridConfig({ guide: true }),
        tickType: 'gridTicks',
        guideValue: -2,
        isVertical: false,
      })
      expect(result).toEqual([])
    })

    it('вернет пустой массив для засечек', () => {
      const result = getMainTickValues({
        items: values,
        domain,
        gridConfig: getGridConfig({ guide: true }),
        tickType: 'labelTicks',
        guideValue: 1,
        isVertical: false,
      })
      expect(result).toEqual([])
    })

    it('вернет массив с уникальными значениями', () => {
      const result = getMainTickValues({
        items: values,
        domain,
        gridConfig: getGridConfig({ labelTicks: 4, guide: true }),
        tickType: 'labelTicks',
        guideValue: 0,
        isVertical: false,
      })
      expect(result).toEqual([0, 1, 2, 3])
    })

    it('вернет массив нужной длинны', () => {
      const result = getMainTickValues({
        items: values,
        domain: [0, 1],
        gridConfig: getGridConfig({ labelTicks: 4, guide: true }),
        tickType: 'labelTicks',
        guideValue: 0,
        isVertical: false,
      })
      expect(result).toEqual([0, 1])
    })

    it('вместо 1 засечки возвращает 2: минимальную и максимальную', () => {
      const result = getMainTickValues({
        items: values,
        domain: [0, 1],
        gridConfig: getGridConfig({ labelTicks: 1, guide: true }),
        tickType: 'labelTicks',
        guideValue: 0,
        isVertical: false,
      })
      expect(result).toEqual([0, 1])
    })

    it('возвращает 2 засечки: минимальную и максимальную', () => {
      const result = getMainTickValues({
        items: values,
        domain: [0, 1],
        gridConfig: getGridConfig({ labelTicks: 2, guide: true }),
        tickType: 'labelTicks',
        guideValue: 0,
        isVertical: false,
      })
      expect(result).toEqual([0, 1])
    })

    it('вернет массив без дробей', () => {
      const result = getMainTickValues({
        items: [{ x: 0, y: 0 }, { x: 1, y: 0 }],
        domain: [0, 1],
        gridConfig: getGridConfig({ labelTicks: 4, guide: true }),
        tickType: 'labelTicks',
        guideValue: 0,
        isVertical: false,
      })

      expect(result).toEqual([0, 1])
    })
  })

  describe('getSecondaryTickValues', () => {
    const values = [{ x: 0, y: 9 }, { x: 1, y: 6 }, { x: 2, y: 3 }, { x: 3, y: 0 }] as const
    const getGridConfig = ({ labelTicks = 0, gridTicks = 0, guide = false }) => ({
      x: {},
      y: {
        labelTicks,
        gridTicks,
        guide,
      },
    })
    const domain = [0, 10] as const

    it('вернет пустой массив', () => {
      const result = getSecondaryTickValues({
        items: values,
        domain,
        gridConfig: getGridConfig({}),
        tickType: 'labelTicks',
        guideValue: 0,
        isVertical: false,
      })
      expect(result).toEqual([])
    })

    it('вернет массив со значением нулевой оси для сетки', () => {
      const result = getSecondaryTickValues({
        items: values,
        domain,
        gridConfig: getGridConfig({ guide: true }),
        tickType: 'gridTicks',
        guideValue: 0,
        isVertical: false,
      })
      expect(result).toEqual([0])
    })

    it('вернет пустой массив для сетки, если значение нулевой оси мне входит в диапазон домена', () => {
      const result = getSecondaryTickValues({
        items: values,
        domain,
        gridConfig: getGridConfig({ guide: true }),
        tickType: 'gridTicks',
        guideValue: -2,
        isVertical: false,
      })
      expect(result).toEqual([])
    })

    it('вернет массив с уникальными значениями', () => {
      const result = getSecondaryTickValues({
        items: values,
        domain,
        gridConfig: getGridConfig({ labelTicks: 4, guide: true }),
        tickType: 'labelTicks',
        guideValue: 0,
        isVertical: false,
      })
      expect(result).toEqual([0, 2, 4, 6, 8, 10])
    })

    it('вместо 1 засечки возвращает 2: минимальную и максимальную', () => {
      const result = getSecondaryTickValues({
        items: values,
        domain: [0, 4],
        gridConfig: getGridConfig({ labelTicks: 1, guide: true }),
        tickType: 'labelTicks',
        guideValue: 0,
        isVertical: false,
      })
      expect(result).toEqual([0, 3])
    })

    it('возвращает 2 засечки: минимальную и максимальную', () => {
      const result = getSecondaryTickValues({
        items: values,
        domain: [0, 4],
        gridConfig: getGridConfig({ labelTicks: 2, guide: true }),
        tickType: 'labelTicks',
        guideValue: 0,
        isVertical: false,
      })
      expect(result).toEqual([0, 3])
    })
  })

  describe('padDomain', () => {
    const padding = 0.1

    it('вернет домен с отступами когда зум = 1', () => {
      const paddedDomain = padDomain([0, 10], padding, padding, 1)
      expect(paddedDomain).toEqual([-1, 11])
    })

    it('вернет домен с отступами когда зум = 2', () => {
      const paddedDomain = padDomain([-10, 10], padding, padding, 2)
      expect(paddedDomain).toEqual([-11, 11])
    })

    it('вернет домен с отступами когда зум = 4', () => {
      const paddedDomain = padDomain([40, 100], padding, padding, 4)
      expect(paddedDomain).toEqual([38.5, 101.5])
    })

    it('вернет домен с отступами когда зум = 8', () => {
      const paddedDomain = padDomain([-50, 50], padding, padding, 8)
      expect(paddedDomain).toEqual([-51.25, 51.25])
    })
  })
})
