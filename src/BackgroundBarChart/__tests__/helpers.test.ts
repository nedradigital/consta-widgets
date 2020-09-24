import { Group } from '../'
import { getValuesDomain, transformGroupsToCommonGroups } from '../helpers'

const groups: readonly Group[] = [
  {
    groupName: 'март',
    values: [
      { value: 4, color: 'red', name: 'первый' },
      { value: 2, color: 'blue', name: 'второй' },
    ],
    backgroundValues: [
      { value: 8, color: 'cyan' },
      { value: 2, color: 'green' },
    ],
  },
  {
    groupName: 'апрель',
    isDisabled: true,
    values: [
      { value: undefined, color: 'red', name: 'третий' },
      { value: 5, color: 'blue', name: 'четвертый' },
    ],
    backgroundValues: [
      { value: 5, color: 'green' },
      { value: undefined, color: 'red' },
    ],
  },
  {
    groupName: 'май',
    values: [],
    backgroundValues: [],
  },
]

describe('getValuesDomain', () => {
  it('возвращает значения для домена', () => {
    expect(getValuesDomain(groups)).toEqual([0, 10])
  })

  it('возвращает значения для домена с границей', () => {
    const threshold = {
      color: 'red',
      value: 15,
    }

    expect(getValuesDomain(groups, threshold)).toEqual([0, 15])
  })
})

describe('transformGroupsToCommonGroups', () => {
  it('преобразует BackgroundBarChart группы к основным гуппам', () => {
    const result = transformGroupsToCommonGroups(groups)

    expect(result).toEqual([
      {
        name: 'март',
        isDisabled: undefined,
        total: 6,
        column: {
          total: 6,
          sections: [
            { color: 'red', value: 4, name: 'первый' },
            { color: 'blue', value: 2, name: 'второй' },
          ],
        },
        backgroundColumn: {
          total: 10,
          sections: [
            { value: 8, color: 'cyan', name: undefined },
            { value: 2, color: 'green', name: undefined },
          ],
        },
      },
      {
        name: 'апрель',
        isDisabled: true,
        total: 5,
        column: { total: 5, sections: [{ color: 'blue', value: 5, name: 'четвертый' }] },
        backgroundColumn: {
          total: 5,
          sections: [{ value: 5, color: 'green', name: undefined }],
        },
      },
      {
        name: 'май',
        isDisabled: undefined,
        total: 0,
        column: {
          total: 0,
          sections: [],
        },

        backgroundColumn: {
          total: 0,
          sections: [],
        },
      },
    ])
  })
})
