import { Group } from '../'
import { getAxisShowPositions, getFormatter, transformGroupsToCommonGroups } from '../helpers'

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

describe('transformGroupsToCommonGroups', () => {
  const groups: readonly Group[] = [
    {
      groupName: 'март',
      values: [
        {
          plan: 4,
        },
        {
          fact: 2,
        },
      ],
    },
    {
      groupName: 'апрель',
      values: [
        {
          plan: undefined,
        },
        {
          fact: 5,
        },
      ],
    },
  ]

  const colorGroups = {
    plan: 'red',
    fact: 'blue',
  }

  it('преобразует TornadoChart группы к основным гуппам', () => {
    const result = transformGroupsToCommonGroups(groups, colorGroups)

    expect(result).toEqual([
      {
        name: 'март',
        total: 6,
        columns: [{ total: 2, sections: [{ color: 'blue', value: 2 }] }],
        reversedColumns: [{ total: 4, sections: [{ color: 'red', value: 4 }] }],
      },
      {
        name: 'апрель',
        total: 5,
        columns: [{ total: 5, sections: [{ color: 'blue', value: 5 }] }],
        reversedColumns: [{ total: undefined, sections: [] }],
      },
    ])
  })
})
