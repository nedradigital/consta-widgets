import * as d3 from 'd3'

import { calculateSecondaryDomain, Item, Line, NumberRange } from '../'

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
const getXDomain = (_: boolean, items: readonly Item[]) => d3.extent(items, v => v.x) as NumberRange
const getYDomain = (_: boolean, items: readonly Item[]) => d3.extent(items, v => v.y) as NumberRange

describe('<LinearChart />', () => {
  it('Calculate secondary domain for horizontal mode and single line', () => {
    const domain = calculateSecondaryDomain(false, 2, 6, horizontalLine, v => v.x, getYDomain)
    expect(domain).toEqual([0, 9])
  })

  it('Calculate secondary domain for horizontal mode and multiple lines', () => {
    const domain = calculateSecondaryDomain(false, 2, 6, horizontalLines, v => v.x, getYDomain)
    expect(domain).toEqual([-4, 10])
  })

  it('Calculate secondary domain for horizontal mode in max left position', () => {
    const domain = calculateSecondaryDomain(false, 1, 2, horizontalLine, v => v.x, getYDomain)
    expect(domain).toEqual([6, 9])
  })

  it('Calculate secondary domain for horizontal mode in max right position', () => {
    const domain = calculateSecondaryDomain(false, 6, 7, horizontalLine, v => v.x, getYDomain)
    expect(domain).toEqual([0, 3])
  })

  it('Calculate secondary domain for vertical mode and single line', () => {
    const domain = calculateSecondaryDomain(true, 1.5, 7.5, verticalLine, v => v.y, getXDomain)
    expect(domain).toEqual([0, 9])
  })

  it('Calculate secondary domain for vertical mode and multiple lines', () => {
    const domain = calculateSecondaryDomain(true, 2, 6, verticalLines, v => v.y, getXDomain)
    expect(domain).toEqual([-4, 10])
  })
})