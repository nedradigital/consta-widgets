import { Groups } from '@/core/BarChart'

import { getAxisShowPositions, getFormatter, getGroupsDomain, getValuesDomain } from '../helpers'

describe('getFormatter', () => {
  it('получение фукнции форматирования значения для подписей', () => {
    const formatter = getFormatter()

    expect(formatter(-10)).toEqual('10')
  })

  it('получение функции форматирования значения для подписей с дополнительной обработкой', () => {
    const formatter = getFormatter(value => `$${value}`)

    expect(formatter(-10)).toEqual('$10')
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

  it('возвращает отсортированный по убыванию значения массив названий групп для торнадо графика', () => {
    expect(getGroupsDomain(groups)).toEqual(['группа 3', 'группа 2', 'группа 1'])
  })
})

describe('getValuesDomain', () => {
  const groups: Groups = [
    {
      groupName: 'Группа 1',
      values: [{ left: 100 }, { right: 50 }],
    },
    {
      groupName: 'Группа 2',
      values: [{ left: 50 }, { right: 200 }],
    },
  ]

  it('возвращает значения для домена', () => {
    const result = getValuesDomain(groups)

    expect(result).toEqual([-200, 200])
  })
})
