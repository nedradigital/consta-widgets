import { GroupItem as CoreGroup } from '@/_private/components/BarChart/components/Group'

import { Group } from '../'
import { transformGroupsToCommonGroups } from '../helpers'

describe('transformGroupsToCommonGroups', () => {
  const groups: readonly Group[] = [
    {
      groupName: 'март',
      values: [[{ value: 4, color: 'red' }], [{ value: 2, color: 'blue' }], undefined],
    },
    {
      groupName: 'апрель',
      values: [[{ value: undefined, color: 'red' }], [{ value: 5, color: 'blue' }]],
    },
  ]

  it('преобразует MultiBarChart группы к основным группам', () => {
    const received = transformGroupsToCommonGroups({ groups })

    const expected: readonly CoreGroup[] = [
      {
        name: 'март',
        columns: [
          {
            total: 4,
            sections: [{ color: 'red', value: 4 }],
          },
          {
            total: 2,
            sections: [{ color: 'blue', value: 2 }],
          },
          { total: 0, sections: undefined },
        ],
        reversedColumns: [
          { total: 0, sections: undefined },
          { total: 0, sections: undefined },
          { total: 0, sections: undefined },
        ],
      },
      {
        name: 'апрель',
        columns: [
          { total: 0, sections: undefined },
          { total: 5, sections: [{ color: 'blue', value: 5 }] },
        ],
        reversedColumns: [
          { total: 0, sections: undefined },
          { total: 0, sections: undefined },
        ],
      },
    ]

    expect(received).toEqual(expected)
  })

  it('преобразует MultiBarChart группы к основным группам, пропуская пустые колонки', () => {
    const received = transformGroupsToCommonGroups({
      groups,
      skipEmptyColumns: true,
    })

    const expected: readonly CoreGroup[] = [
      {
        name: 'март',
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
        reversedColumns: [
          { total: 0, sections: undefined },
          { total: 0, sections: undefined },
        ],
      },
      {
        name: 'апрель',
        columns: [
          { total: 0, sections: undefined },
          { total: 5, sections: [{ color: 'blue', value: 5 }] },
        ],
        reversedColumns: [
          { total: 0, sections: undefined },
          { total: 0, sections: undefined },
        ],
      },
    ]

    expect(received).toEqual(expected)
  })

  it('преобразует MultiBarChart группы к основным группам, пропуская пустые группы', () => {
    const received = transformGroupsToCommonGroups({
      groups: [
        ...groups,
        {
          groupName: 'май',
          values: [],
        },
      ],
      skipEmptyGroups: true,
    })

    const expected: readonly CoreGroup[] = [
      {
        name: 'март',
        columns: [
          {
            total: 4,
            sections: [{ color: 'red', value: 4 }],
          },
          {
            total: 2,
            sections: [{ color: 'blue', value: 2 }],
          },
          { total: 0, sections: undefined },
        ],
        reversedColumns: [
          { total: 0, sections: undefined },
          { total: 0, sections: undefined },
          { total: 0, sections: undefined },
        ],
      },
      {
        name: 'апрель',
        columns: [
          { total: 0, sections: undefined },
          { total: 5, sections: [{ color: 'blue', value: 5 }] },
        ],
        reversedColumns: [
          { total: 0, sections: undefined },
          { total: 0, sections: undefined },
        ],
      },
    ]

    expect(received).toEqual(expected)
  })
})
