import { scaleLinear } from '@/utils/scale'

import { Groups } from '../'
import { getDataColumns, getDomain } from '../helpers'

const COLOR_GROUPS = {
  baton: 'black',
  buhanka: 'white',
  korovay: 'gray',
}
const TEST_GROUPS: Groups = [
  {
    groupName: 'прошлогодний',
    values: [
      { baton: 10, buhanka: 5, korovay: 30 },
      { baton: 5, buhanka: 0, korovay: 10 },
      { baton: 100, buhanka: 35, korovay: 50 },
    ],
  },
  {
    groupName: 'свежий',
    values: [{ baton: 100 }, { buhanka: undefined }, { korovay: 127 }],
  },
]

const COLUMNS_DATA = [
  {
    groupName: 'прошлогодний',
    columnDetails: [
      [
        {
          category: 'baton',
          columnName: '0',
          positionBegin: 0,
          positionEnd: 10,
          value: 10,
          columnSize: 10,
        },
        {
          category: 'buhanka',
          columnName: '0',
          positionBegin: 10,
          positionEnd: 15,
          value: 5,
          columnSize: 5,
        },
        {
          category: 'korovay',
          columnName: '0',
          positionBegin: 15,
          positionEnd: 45,
          value: 30,
          columnSize: 30,
        },
      ],
      [
        {
          category: 'baton',
          columnName: '1',
          positionBegin: 0,
          positionEnd: 5,
          value: 5,
          columnSize: 5,
        },
        {
          category: 'buhanka',
          columnName: '1',
          positionBegin: 5,
          positionEnd: 5,
          value: 0,
          columnSize: 0,
        },
        {
          category: 'korovay',
          columnName: '1',
          positionBegin: 5,
          positionEnd: 15,
          value: 10,
          columnSize: 10,
        },
      ],
      [
        {
          category: 'baton',
          columnName: '2',
          positionBegin: 0,
          positionEnd: 100,
          value: 100,
          columnSize: 100,
        },
        {
          category: 'buhanka',
          columnName: '2',
          positionBegin: 100,
          positionEnd: 135,
          value: 35,
          columnSize: 35,
        },
        {
          category: 'korovay',
          columnName: '2',
          positionBegin: 135,
          positionEnd: 185,
          value: 50,
          columnSize: 50,
        },
      ],
    ],
  },
  {
    groupName: 'свежий',
    columnDetails: [
      [
        {
          category: 'baton',
          columnName: '0',
          positionBegin: 0,
          positionEnd: 100,
          value: 100,
          columnSize: 100,
        },
      ],
      [
        {
          category: 'korovay',
          columnName: '1',
          positionBegin: 0,
          positionEnd: 127,
          value: 127,
          columnSize: 127,
        },
      ],
    ],
  },
] as const

const NORMALIZED_COLUMNS_DATA = [
  {
    groupName: 'прошлогодний',
    columnDetails: [
      [
        {
          category: 'baton',
          columnName: '0',
          positionBegin: 0,
          positionEnd: 41,
          value: 10,
          columnSize: 41,
        },
        {
          category: 'buhanka',
          columnName: '0',
          positionBegin: 41,
          positionEnd: 62,
          value: 5,
          columnSize: 21,
        },
        {
          category: 'korovay',
          columnName: '0',
          positionBegin: 62,
          positionEnd: 185,
          value: 30,
          columnSize: 123,
        },
      ],
      [
        {
          category: 'baton',
          columnName: '1',
          positionBegin: 0,
          positionEnd: 62,
          value: 5,
          columnSize: 62,
        },
        {
          category: 'buhanka',
          columnName: '1',
          positionBegin: 62,
          positionEnd: 62,
          value: 0,
          columnSize: 0,
        },
        {
          category: 'korovay',
          columnName: '1',
          positionBegin: 62,
          positionEnd: 185,
          value: 10,
          columnSize: 123,
        },
      ],
      [
        {
          category: 'baton',
          columnName: '2',
          positionBegin: 0,
          positionEnd: 100,
          value: 100,
          columnSize: 100,
        },
        {
          category: 'buhanka',
          columnName: '2',
          positionBegin: 100,
          positionEnd: 135,
          value: 35,
          columnSize: 35,
        },
        {
          category: 'korovay',
          columnName: '2',
          positionBegin: 135,
          positionEnd: 185,
          value: 50,
          columnSize: 50,
        },
      ],
    ],
  },
  {
    groupName: 'свежий',
    columnDetails: [
      [
        {
          category: 'baton',
          columnName: '0',
          positionBegin: 0,
          positionEnd: 185,
          value: 100,
          columnSize: 185,
        },
      ],
      [
        {
          category: 'korovay',
          columnName: '1',
          positionBegin: 0,
          positionEnd: 185,
          value: 127,
          columnSize: 185,
        },
      ],
    ],
  },
] as const

const MAX_VALUE = 185

const valuesScale = scaleLinear({
  domain: [0, MAX_VALUE],
  range: [0, MAX_VALUE],
})

describe('getDataColumns', () => {
  it('возвращает массив с координатами для баров', () => {
    expect(
      getDataColumns({
        groups: TEST_GROUPS,
        categories: Object.keys(COLOR_GROUPS),
        hasRatio: false,
        maxValue: 0,
        valuesScale,
      })
    ).toEqual(COLUMNS_DATA)
  })

  it('возвращает массив с координатами для баров, которые растянуты по максимальному значению оси', () => {
    expect(
      getDataColumns({
        groups: TEST_GROUPS,
        categories: Object.keys(COLOR_GROUPS),
        hasRatio: true,
        maxValue: MAX_VALUE,
        valuesScale,
      })
    ).toEqual(NORMALIZED_COLUMNS_DATA)
  })
})

describe('getDomain', () => {
  it('возвращает значение для домена', () => {
    expect(getDomain(TEST_GROUPS)).toEqual([0, MAX_VALUE])
  })
})
