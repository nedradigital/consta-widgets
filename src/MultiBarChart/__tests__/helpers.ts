import { Group } from '../'
import { transformGroupsToCommonGroups } from '../helpers'

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

  it('преобразует MultiBarChart группы к основным гуппам', () => {
    const result = transformGroupsToCommonGroups(groups, colorGroups)

    expect(result).toEqual([
      {
        name: 'март',
        total: 6,
        columns: [
          {
            total: 4,
            sections: [{ color: 'red', value: 4 }],
          },
          {
            total: 2,
            sections: [{ color: 'blue', value: 2 }],
          },
        ],
        reversedColumns: [undefined, undefined],
      },
      {
        name: 'апрель',
        total: 5,
        columns: [undefined, { total: 5, sections: [{ color: 'blue', value: 5 }] }],
        reversedColumns: [undefined, undefined],
      },
    ])
  })
})
