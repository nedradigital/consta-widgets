import { Data, getDataColumns, getUniqColumnNames, normalizeDetails } from '../'

const TEST_DATA: Data = {
  categories: ['baton', 'buhanka', 'korovay'],
  groups: [
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
  ],
}

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
        },
        {
          category: 'buhanka',
          columnName: '0',
          positionBegin: 10,
          positionEnd: 15,
          value: 5,
        },
        {
          category: 'korovay',
          columnName: '0',
          positionBegin: 15,
          positionEnd: 45,
          value: 30,
        },
      ],
      [
        {
          category: 'baton',
          columnName: '1',
          positionBegin: 0,
          positionEnd: 5,
          value: 5,
        },
        {
          category: 'buhanka',
          columnName: '1',
          positionBegin: 5,
          positionEnd: 5,
          value: 0,
        },
        {
          category: 'korovay',
          columnName: '1',
          positionBegin: 5,
          positionEnd: 15,
          value: 10,
        },
      ],
      [
        {
          category: 'baton',
          columnName: '2',
          positionBegin: 0,
          positionEnd: 100,
          value: 100,
        },
        {
          category: 'buhanka',
          columnName: '2',
          positionBegin: 100,
          positionEnd: 135,
          value: 35,
        },
        {
          category: 'korovay',
          columnName: '2',
          positionBegin: 135,
          positionEnd: 185,
          value: 50,
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
        },
      ],
      [
        {
          category: 'korovay',
          columnName: '1',
          positionBegin: 0,
          positionEnd: 127,
          value: 127,
        },
      ],
    ],
  },
] as const

describe('getUniqColumnNames', () => {
  it('возвращает уникальные имена', () => {
    expect(getUniqColumnNames(TEST_DATA.groups)).toEqual(['0', '1', '2'])
  })
})

describe('getDataColumns', () => {
  it('возвращает массив с координатами для баров', () => {
    expect(
      getDataColumns({
        groups: TEST_DATA.groups,
        categories: TEST_DATA.categories,
        uniqueColumnNames: ['0', '1', '2'],
      })
    ).toEqual(COLUMNS_DATA)
  })
})

describe('normalizeDetails', () => {
  it('возвращает исходные значения баров', () => {
    expect(
      normalizeDetails({ details: COLUMNS_DATA[0].columnDetails, maxValue: 0, hasRatio: false })
    ).toEqual(COLUMNS_DATA[0].columnDetails)
  })

  it('возвращает значения баров, которые растянуты по максимальному значению оси', () => {
    expect(
      normalizeDetails({ details: COLUMNS_DATA[0].columnDetails, maxValue: 500, hasRatio: true })
    ).toEqual([
      [
        {
          category: 'baton',
          columnName: '0',
          positionBegin: 0,
          positionEnd: 111,
          value: 10,
        },
        {
          category: 'buhanka',
          columnName: '0',
          positionBegin: 111,
          positionEnd: 167,
          value: 5,
        },
        {
          category: 'korovay',
          columnName: '0',
          positionBegin: 167,
          positionEnd: 500,
          value: 30,
        },
      ],
      [
        {
          category: 'baton',
          columnName: '1',
          positionBegin: 0,
          positionEnd: 167,
          value: 5,
        },
        {
          category: 'buhanka',
          columnName: '1',
          positionBegin: 167,
          positionEnd: 167,
          value: 0,
        },
        {
          category: 'korovay',
          columnName: '1',
          positionBegin: 167,
          positionEnd: 500,
          value: 10,
        },
      ],
      [
        {
          category: 'baton',
          columnName: '2',
          positionBegin: 0,
          positionEnd: 270,
          value: 100,
        },
        {
          category: 'buhanka',
          columnName: '2',
          positionBegin: 270,
          positionEnd: 365,
          value: 35,
        },
        {
          category: 'korovay',
          columnName: '2',
          positionBegin: 365,
          positionEnd: 500,
          value: 50,
        },
      ],
    ])
  })
})
