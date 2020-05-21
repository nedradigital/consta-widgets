import { scaleLinear } from '@/common/utils/scale'

import { Groups } from '../'
import {
  createFormatValue,
  getAxisShowPositions,
  getColumnDetails,
  getDataColumns,
  getDomain,
  getEveryNTick,
  getGraphStepSize,
  getGroupDomain,
  getRange,
  getTotalByColumn,
  isLeftTornadoBar,
  scaleBand,
  transformBarChartGroupsToCommonGroups,
} from '../helpers'

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

const TEST_GROUPS_WITH_RATIO: Groups = [
  {
    groupName: 'group1',
    values: [{ baton: 1, buhanka: 1, korovay: 1 }],
  },
  {
    groupName: 'group2',
    values: [{ baton: 1, buhanka: 1, korovay: 2 }],
  },
  {
    groupName: 'group3',
    values: [{ baton: 1, buhanka: 1, korovay: 3 }],
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
    groupName: 'group1',
    columnDetails: [
      [
        {
          category: 'baton',
          columnName: '0',
          columnSize: 5,
          positionBegin: 0,
          positionEnd: 5,
          value: 1,
        },
        {
          category: 'buhanka',
          columnName: '0',
          columnSize: 5,
          positionBegin: 5,
          positionEnd: 10,
          value: 1,
        },
        {
          category: 'korovay',
          columnName: '0',
          columnSize: 5,
          positionBegin: 10,
          positionEnd: 15,
          value: 1,
        },
      ],
    ],
  },
  {
    groupName: 'group2',
    columnDetails: [
      [
        {
          category: 'baton',
          columnName: '0',
          columnSize: 5,
          positionBegin: 0,
          positionEnd: 5,
          value: 1,
        },
        {
          category: 'buhanka',
          columnName: '0',
          columnSize: 5,
          positionBegin: 5,
          positionEnd: 10,
          value: 1,
        },
        {
          category: 'korovay',
          columnName: '0',
          columnSize: 5,
          positionBegin: 10,
          positionEnd: 15,
          value: 2,
        },
      ],
    ],
  },
  {
    groupName: 'group3',
    columnDetails: [
      [
        {
          category: 'baton',
          columnName: '0',
          columnSize: 5,
          positionBegin: 0,
          positionEnd: 5,
          value: 1,
        },
        {
          category: 'buhanka',
          columnName: '0',
          columnSize: 5,
          positionBegin: 5,
          positionEnd: 10,
          value: 1,
        },
        {
          category: 'korovay',
          columnName: '0',
          columnSize: 5,
          positionBegin: 10,
          positionEnd: 15,
          value: 3,
        },
      ],
    ],
  },
] as const

const getValuesScale = (maxValue: number) =>
  scaleLinear({
    domain: [0, maxValue],
    range: [0, maxValue],
  })

describe('getDataColumns', () => {
  it('возвращает массив с координатами для баров', () => {
    const MAX_VALUE = 185
    expect(
      getDataColumns({
        groups: TEST_GROUPS,
        categories: Object.keys(COLOR_GROUPS),
        hasRatio: false,
        maxValue: 0,
        valuesScale: getValuesScale(MAX_VALUE),
      })
    ).toEqual(COLUMNS_DATA)
  })

  it('возвращает массив с координатами для баров, которые растянуты по максимальному значению оси', () => {
    const MAX_VALUE = 5
    expect(
      getDataColumns({
        groups: TEST_GROUPS_WITH_RATIO,
        categories: Object.keys(COLOR_GROUPS),
        hasRatio: true,
        maxValue: MAX_VALUE,
        valuesScale: getValuesScale(MAX_VALUE),
      })
    ).toEqual(NORMALIZED_COLUMNS_DATA)
  })
})

