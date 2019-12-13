import React from 'react'

import { DataMap, DataType } from '@/dashboard/types'

const roadmapData = {
  startDate: Date.UTC(2019, 0, 1),
  endDate: Date.UTC(2020, 11, 31),
  values: [
    {
      firstColumn: '1. Ямбургское НГКМ',
      secondColumn: 'МУПН 1500',
      plan: [
        {
          startDate: Date.UTC(2019, 0, 1),
          endDate: Date.UTC(2019, 2, 5),
          groupName: 'green',
        },
        {
          startDate: Date.UTC(2019, 2, 5),
          endDate: Date.UTC(2019, 4, 12),
          groupName: 'violet',
        },
        {
          startDate: Date.UTC(2019, 4, 12),
          endDate: Date.UTC(2019, 9, 15),
          groupName: 'blue',
        },
        {
          startDate: Date.UTC(2019, 9, 15),
          endDate: Date.UTC(2019, 11, 31),
          groupName: 'orange',
        },
      ],
      fact: [
        {
          startDate: Date.UTC(2019, 0, 19),
          endDate: Date.UTC(2019, 2, 27),
          groupName: 'green',
          comment: 'Какой-то комментарий',
        },
        {
          startDate: Date.UTC(2019, 2, 27),
          endDate: Date.UTC(2019, 4, 12),
          groupName: 'violet',
          comment: 'Какой-то комментарий',
        },
        {
          startDate: Date.UTC(2019, 4, 12),
          endDate: Date.UTC(2019, 6, 10),
          groupName: 'blue',
        },
      ],
      forecast: [
        {
          startDate: Date.UTC(2019, 6, 10),
          endDate: Date.UTC(2019, 9, 15),
          groupName: 'blue',
        },
        {
          startDate: Date.UTC(2019, 9, 15),
          endDate: Date.UTC(2019, 11, 31),
          groupName: 'orange',
        },
      ],
    },
    {
      firstColumn: '2. Место установки 2',
      secondColumn: 'ZHQ-342-23',
      plan: [
        {
          startDate: Date.UTC(2019, 0, 1),
          endDate: Date.UTC(2019, 2, 5),
          groupName: 'green',
        },
        {
          startDate: Date.UTC(2019, 2, 5),
          endDate: Date.UTC(2019, 4, 12),
          groupName: 'violet',
        },
        {
          startDate: Date.UTC(2019, 4, 12),
          endDate: Date.UTC(2019, 8, 18),
          groupName: 'blue',
        },
        {
          startDate: Date.UTC(2019, 8, 18),
          endDate: Date.UTC(2019, 11, 31),
          groupName: 'orange',
        },
      ],
      fact: [
        {
          startDate: Date.UTC(2019, 0, 1),
          endDate: Date.UTC(2019, 1, 20),
          groupName: 'green',
        },
        {
          startDate: Date.UTC(2019, 1, 20),
          endDate: Date.UTC(2019, 3, 25),
          groupName: 'violet',
          comment:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        },
        {
          startDate: Date.UTC(2019, 3, 25),
          endDate: Date.UTC(2019, 6, 10),
          groupName: 'blue',
          comment:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        },
      ],
      forecast: [
        {
          startDate: Date.UTC(2019, 6, 10),
          endDate: Date.UTC(2019, 8, 18),
          groupName: 'blue',
        },
        {
          startDate: Date.UTC(2019, 8, 18),
          endDate: Date.UTC(2019, 11, 31),
          groupName: 'orange',
        },
      ],
    },
    {
      firstColumn: '3. Место установки 3',
      secondColumn: 'МУПН 1300',
      plan: [
        {
          startDate: Date.UTC(2019, 0, 19),
          endDate: Date.UTC(2019, 1, 15),
          groupName: 'green',
        },
        {
          startDate: Date.UTC(2019, 1, 15),
          endDate: Date.UTC(2019, 4, 12),
          groupName: 'violet',
        },
        {
          startDate: Date.UTC(2019, 4, 12),
          endDate: Date.UTC(2019, 7, 1),
          groupName: 'blue',
        },
        {
          startDate: Date.UTC(2019, 7, 1),
          endDate: Date.UTC(2019, 11, 31),
          groupName: 'orange',
        },
      ],
      fact: [
        {
          startDate: Date.UTC(2019, 1, 10),
          endDate: Date.UTC(2019, 3, 27),
          groupName: 'green',
          comment: 'Какой-то комментарий',
        },
        {
          startDate: Date.UTC(2019, 3, 27),
          endDate: Date.UTC(2019, 4, 12),
          groupName: 'violet',
          comment: 'Какой-то комментарий',
        },
        {
          startDate: Date.UTC(2019, 4, 12),
          endDate: Date.UTC(2019, 6, 10),
          groupName: 'blue',
          comment: 'Какой-то комментарий',
        },
      ],
      forecast: [
        {
          startDate: Date.UTC(2019, 6, 10),
          endDate: Date.UTC(2019, 7, 1),
          groupName: 'blue',
        },
        {
          startDate: Date.UTC(2019, 7, 1),
          endDate: Date.UTC(2019, 11, 31),
          groupName: 'orange',
        },
      ],
    },
    {
      firstColumn: '4. Место установки установок',
      secondColumn: 'МУПН 1600',
      plan: [
        {
          startDate: Date.UTC(2019, 0, 1),
          endDate: Date.UTC(2019, 2, 7),
          groupName: 'green',
        },
        {
          startDate: Date.UTC(2019, 2, 7),
          endDate: Date.UTC(2019, 4, 12),
          groupName: 'violet',
        },
        {
          startDate: Date.UTC(2019, 4, 12),
          endDate: Date.UTC(2019, 9, 15),
          groupName: 'blue',
        },
        {
          startDate: Date.UTC(2019, 9, 15),
          endDate: Date.UTC(2019, 11, 31),
          groupName: 'orange',
        },
      ],
      fact: [
        {
          startDate: Date.UTC(2019, 0, 29),
          endDate: Date.UTC(2019, 2, 29),
          groupName: 'green',
        },
        {
          startDate: Date.UTC(2019, 2, 29),
          endDate: Date.UTC(2019, 4, 12),
          groupName: 'violet',
          comment:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        },
        {
          startDate: Date.UTC(2019, 4, 12),
          endDate: Date.UTC(2019, 6, 10),
          groupName: 'blue',
          comment:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        },
      ],
      forecast: [
        {
          startDate: Date.UTC(2019, 6, 10),
          endDate: Date.UTC(2019, 9, 15),
          groupName: 'blue',
        },
        {
          startDate: Date.UTC(2019, 9, 15),
          endDate: Date.UTC(2019, 11, 31),
          groupName: 'orange',
        },
      ],
    },
    {
      firstColumn: '5. Станция бурения в океане',
      secondColumn: 'МУПН 1700',
      plan: [
        {
          startDate: Date.UTC(2019, 0, 28),
          endDate: Date.UTC(2019, 2, 10),
          groupName: 'green',
        },
        {
          startDate: Date.UTC(2019, 2, 10),
          endDate: Date.UTC(2019, 4, 12),
          groupName: 'violet',
        },
        {
          startDate: Date.UTC(2019, 4, 12),
          endDate: Date.UTC(2019, 7, 31),
          groupName: 'blue',
        },
        {
          startDate: Date.UTC(2019, 7, 31),
          endDate: Date.UTC(2020, 11, 31),
          groupName: 'orange',
        },
      ],
      fact: [
        {
          startDate: Date.UTC(2019, 0, 4),
          endDate: Date.UTC(2019, 1, 25),
          groupName: 'green',
          comment:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        },
        {
          startDate: Date.UTC(2019, 1, 25),
          endDate: Date.UTC(2019, 3, 27),
          groupName: 'violet',
        },
        {
          startDate: Date.UTC(2019, 3, 27),
          endDate: Date.UTC(2019, 6, 10),
          groupName: 'blue',
          comment:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        },
      ],
      forecast: [
        {
          startDate: Date.UTC(2019, 6, 10),
          endDate: Date.UTC(2019, 7, 31),
          groupName: 'blue',
        },
        {
          startDate: Date.UTC(2019, 7, 31),
          endDate: Date.UTC(2020, 11, 15),
          groupName: 'orange',
        },
      ],
    },
  ],
  titles: ['МЕСТА УСТАНОВКИ', 'КОМПЛЕКС'],
  currentDay: Date.UTC(2019, 6, 10),
} as const

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
    bottomUnit: 'суток',
    rightUnit: '',
  },
  [DataType.Donut]: {
    colorGroups: {
      first: '#EB5757',
      second: '#F2C94C',
      third: '#56B9F2',
    },
    unit: 'тыс м3',
    data: [
      {
        name: 'Северный бур',
        colorGroupName: 'first',
        sections: [{ value: 1 }, { value: 2 }, { value: 3 }],
      },
      {
        name: 'Южный бур',
        colorGroupName: 'second',
        sections: [{ value: 4 }, { value: 5 }, { value: 6 }],
      },
      {
        name: 'Западный бур',
        colorGroupName: 'third',
        sections: [{ value: 7 }, { value: 8 }, { value: 9 }],
      },
    ],
  },
  [DataType.BarChart]: {
    colorGroups: {
      first: '#56B9F2',
      second: '#EB5757',
      third: '#FCA355',
    },
    data: [
      {
        label: 'март',
        values: [
          { value: 410, colorGroupName: 'first' },
          { value: 600, colorGroupName: 'second' },
          { value: 270, colorGroupName: 'third' },
        ],
      },
      {
        label: 'апрель',
        values: [
          { value: 670, colorGroupName: 'first' },
          { value: 1000, colorGroupName: 'second' },
          { value: 1100, colorGroupName: 'third' },
        ],
      },
      {
        label: 'май',
        values: [
          { value: 1200, colorGroupName: 'first' },
          { value: 630, colorGroupName: 'second' },
          { value: 100, colorGroupName: 'third' },
        ],
      },
    ],
  },
  [DataType.LinearChart]: {
    colorGroups: {
      first: '#20B55F',
      second: '#56B9F2',
    },
    data: [
      {
        colorGroupName: 'first',
        values: [{ x: 0, y: -1 }, { x: 1, y: 3 }, { x: 2, y: 1 }, { x: 3, y: 4 }],
        dots: true,
        lineName: 'Северный бур',
      },
      {
        colorGroupName: 'second',
        values: [{ x: 0, y: -2 }, { x: 1, y: 4 }, { x: 2, y: 0 }, { x: 3, y: 5 }],
        lineName: 'Южное месторождение',
      },
    ],
  },
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
  [DataType.Text]: {
    text: 'Какой-то текст',
    tooltip: <p>Контент тултипа</p>,
  },
  [DataType.TableLegend]: {
    colorGroups: {
      first: 'red',
      second: 'yellow',
      third: 'green',
      fourth: 'yellowgreen',
      fifth: 'white',
    },
    list: [
      {
        field: 'Приобское',
        year: 1982,
        type: 'Нефтяное',
        estimatedReserves: 5000,
        remainingReserves: 1700,
        production: 33,
        total: 313,
      },
      {
        field: 'Уренгойское газонефтеконденсатное',
        year: 2001,
        type: 'Конденсатное',
        estimatedReserves: 7540,
        remainingReserves: 7540,
        production: 363,
        total: 88,
      },
      {
        field: 'Красноленинская группа',
        year: 1985,
        type: 'Комбинированное',
        estimatedReserves: 8766,
        remainingReserves: 3374,
        production: 256,
        total: 434,
      },
      {
        field: 'Великое',
        year: 1989,
        type: 'Конденсатное',
        estimatedReserves: 1697,
        remainingReserves: 4818,
        production: 250,
        total: 236,
      },
      {
        field: 'Русское газонефтяное',
        year: 1997,
        type: 'Нефтяное',
        estimatedReserves: 5169,
        remainingReserves: 3712,
        production: 292,
        total: 417,
      },
    ],
    legendFields: [
      {
        field: 'Приобское',
        colorGroupName: 'first',
        typeLegend: 'dot',
      },
      {
        field: 'Уренгойское газонефтеконденсатное',
        colorGroupName: 'second',
        typeLegend: 'dot',
      },
      {
        field: 'Красноленинская группа',
        colorGroupName: 'third',
        typeLegend: 'dot',
      },
      {
        field: 'Великое',
        colorGroupName: 'fourth',
        typeLegend: 'dot',
      },
      {
        field: 'Русское газонефтяное',
        colorGroupName: 'fifth',
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
        accessor: 'estimatedReserves',
        className: 'textRightPosition',
      },
      {
        title: 'Остаточные извлекаемые \nзапасы, млн.т.',
        accessor: 'remainingReserves',
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
    comment: 'Хотели как лучше, а получилось как всегда.',
  },
  [DataType.MultiBarChart]: {
    colorGroups: {
      apples: '#56B9F2',
      bananas: '#EB5757',
      cherries: '#FCA355',
      year: 'aquamarine',
    },
    data: {
      categories: ['apples', 'bananas', 'cherries', 'year'],
      values: [
        { month: 'Q1-2016', apples: 3840, bananas: 1920, cherries: -23, year: 400 },
        { month: 'Q2-2016', apples: 1600, bananas: 1440, cherries: 45, year: 400 },
        { month: 'Q3-2016', apples: 640, bananas: 960, cherries: 73, year: 600 },
        { month: 'Q4-2016', apples: 320, bananas: 480, cherries: 85, year: 400 },
      ],
      keyGroup: 'month',
    },
  },
  [DataType.Legend]: {
    colorGroups: {
      first: 'red',
      second: 'yellow',
      third: 'aquamarine',
      fourth: 'purple',
      fifth: 'green',
    },
    data: [
      {
        colorGroupName: 'first',
        text: 'Красноватый текст',
      },
      {
        colorGroupName: 'second',
        text: 'Желтоватый текст',
      },
      {
        colorGroupName: 'third',
        text: 'Убер длинный и превозмогающий усилия аквамариновый текст',
      },
      {
        colorGroupName: 'fourth',
        text: 'Пурпурный текст',
      },
      {
        colorGroupName: 'fifth',
        text: 'Зеленый цвет',
      },
    ],
  },
  [DataType.ProgressBar]: {
    colorGroups: {
      first: '#FFBA3B',
      second: '#39BA21',
      third: '#00CFDE',
    },
    data: [
      {
        value: 70,
        valueMin: 0,
        valueMax: 120,
        summary: 70,
        colorGroupName: 'first',
        caption: 'Стратегия Ступени + УИД',
      },
      {
        value: 7000,
        valueMin: 0,
        valueMax: 15000,
        ticks: [
          {
            label: '0',
            value: 0,
          },
          {
            label: 'Цель',
            value: 5500,
          },
          {
            label: 'Амцель',
            value: 12000,
          },
        ],
        summary: 7000,
        colorGroupName: 'second',
      },
      {
        value: 3000,
        valueMin: 0,
        valueMax: 12000,
        ticks: [
          {
            label: '0',
            value: 0,
          },
          {
            label: '',
            value: 5500,
          },
          {
            label: '12000',
            value: 12000,
          },
        ],
        summary: '3 тысячи',
        colorGroupName: 'third',
        caption: 'Стратегия Ступени + УИД',
      },
    ],
  },
  [DataType.DatePicker]: {
    value: new Date(),
    onChange: () => null,
  },
  [DataType.RangePicker]: {
    value: [new Date(), new Date()],
    onChange: () => null,
  },
  [DataType.RadarChart]: {
    colorGroups: {
      first: '#20B55F',
      second: '#56B9F2',
    },
    axesLabels: {
      job: 'Охрана труда',
      industrial: 'Промышленная безопасность',
      fire: 'Пожарная безопасность',
      electricity: 'Электробезопасность',
      health: 'Охрана здоровья',
      emergencies: 'ГО и ЧС',
      ecology: 'Экологическая безопасность',
      transport: 'Транспортная безопасность',
      occupational: 'Безопасность на производстве',
    },
    maxValue: 800,
    figures: [
      {
        colorGroupName: 'first',
        name: 'Северный бур',
        values: [
          { axisName: 'job', value: 550 },
          { axisName: 'industrial', value: 700 },
          { axisName: 'fire', value: 180 },
          { axisName: 'electricity', value: 800 },
          { axisName: 'health', value: 450 },
          { axisName: 'emergencies', value: 675 },
          { axisName: 'ecology', value: 740 },
          { axisName: 'transport', value: 450 },
          { axisName: 'occupational', value: 250 },
        ],
      },
      {
        colorGroupName: 'second',
        name: 'Южное месторождение',
        values: [
          { axisName: 'job', value: 160 },
          { axisName: 'industrial', value: 450 },
          { axisName: 'fire', value: 390 },
          { axisName: 'electricity', value: 460 },
          { axisName: 'health', value: 620 },
          { axisName: 'emergencies', value: 500 },
          { axisName: 'ecology', value: 600 },
          { axisName: 'transport', value: 700 },
          { axisName: 'occupational', value: 410 },
        ],
      },
    ],
  },
  [DataType.Roadmap]: [
    {
      title: 'ДО 1',
      subTitle: {
        name: 'объектов',
        value: '5',
      },
      colorGroups: {
        green: '#219653',
        violet: '#AB63EE',
        blue: '#56B9F2',
        orange: '#FFA10A',
      },
      data: roadmapData,
      legend: [
        {
          text: 'Зеленый',
          colorGroupName: 'green',
        },
        {
          text: 'Фиолетовый',
          colorGroupName: 'violet',
        },
        {
          text: 'Синий',
          colorGroupName: 'blue',
        },
        {
          text: 'Оранжевый',
          colorGroupName: 'orange',
        },
      ],
    },
  ],
  [DataType.Images]: [
    { large: 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg' },
    { preview: 'https://via.placeholder.com/150', large: 'https://via.placeholder.com/1500' },
    { large: 'https://via.placeholder.com/400x200' },
    { large: 'https://via.placeholder.com/200x400' },
  ],
  [DataType.Button]: {
    content: 'Кнопка',
    onClick: () => alert('Клик!'),
  },
  [DataType.ChoiceGroup]: {
    items: [
      {
        label: 'Месяц',
        value: 'month',
      },
      {
        label: 'Сутки',
        value: 'day',
      },
    ],
    disabled: false,
  },
  [DataType.Checkbox]: {
    content: undefined,
    value: false,
    disabled: false,
    intermediate: false,
  },
  [DataType.Map]: {
    connectionPoints: [],
    locations: [],
    points: [],
    selectedObjectId: undefined,
    renderConnectionPoint: () => null,
    renderObjectPoint: () => null,
    renderPoint: () => null,
    onSelectedObjectIdChange: () => {},
  },
}

export function getWidgetMockData<T extends DataType>(dataType: T): DataMap[T] {
  return mockData[dataType]
}
