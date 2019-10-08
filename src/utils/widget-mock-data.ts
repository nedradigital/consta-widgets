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
  [DataType.BarChart]: [
    {
      categorie: 'март',
      values: [
        {
          value: 410,
          description: 'blue',
        },
        {
          value: 600,
          description: 'red',
        },
        {
          value: 270,
          description: 'orange',
        },
      ],
    },
    {
      categorie: 'апрель',
      values: [
        {
          value: 670,
          description: 'blue',
        },
        {
          value: 1000,
          description: 'red',
        },
        {
          value: 1100,
          description: 'orange',
        },
      ],
    },
    {
      categorie: 'май',
      values: [
        {
          value: 1200,
          description: 'blue',
        },
        {
          value: 630,
          description: 'red',
        },
        {
          value: 100,
          description: 'orange',
        },
      ],
    },
  ],
}

export function getWidgetMockData<T extends DataType>(dataType: T): DataMap[T] {
  return mockData[dataType]
}