describe('getDomain', () => {
  const MAX_VALUE = 185
  it('возвращает значение для домена', () => {
    expect(getDomain(TEST_GROUPS)).toEqual([0, MAX_VALUE])
  })

  it('возвращает значения для домена с отрицательными значениями', () => {
    expect(
      getDomain([
        {
          groupName: '1',
          values: [{ baton: -100 }, { buhanka: 50 }, { korovay: 100 }],
        },
      ])
    ).toEqual([-100, 100])
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

  it('возвращает значение размера шага второй группы, если их всего 2', () => {
    expect(getGraphStepSize(450, [250, 50])).toEqual(200)
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

describe('getRange', () => {
  it('возвращает диапазон', () => {
    expect(getRange(100)).toEqual([0, 100])
  })

  it('возвращает перевернутый диапазон', () => {
    expect(getRange(100, true)).toEqual([100, 0])
  })
})

describe('getTotalByColumn', () => {
  it('возвращает 0 если в колонке нет данных', () => {
    expect(getTotalByColumn({})).toEqual(0)
  })

  it('возвращает сумму значений всей колонки', () => {
    expect(getTotalByColumn({ baton: 10, buhanka: 5, korovay: 30 })).toEqual(45)
  })

  it('возвращает сумму значений всей колонки, не учитывая пустые значения', () => {
    expect(getTotalByColumn({ baton: 10, buhanka: undefined, korovay: 30 })).toEqual(40)
  })
})

describe('getColumnDetails', () => {
  const CATEGORIES = ['baton', 'buhanka'] as const

  describe('горизонтальный график', () => {
    const MAX_VALUE = 185
    it('получение детальной информации о столбце', () => {
      expect(
        getColumnDetails({
          categories: CATEGORIES,
          column: { baton: 10, buhanka: 30 },
          columnName: '1',
          maxValue: MAX_VALUE,
          valuesScale: getValuesScale(MAX_VALUE),
        })
      ).toEqual([
        {
          category: 'baton',
          columnName: '1',
          columnSize: 10,
          positionBegin: 0,
          positionEnd: 10,
          value: 10,
        },
        {
          category: 'buhanka',
          columnName: '1',
          columnSize: 30,
          positionBegin: 10,
          positionEnd: 40,
          value: 30,
        },
      ])
    })

    it('получение детальной информации о столбце с отрицательным значением', () => {
      expect(
        getColumnDetails({
          categories: CATEGORIES,
          column: { baton: -100 },
          columnName: '1',
          maxValue: MAX_VALUE,
          valuesScale: getValuesScale(MAX_VALUE),
        })
      ).toEqual([
        {
          category: 'baton',
          columnName: '1',
          columnSize: 100,
          positionBegin: 0,
          positionEnd: 100,
          value: -100,
        },
      ])
    })

    it('получение детальной информации о столбце где размер колонки не может быть меньше 5', () => {
      expect(
        getColumnDetails({
          categories: CATEGORIES,
          column: { baton: 1 },
          columnName: '1',
          maxValue: MAX_VALUE,
          valuesScale: getValuesScale(MAX_VALUE),
        })
      ).toEqual([
        {
          category: 'baton',
          columnName: '1',
          columnSize: 5,
          positionBegin: 0,
          positionEnd: 5,
          value: 1,
        },
      ])
    })

    it('получение детальной информации о столбце с пропуском значения', () => {
      expect(
        getColumnDetails({
          categories: ['baton', 'buhanka', 'korovay'],
          column: { baton: 10, buhanka: undefined, korovay: 30 },
          columnName: '1',
          maxValue: MAX_VALUE,
          valuesScale: getValuesScale(MAX_VALUE),
        })
      ).toEqual([
        {
          category: 'baton',
          columnName: '1',
          columnSize: 10,
          positionBegin: 0,
          positionEnd: 10,
          value: 10,
        },
        {
          category: 'korovay',
          columnName: '1',
          columnSize: 30,
          positionBegin: 10,
          positionEnd: 40,
          value: 30,
        },
      ])
    })
  })

  describe('вертикальный график', () => {
    const MAX_VALUE = 185
    const scaler = scaleLinear({
      domain: [MAX_VALUE, 0],
      range: [0, MAX_VALUE],
    })

    it('получение детальной информации о столбце', () => {
      expect(
        getColumnDetails({
          categories: CATEGORIES,
          column: { baton: 10, buhanka: 30 },
          columnName: '1',
          maxValue: MAX_VALUE,
          valuesScale: scaler,
        })
      ).toEqual([
        {
          category: 'baton',
          columnName: '1',
          columnSize: 10,
          positionBegin: 185,
          positionEnd: 175,
          value: 10,
        },
        {
          category: 'buhanka',
          columnName: '1',
          columnSize: 30,
          positionBegin: 175,
          positionEnd: 145,
          value: 30,
        },
      ])
    })

    it('получение детальной информации о столбце с отрицательным значением', () => {
      expect(
        getColumnDetails({
          categories: CATEGORIES,
          column: { baton: -100 },
          columnName: '1',
          maxValue: MAX_VALUE,
          valuesScale: scaler,
        })
      ).toEqual([
        {
          category: 'baton',
          columnName: '1',
          columnSize: 100,
          positionBegin: 185,
          positionEnd: 85,
          value: -100,
        },
      ])
    })

    it('получение детальной информации о столбце где размер колонки не может быть меньше 5', () => {
      expect(
        getColumnDetails({
          categories: CATEGORIES,
          column: { baton: 1 },
          columnName: '1',
          maxValue: MAX_VALUE,
          valuesScale: scaler,
        })
      ).toEqual([
        {
          category: 'baton',
          columnName: '1',
          columnSize: 5,
          positionBegin: 185,
          positionEnd: 180,
          value: 1,
        },
      ])
    })

    it('получение детальной информации о столбце с пропуском значения', () => {
      expect(
        getColumnDetails({
          categories: ['baton', 'buhanka', 'korovay'],
          column: { baton: 10, buhanka: undefined, korovay: 30 },
          columnName: '1',
          maxValue: MAX_VALUE,
          valuesScale: scaler,
        })
      ).toEqual([
        {
          category: 'baton',
          columnName: '1',
          columnSize: 10,
          positionBegin: 185,
          positionEnd: 175,
          value: 10,
        },
        {
          category: 'korovay',
          columnName: '1',
          columnSize: 30,
          positionBegin: 175,
          positionEnd: 145,
          value: 30,
        },
      ])
    })
  })
})

describe('transformBarChartGroupsToCommonGroups', () => {
  it('преобразование групп колонок к общему виду', () => {
    expect(
      transformBarChartGroupsToCommonGroups([
        {
          groupName: '1',
          values: [
            { colorGroupName: 'success', value: 1 },
            { colorGroupName: 'warning', value: 2 },
          ],
        },
      ])
    ).toEqual([
      {
        groupName: '1',
        values: [{ success: 1 }, { warning: 2 }],
      },
    ])
  })
})

describe('getGroupDomain', () => {
  const groups: Groups = [
    {
      groupName: 'группа 1',
      values: [
        { value1: 10, value2: 5, value3: 30 },
        { value1: 5, value2: 0, value3: 10 },
      ],
    },
    {
      groupName: 'группа 2',
      values: [{ value1: 100 }, { value2: undefined }, { value3: 127 }],
    },
    {
      groupName: 'группа 3',
      values: [{ value1: 300 }, { value2: 12 }, { value3: 22 }],
    },
  ]

  it('возвращает массив названий групп', () => {
    expect(getGroupDomain(groups)).toEqual(['группа 1', 'группа 2', 'группа 3'])
  })

  it('возвращает отсортированный по убыванию значения массив названий групп для торнадо графика', () => {
    expect(getGroupDomain(groups, true)).toEqual(['группа 3', 'группа 2', 'группа 1'])
  })
})

describe('isLeftTornadoBar', () => {
  it('возвращает true, если индекс бара четный', () => {
    expect(isLeftTornadoBar(0)).toBeTrue()
  })

  it('возвращает false, если индекс бара нечетный', () => {
    expect(isLeftTornadoBar(3)).toBeFalse()
  })
})

describe('createFormatValue', () => {
  it('возвращает функцию для форматирования', () => {
    const formatValue = createFormatValue()

    expect(formatValue).toBeFunction()
  })

  it('без параметров возвращает принимаемое значение', () => {
    const formatValue = createFormatValue()

    expect(formatValue(42)).toBe('42')
    expect(formatValue(-42)).toBe('-42')
  })

  it('применяет перданную функцию форматирования', () => {
    const formatValue = createFormatValue({
      formatValue: value => `Value is ${value}`,
    })

    expect(formatValue(42)).toBe('Value is 42')
  })

  it('возвращает значение без знака "-" для торнадочарта', () => {
    const formatValue = createFormatValue({ isTornado: true })

    expect(formatValue(-42)).toBe('42')
  })

  it('передает функции форматирования значение без знака "-"  для торнадочарта', () => {
    const formatValue = createFormatValue({
      isTornado: true,
      formatValue: value => `Value is ${value}`,
    })

    expect(formatValue(42)).toBe('Value is 42')
  })
})

describe('getAxisShowPositions', () => {
  it('возвращает объект с позициями для отображения осей', () => {
    expect(getAxisShowPositions('top', 'left')).toEqual({
      left: true,
      right: false,
      top: true,
      bottom: false,
    })

    expect(getAxisShowPositions('both', 'both')).toEqual({
      left: true,
      right: true,
      top: true,
      bottom: true,
    })

    expect(getAxisShowPositions('none', 'both')).toEqual({
      left: true,
      right: true,
      top: false,
      bottom: false,
    })

    expect(getAxisShowPositions('bottom', 'both')).toEqual({
      left: true,
      right: true,
      top: false,
      bottom: true,
    })
  })
})
