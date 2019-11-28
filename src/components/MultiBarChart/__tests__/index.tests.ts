import { ColumnWithGeometry, getItemsForTooltip } from '../components/MultiBar'

const complexTooltipMaxSize = 24

const items: readonly ColumnWithGeometry[] = [
  {
    columnSize: 113,
    x: 0,
    y: 0,
    category: 'apple',
    columnName: '2018',
    value: 30,
    positionBegin: 0,
    positionEnd: 50,
  },
  {
    columnSize: 2,
    x: 0,
    y: 0,
    category: 'apple',
    columnName: '2018',
    value: 50,
    positionBegin: 50,
    positionEnd: 70,
  },
  {
    columnSize: 15,
    x: 0,
    y: 0,
    category: 'apple',
    columnName: '2018',
    value: 30,
    positionBegin: 70,
    positionEnd: 80,
  },
  {
    columnSize: 8,
    x: 0,
    y: 0,
    category: 'apple',
    columnName: '2018',
    value: 30,
    positionBegin: 80,
    positionEnd: 90,
  },
  {
    columnSize: 2,
    x: 0,
    y: 0,
    category: 'apple',
    columnName: '2018',
    value: 30,
    positionBegin: 90,
    positionEnd: 95,
  },
  {
    columnSize: 7,
    x: 0,
    y: 0,
    category: 'apple',
    columnName: '2018',
    value: 30,
    positionBegin: 95,
    positionEnd: 105,
  },
]

const items2: readonly ColumnWithGeometry[] = [
  {
    columnSize: 113,
    x: 0,
    y: 0,
    category: 'apple',
    columnName: '2018',
    value: 30,
    positionBegin: 0,
    positionEnd: 50,
  },
  {
    columnSize: 223,
    x: 0,
    y: 0,
    category: 'apple',
    columnName: '2018',
    value: 50,
    positionBegin: 50,
    positionEnd: 70,
  },
  {
    columnSize: 154,
    x: 0,
    y: 0,
    category: 'apple',
    columnName: '2018',
    value: 30,
    positionBegin: 70,
    positionEnd: 80,
  },
]

const items3: readonly ColumnWithGeometry[] = [
  {
    columnSize: 11,
    x: 0,
    y: 0,
    category: 'apple',
    columnName: '2018',
    value: 30,
    positionBegin: 0,
    positionEnd: 50,
  },
  {
    columnSize: 4,
    x: 0,
    y: 0,
    category: 'apple',
    columnName: '2018',
    value: 50,
    positionBegin: 50,
    positionEnd: 70,
  },
  {
    columnSize: 5,
    x: 0,
    y: 0,
    category: 'apple',
    columnName: '2018',
    value: 30,
    positionBegin: 70,
    positionEnd: 80,
  },
]

describe('getItemsForTooltip', () => {
  describe('из списка элементов с разными размерами элементов', () => {
    it('возвращает один элемент, если он превышает complexTooltipMaxSize', () => {
      const result = getItemsForTooltip(items, 0, complexTooltipMaxSize)

      expect(result).toEqual(items.slice(0, 1))
    })

    it('возвращает два рядомстоящих элемента, если сумма их значений не превышает complexTooltipMaxSize', () => {
      const result = getItemsForTooltip(items, 1, complexTooltipMaxSize)

      expect(result).toEqual(items.slice(1, 3))
    })

    it('возвращает три рядомстоящих элемента, если сумма из значений не превышает complexTooltipMaxSize', () => {
      const result = getItemsForTooltip(items, 4, complexTooltipMaxSize)

      expect(result).toEqual(items.slice(3, 6))
    })
  })

  describe('из списка элементов с размерами, превышающими complexTooltipMaxSize', () => {
    it('возвращает один элемент', () => {
      const result = getItemsForTooltip(items2, 1, complexTooltipMaxSize)

      expect(result).toEqual(items2.slice(1, 2))
    })
  })

  describe('из списка, где сумма значений всех элементов не превышает complexTooltipMaxSize', () => {
    it('возвращает полный список значений', () => {
      const result = getItemsForTooltip(items3, 1, complexTooltipMaxSize)

      expect(result).toEqual(items3.slice(0, 4))
    })
  })
})
