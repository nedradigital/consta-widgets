import * as d3 from 'd3'

import { calculateSecondaryDomain, getTickValues, Item, Line, NumberRange, padDomain } from '../'

const horizontalLine: readonly Line[] = [
  {
    colorGroupName: 'red',
    values: [{ x: 1, y: 9 }, { x: 3, y: 6 }, { x: 5, y: 3 }, { x: 7, y: 0 }],
  },
]

const verticalLine: readonly Line[] = [
  {
    colorGroupName: 'red',
    values: [{ x: 9, y: 1 }, { x: 6, y: 3 }, { x: 3, y: 5 }, { x: 0, y: 7 }],
  },
]

const horizontalLines: readonly Line[] = [
  ...horizontalLine,
  {
    colorGroupName: 'blue',
    values: [{ x: 1, y: -4 }, { x: 3, y: 2 }, { x: 5, y: 6 }, { x: 7, y: 10 }],
  },
]

const verticalLines: readonly Line[] = [
  ...verticalLine,
  {
    colorGroupName: 'blue',
    values: [{ x: -4, y: 1 }, { x: 2, y: 3 }, { x: 6, y: 5 }, { x: 10, y: 7 }],
  },
]

// Заменяем методы из LinearChart на более простую реализацию чтобы в расчетах не использовались константные отступы.
const getXDomain = (items: readonly Item[]) => d3.extent(items, v => v.x) as NumberRange
const getYDomain = (items: readonly Item[]) => d3.extent(items, v => v.y) as NumberRange

describe('<LinearChart />', () => {
  describe('calculateSecondaryDomain', () => {
    it('Calculate secondary domain for horizontal mode and single line', () => {
      const domain = calculateSecondaryDomain(2, 6, horizontalLine, v => v.x, getYDomain)
      expect(domain).toEqual([0, 9])
    })

    it('Calculate secondary domain for horizontal mode and multiple lines', () => {
      const domain = calculateSecondaryDomain(2, 6, horizontalLines, v => v.x, getYDomain)
      expect(domain).toEqual([-4, 10])
    })

    it('Calculate secondary domain for horizontal mode in max left position', () => {
      const domain = calculateSecondaryDomain(1, 2, horizontalLine, v => v.x, getYDomain)
      expect(domain).toEqual([6, 9])
    })

    it('Calculate secondary domain for horizontal mode in max right position', () => {
      const domain = calculateSecondaryDomain(6, 7, horizontalLine, v => v.x, getYDomain)
      expect(domain).toEqual([0, 3])
    })

    it('Calculate secondary domain for vertical mode and single line', () => {
      const domain = calculateSecondaryDomain(1.5, 7.5, verticalLine, v => v.y, getXDomain)
      expect(domain).toEqual([0, 9])
    })

    it('Calculate secondary domain for vertical mode and multiple lines', () => {
      const domain = calculateSecondaryDomain(2, 6, verticalLines, v => v.y, getXDomain)
      expect(domain).toEqual([-4, 10])
    })
  })

  describe('getTickValues', () => {
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

    it('returns clean array', () => {
      const result = getTickValues(values, domain, getGridConfig({}), false)
      expect(result).toEqual([])
    })

    it('returns array with zero number', () => {
      const result = getTickValues(values, domain, getGridConfig({ guide: true }), false)
      expect(result).toEqual([0])
    })

    it('returns array with uniq values', () => {
      const result = getTickValues(
        values,
        domain,
        getGridConfig({ labelTicks: 4, guide: true }),
        false
      )
      expect(result).toEqual([0, 1, 2, 3])
    })

    it('returns array if domain is small', () => {
      const result = getTickValues(
        values,
        [0, 1],
        getGridConfig({ labelTicks: 4, guide: true }),
        false
      )
      expect(result).toEqual([0, 1])
    })
  })

  describe('padDomain', () => {
    const padding = 0.1

    it('returns domain with paddings when zoom is 1', () => {
      const paddedDomain = padDomain([0, 10], padding, padding, 1)
      expect(paddedDomain).toEqual([-1, 11])
    })

    it('returns domain with paddings when zoom is 2', () => {
      const paddedDomain = padDomain([-10, 10], padding, padding, 2)
      expect(paddedDomain).toEqual([-11, 11])
    })

    it('returns domain with paddings when zoom is 4', () => {
      const paddedDomain = padDomain([40, 100], padding, padding, 4)
      expect(paddedDomain).toEqual([38.5, 101.5])
    })

    it('returns domain with paddings when zoom is 8', () => {
      const paddedDomain = padDomain([-50, 50], padding, padding, 8)
      expect(paddedDomain).toEqual([-51.25, 51.25])
    })
  })
})
