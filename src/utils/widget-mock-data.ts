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
}

export function getWidgetMockData<T extends DataType>(dataType: T): DataMap[T] {
  return mockData[dataType]
}
