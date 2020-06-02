import { Group as CoreGroup } from '@/core/BarChart'

import { Group } from '../'
import { transformGroupsToCoreGroups } from '../helpers'

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
      ],
    },
  ]

  it('преобразует BarChart группы к основным гуппам', () => {
    const received = transformGroupsToCoreGroups(groups)

    const expected: readonly CoreGroup[] = [
      {
        groupName: 'март',
        values: [{ plan: 4 }, { fact: 2 }],
      },
    ]

    expect(received).toEqual(expected)
  })
})
