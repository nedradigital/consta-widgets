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
    bottomUnit: 'суток',
    rightUnit: '',
  },
  [DataType.Donut]: {
    colorGroups: {
      first: '#EB5757',
      second: '#F2C94C',
      third: '#56B9F2',
    },
    data: [
      [
        {
          colorGroupName: 'first',
          value: 20,
        },
        {
          colorGroupName: 'second',
          value: 15,
        },
        {
          colorGroupName: 'third',
          value: 7,
        },
      ],
      [
        {
          colorGroupName: 'first',
          value: 20,
        },
        {
          colorGroupName: 'second',
          value: 15,
        },
        {
          colorGroupName: 'third',
          value: 7,
        },
      ],
      [
        {
          colorGroupName: 'first',
          value: 25,
        },
        {
          colorGroupName: 'second',
          value: 1,
        },
        {
          colorGroupName: 'third',
          value: 5,
        },
      ],
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
      },
      {
        colorGroupName: 'second',
        values: [{ x: 0, y: -2 }, { x: 1, y: 4 }, { x: 2, y: 0 }, { x: 3, y: 5 }],
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
        field: 'Уренгойское газонефтеконденстаное',
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
      first: '#fff',
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
}

export function getWidgetMockData<T extends DataType>(dataType: T): DataMap[T] {
  return mockData[dataType]
}
