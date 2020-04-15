/* istanbul ignore file */
import React from 'react'

import { noop } from 'lodash'

import {
  filters as tableLegendFilters,
  list as tableLegendList,
} from '@/components/TableLegend/mockData'
import { DataMap, DataType } from '@/dashboard'
import { Filters, TableColumn } from '@/utils/table'

const roadmapFilters = [
  {
    id: 'yamburghNGKM',
    name: 'Ямбургское НГКМ',
    filterer: (value: string) => value === '1. Ямбургское НГКМ',
    field: 'firstColumn',
  },
  {
    id: 'mountingPlaceNumber2',
    name: 'Место установки 2',
    filterer: (value: string) => value === '2. Место установки 2',
    field: 'firstColumn',
  },
  {
    id: 'mountingPlaceNumber3',
    name: 'Место установки 3',
    filterer: (value: string) => value === '3. Место установки 3',
    field: 'firstColumn',
  },
  {
    id: 'mountingPlaceMounting',
    name: 'Место установки установок',
    filterer: (value: string) => value === '4. Место установки установок',
    field: 'firstColumn',
  },
  {
    id: 'oceanDrillingStation',
    name: 'Станция бурения в океане',
    filterer: (value: string) => value === '5. Станция бурения в океане',
    field: 'firstColumn',
  },
  {
    id: 'mupn1500',
    name: 'МУПН 1500',
    filterer: (value: string) => value === 'МУПН 1500',
    field: 'secondColumn',
  },
  {
    id: 'zhq-342-23',
    name: 'ZHQ-342-23',
    filterer: (value: string) => value === 'ZHQ-342-23',
    field: 'secondColumn',
  },
  {
    id: 'mupn1300',
    name: 'МУПН 1300',
    filterer: (value: string) => value === 'МУПН 1300',
    field: 'secondColumn',
  },
  {
    id: 'mupn1600',
    name: 'МУПН 1600',
    filterer: (value: string) => value === 'МУПН 1600',
    field: 'secondColumn',
  },
  {
    id: 'mupn1700',
    name: 'МУПН 1700',
    filterer: (value: string) => value === 'МУПН 1700',
    field: 'secondColumn',
  },
] as Filters

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
          comment:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
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
          comment: 'Какой-то комментарий для синего факта',
        },
      ],
      forecast: [
        {
          startDate: Date.UTC(2019, 6, 10),
          endDate: Date.UTC(2019, 9, 15),
          groupName: 'blue',
          comment: 'Какой-то комментарий для синего прогноза',
        },
        {
          startDate: Date.UTC(2019, 9, 15),
          endDate: Date.UTC(2019, 11, 31),
          groupName: 'orange',
          comment: 'Какой-то комментарий для оранжевого прогноза',
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
  titles: [
    {
      title: 'МЕСТА УСТАНОВКИ',
      accessor: 'firstColumn',
    },
    {
      title: 'КОМПЛЕКС',
      accessor: 'secondColumn',
    },
  ] as readonly [TableColumn, TableColumn],
  filters: roadmapFilters,
  currentDay: Date.UTC(2019, 6, 10),
}

const mockData: DataMap = {
  [DataType.Stats]: {
    value: 217,
    title: 'Сроки',
    badge: {
      percentage: 2.3,
      status: 'normal',
    },
    unit: 'суток',
  },
  [DataType.Donut]: {
    colorGroups: {
      first: 'var(--color-bg-alert)',
      second: 'var(--color-bg-caution)',
      third: 'var(--color-bg-normal)',
    },
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
      first: 'var(--color-bg-normal)',
      second: 'var(--color-bg-alert)',
      third: 'var(--color-bg-warning)',
    },
    groups: [
      {
        groupName: 'март',
        values: [
          { colorGroupName: 'first', value: 410 },
          { colorGroupName: 'second', value: 600 },
          { colorGroupName: 'third', value: 270 },
        ],
      },
      {
        groupName: 'апрель',
        values: [
          { colorGroupName: 'first', value: 670 },
          { colorGroupName: 'second', value: 1000 },
          { colorGroupName: 'third', value: 1100 },
        ],
      },
      {
        groupName: 'май',
        values: [
          { colorGroupName: 'first', value: 1200 },
          { colorGroupName: 'second', value: 630 },
          { colorGroupName: 'third', value: 100 },
        ],
      },
    ],
    unit: 'тыс м3',
  },
  [DataType.LinearChart]: {
    colorGroups: {
      first: 'var(--color-bg-success)',
      second: 'var(--color-bg-normal)',
    },
    data: [
      {
        colorGroupName: 'first',
        values: [
          { x: 0, y: -1 },
          { x: 1, y: 3 },
          { x: 2, y: 1 },
          { x: 3, y: 4 },
        ],
        dots: true,
        lineName: 'Северный бур',
        withGradient: true,
      },
      {
        colorGroupName: 'second',
        values: [
          { x: 0, y: -2 },
          { x: 1, y: 4 },
          { x: 2, y: 0 },
          { x: 3, y: 5 },
        ],
        lineName: 'Южное месторождение',
      },
    ],
    threshold: {
      max: {
        values: [
          { x: 0, y: 4 },
          { x: 1, y: 4 },
          { x: 2, y: 4 },
          { x: 3, y: 4 },
        ],
      },
      min: {
        values: [
          { x: 0, y: 0 },
          { x: 1, y: 0 },
          { x: 2, y: 0 },
          { x: 3, y: 0 },
        ],
      },
    },
    unit: 'тыс м3',
  },
  [DataType.Pyramid]: [
    {
      value: null,
      text: '1. Смертельные на производстве ',
    },
    {
      value: 23,
      text: '2. Уровень 1+Травмы с ВПТ',
    },
    {
      value: null,
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
      first: 'var(--color-bg-alert)',
      second: 'var(--color-bg-caution)',
      third: 'var(--color-bg-success)',
      fourth: 'var(--color-bg-warning)',
      fifth: 'var(--color-bg-critical)',
    },
    list: tableLegendList,
    legendFields: [
      {
        field: 'Приобское',
        colorGroupName: 'first',
        typeLegend: 'dot',
      },
      {
        field: 'Уренгойское газонефтеконденсат­ное',
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
    columns: [
      {
        title: 'Месторождение',
        accessor: 'field',
        align: 'left',
      },
      {
        title: 'Год открытия',
        accessor: 'year',
        align: 'center',
      },
      {
        title: 'Тип',
        accessor: 'type',
        align: 'center',
      },
      {
        title: 'Предполагаемые полные \nзапасы, млн.т.',
        accessor: 'estimatedReserves',
        align: 'right',
      },
      {
        title: 'Остаточные извлекаемые \nзапасы, млн.т.',
        accessor: 'remainingReserves',
        align: 'right',
      },
      {
        title: 'Добыча тыс.т/сут.',
        accessor: 'production',
        align: 'right',
      },
      {
        title: 'Всего добыто, млн.т.',
        accessor: 'total',
        align: 'right',
      },
    ],
    filters: tableLegendFilters,
  },
  [DataType.Badge]: {
    status: 'normal',
    text: 'Работа по расписанию',
    comment: 'Хотели как лучше, а получилось как всегда.',
  },
  [DataType.MultiBarChart]: {
    colorGroups: {
      apples: 'var(--color-bg-normal)',
      bananas: 'var(--color-bg-alert)',
      cherries: 'var(--color-bg-warning)',
    },
    groups: [
      { groupName: 'Q1-2016', values: [{ apples: 30, bananas: 20, cherries: 23 }] },
      { groupName: 'Q2-2016', values: [{ apples: 1600, bananas: 40, cherries: 45 }] },
      { groupName: 'Q3-2016', values: [{ apples: 640, bananas: 960, cherries: 73 }] },
    ],
    unit: 'тыс м3',
  },
  [DataType.Legend]: {
    colorGroups: {
      first: 'var(--color-bg-normal)',
      second: 'var(--color-bg-alert)',
      third: 'var(--color-bg-warning)',
      fourth: 'var(--color-bg-success)',
      fifth: 'var(--color-bg-caution)',
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
      first: 'var(--color-bg-warning)',
      second: 'var(--color-bg-success)',
      third: 'var(--color-bg-normal)',
    },
    data: [
      {
        value: 70,
        valueMin: 0,
        valueMax: 120,
        summary: 70,
        colorGroupName: 'first',
        caption: 'Стратегия Ступени + УИД',
        tooltip: <p>Контент тултипа</p>,
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
    type: 'date',
    value: new Date(),
    minDate: new Date(2019, 0),
    maxDate: new Date(),
    onChange: () => null,
  },
  [DataType.RadarChart]: {
    colorGroups: {
      first: 'var(--color-bg-success)',
      second: 'var(--color-bg-normal)',
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
        name: 'Комплексов',
        value: '5',
      },
      colorGroups: {
        green: 'var(--color-bg-success)',
        violet: '#A13DFF',
        blue: 'var(--color-bg-normal)',
        orange: 'var(--color-bg-warning)',
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
  [DataType.Image]: 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg',
  [DataType.Images]: [
    { large: 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg' },
    { preview: 'https://via.placeholder.com/150', large: 'https://via.placeholder.com/1500' },
    { large: 'https://via.placeholder.com/400x200' },
    { large: 'https://via.placeholder.com/200x400' },
  ],
  [DataType.Button]: {
    content: 'Кнопка',
    disabled: false,
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
    onChange: () => null,
    isMultiple: false,
    value: 'month',
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
    padding: [0, 0],
    selectedObjectId: undefined,
    renderConnectionPoint: () => null,
    renderObjectPoint: () => null,
    renderPoint: () => null,
    onSelectedObjectIdChange: noop,
  },
  [DataType.Switch]: 1,
}

export function getWidgetMockData<T extends DataType>(dataType: T): DataMap[T] {
  return mockData[dataType]
}
