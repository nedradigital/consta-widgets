import { Group as CoreGroup } from '@/core/BarChart'

import { Group } from '../'
import { transformGroupsToCommonGroups } from '../helpers'

describe('transformGroupsToCoreGroups', () => {
  const groups: readonly Group[] = [
    {
      groupName: 'март',
      values: [
        {
          colorGroupName: 'plan',
          value: 4,
        },
        {
          colorGroupName: 'fact',
          value: 2,
        },
        {
          colorGroupName: 'forecast',
          value: undefined,
        },
      ],
    },
  ]

  const colorGroups = {
    plan: 'red',
    fact: 'blue',
    forecast: 'green',
  }

  it('преобразует BarChart группы к основным гуппам', () => {
    const received = transformGroupsToCommonGroups(groups, colorGroups)

    const expected: readonly CoreGroup[] = [
      {
        name: 'март',
        columns: [
          { total: 4, sections: [{ color: 'red', value: 4 }] },
          { total: 2, sections: [{ color: 'blue', value: 2 }] },
          undefined,
        ],
        reversedColumns: [
          { total: 0, sections: undefined },
          { total: 0, sections: undefined },
          undefined,
        ],
      },
    ]

    expect(received).toEqual(expected)
  })
})
