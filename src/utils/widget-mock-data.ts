import { DataMap, DataType } from '@/dashboard/types'

const mockData: DataMap = {
  [DataType.Chart2D]: {
    values: [1, 2, 3],
  },
  [DataType.PieChart]: {
    values: [1, 2, 3],
    color: ['red', 'blue'],
  },
  [DataType.Number]: 23,
  [DataType.NumberWithPercentAndStatus]: {
    value: 123,
    percentage: 11,
    status: 'danger',
  },
  [DataType.Donut]: [
    [
      {
        color: 'red',
        value: 20,
      },
      {
        color: 'blue',
        value: 15,
      },
      {
        color: 'yellow',
        value: 7,
      },
    ],
    [
      {
        color: 'red',
        value: 20,
      },
      {
        color: 'blue',
        value: 15,
      },
      {
        color: 'yellow',
        value: 7,
      },
    ],
    [
      {
        color: 'red',
        value: 25,
      },
      {
        color: 'blue',
        value: 1,
      },
      {
        color: 'yellow',
        value: 5,
      },
    ],
  ],
}

export function getWidgetMockData<T extends DataType>(dataType: T): DataMap[T] {
  return mockData[dataType]
}
