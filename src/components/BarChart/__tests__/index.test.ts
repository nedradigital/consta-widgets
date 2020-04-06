import { scaleLinear } from '@/utils/scale'

import { Groups } from '../'
import { getDataColumns, getDomain, getEveryNTick, getGraphStepSize, scaleBand } from '../helpers'

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

describe('getEveryNTick', () => {
  it('получение каждой засечки', () => {
    expect(getEveryNTick([0, 1, 2, 3, 4], 1)).toEqual([0, 1, 2, 3, 4])
  })

  it('получение каждой второй засечки', () => {
    expect(getEveryNTick([0, 1, 2, 3, 4], 2)).toEqual([0, 2, 4])
  })

  it('получение каждой засечки, с учетом отрицательных значений', () => {
    expect(getEveryNTick([-3, -2, -1, 0, 1, 2, 3], 1)).toEqual([-3, -2, -1, 0, 1, 2, 3])
  })

  it('получение каждой второй засечки, с учетом отрицательных значений', () => {
    expect(getEveryNTick([-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5], 2)).toEqual([-4, -2, 0, 2, 4])
  })
})

describe('getGraphStepSize', () => {
  it('возвращает размер графика, как размер группы если массив размеров пуст', () => {
    expect(getGraphStepSize(450, [])).toEqual(450)
  })

  it('возвращает размер графика, как размер группы если массив размеров содержит 1 элемент', () => {
    expect(getGraphStepSize(450, [50])).toEqual(450)
  })

  it('возвращает значение размера шага группы', () => {
    expect(getGraphStepSize(450, [150, 50, 50, 150])).toEqual(75)
  })
})

describe('scaleBand', () => {
  const groupsNames = ['3', 'чет', 'абв', '1', 'где'] as const
  const groupScale = scaleBand({
    groupsSizes: groupsNames.reduce((acc, curr) => ({ ...acc, [curr]: 50 }), {}),
    range: [0, 500],
    groupsNames,
  })

  it('возвращает позицию для группы с сохранением её порядка', () => {
    expect(groupScale.scale(groupsNames[0])).toEqual(0)
    expect(groupScale.scale(groupsNames[1])).toEqual(100)
    expect(groupScale.scale(groupsNames[2])).toEqual(200)
    expect(groupScale.scale(groupsNames[3])).toEqual(300)
    expect(groupScale.scale(groupsNames[4])).toEqual(400)
  })

  it('возвращает значение, если не передано имя группы', () => {
    expect(groupScale.bandwidth!()).toEqual(0)
  })

  it('возвращает посчитанный размер группы, если передано имя группы', () => {
    expect(groupScale.bandwidth!(groupsNames[0])).toEqual(100)
    expect(groupScale.bandwidth!(groupsNames[1])).toEqual(100)
    expect(groupScale.bandwidth!(groupsNames[2])).toEqual(100)
    expect(groupScale.bandwidth!(groupsNames[3])).toEqual(100)
    expect(groupScale.bandwidth!(groupsNames[4])).toEqual(100)
  })

  it('возвращает минимальный размер группы, если передано имя группы', () => {
    const groupScaleMinSize = scaleBand({
      groupsSizes: {
        1: 50,
        2: 100,
        3: 150,
      },
      range: [0, 300],
      groupsNames: ['1', '2', '3'],
    })

    expect(groupScaleMinSize.bandwidth!('1')).toEqual(50)
    expect(groupScaleMinSize.bandwidth!('2')).toEqual(100)
    expect(groupScaleMinSize.bandwidth!('3')).toEqual(150)
  })
})
