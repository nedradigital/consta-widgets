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
  [DataType.Stats]: {
    number: '+217',
    percent: '+2.3%',
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
  [DataType.BarChart]: {
    colors: ['#56B9F2', '#EB5757', '#FCA355'],
    data: [
      {
        groupName: 'март',
        values: [410, 600, 270],
      },
      {
        groupName: 'апрель',
        values: [670, 1000, 1100],
      },
      {
        groupName: 'май',
        values: [1200, 630, 100],
      },
    ],
  },
  [DataType.LinearChart]: [
    {
      color: '#20B55F',
      values: [{ x: 0, y: -1 }, { x: 1, y: 3 }, { x: 2, y: 1 }, { x: 3, y: 4 }],
      dots: true,
    },
    {
      color: '#56B9F2',
      values: [{ x: 0, y: -2 }, { x: 1, y: 4 }, { x: 2, y: 0 }, { x: 3, y: 5 }],
    },
  ],
  [DataType.Pyramid]: [
    {
      value: 3,
      text: '1. Смертельные на производстве ',
    },
    {
      value: 23,
      text: '2. Уровень 1+Травмы с ВПТ',
    },
    {
      value: 67,
      text: '3. Уровень 2+Мед. помощь',
    },
    {
      value: 459,
      text: '4. Первая помощь',
    },
    {
      value: 2950,
      text: '5. Происшествия без последствий',
    },
    {
      value: 12374,
      text: '6. ОД и ОУ ',
    },
  ],
  [DataType.Text]: 'Какой-то текст',
  [DataType.TableLegend]: {
    list: [
      {
        field: 'Приобское',
        year: 1982,
        type: 'Нефтяное',
        estimated_reserves: 5000,
        remaining_reserves: 1700,
        production: 33,
        total: 313,
      },
      {
        field: 'Уренгойское газонефтеконденсатное',
        year: 2001,
        type: 'Конденсатное',
        estimated_reserves: 7540,
        remaining_reserves: 7540,
        production: 363,
        total: 88,
      },
      {
        field: 'Красноленинская группа',
        year: 1985,
        type: 'Комбинированное',
        estimated_reserves: 8766,
        remaining_reserves: 3374,
        production: 256,
        total: 434,
      },
      {
        field: 'Великое',
        year: 1989,
        type: 'Конденсатное',
        estimated_reserves: 1697,
        remaining_reserves: 4818,
        production: 250,
        total: 236,
      },
      {
        field: 'Русское газонефтяное',
        year: 1997,
        type: 'Нефтяное',
        estimated_reserves: 5169,
        remaining_reserves: 3712,
        production: 292,
        total: 417,
      },
    ],
    legendFields: [
      {
        field: 'Приобское',
        color: 'red',
        typeLegend: 'dot',
      },
      {
        field: 'Уренгойское газонефтеконденстаное',
        color: 'yellow',
        typeLegend: 'dot',
      },
      {
        field: 'Красноленинская группа',
        color: 'green',
        typeLegend: 'dot',
      },
      {
        field: 'Великое',
        color: 'yellowgreen',
        typeLegend: 'dot',
      },
      {
        field: 'Русское газонефтяное',
        color: 'white',
        typeLegend: 'dot',
      },
    ],
    columnNames: [
      {
        title: 'Месторождение',
        accessor: 'field',
        className: 'textLeftPosition',
      },
      {
        title: 'Год октрытия',
        accessor: 'year',
        className: 'textCenterPosition',
      },
      {
        title: 'Тип',
        accessor: 'type',
        className: 'textCenterPosition',
      },
      {
        title: 'Предполагаемые полные \nзапасы, млн.т.',
        accessor: 'estimated_reserves',
        className: 'textRightPosition',
      },
      {
        title: 'Остаточные извлекаемые \nзапасы, млн.т.',
        accessor: 'remaining_reserves',
        className: 'textRightPosition',
      },
      {
        title: 'Добыча тыс.т/сут.',
        accessor: 'production',
        className: 'textRightPosition',
      },
      {
        title: 'Всего добыто, млн.т.',
        accessor: 'total',
        className: 'textRightPosition',
      },
    ],
  },
  [DataType.TrafficLight]: {
    status: 'normal',
    text: 'Работа по расписанию',
  },
  [DataType.MultiBarChart]: {
    categories: ['apples', 'bananas', 'cherries', 'dates'],
    values: [
      { month: 'Q1-2016', apples: 3840, bananas: 1920, cherries: -23, dates: 400 },
      { month: 'Q2-2016', apples: 1600, bananas: 1440, cherries: 45, dates: 400 },
      { month: 'Q3-2016', apples: 640, bananas: 960, cherries: 73, dates: 600 },
      { month: 'Q4-2016', apples: 320, bananas: 480, cherries: 85, dates: 400 },
    ],
    keyGroup: 'month',
  },
}

export function getWidgetMockData<T extends DataType>(dataType: T): DataMap[T] {
  return mockData[dataType]
}
