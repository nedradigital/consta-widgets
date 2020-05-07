/* istanbul ignore file */
import React from 'react'

import { noop } from 'lodash'

import { data as roadmapData } from '@/components/Roadmap/mockData'
import {
  filters as tableLegendFilters,
  list as tableLegendList,
} from '@/components/TableLegend/mockData'
import { DataMap, DataType } from '@/dashboard'

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
      red: 'var(--color-bg-alert)',
      blue: 'var(--color-bg-normal)',
      yellow: 'var(--color-bg-warning)',
      purple: '#9b51e0',
      green: 'var(--color-bg-success)',
    },
    list: tableLegendList,
    legendFields: [
      {
        field: 'Приобское',
        colorGroupName: 'red',
        typeLegend: 'dot',
      },
      {
        field: 'Уренгойское газонефтеконденсат­ное',
        colorGroupName: 'blue',
        typeLegend: 'dot',
      },
      {
        field: 'Красноленинская группа',
        colorGroupName: 'yellow',
        typeLegend: 'dot',
      },
      {
        field: 'Великое',
        colorGroupName: 'purple',
        typeLegend: 'dot',
      },
      {
        field: 'Русское газонефтяное',
        colorGroupName: 'green',
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
      red: 'var(--color-bg-alert)',
      yellow: 'var(--color-bg-warning)',
      blue: 'var(--color-bg-normal)',
      purple: '#9b51e0',
      green: 'var(--color-bg-success)',
    },
    data: [
      {
        colorGroupName: 'red',
        text: 'Красноватый текст',
      },
      {
        colorGroupName: 'yellow',
        text: 'Желтоватый текст',
      },
      {
        colorGroupName: 'blue',
        text: 'Убер длинный и превозмогающий усилия аквамариновый текст',
      },
      {
        colorGroupName: 'purple',
        text: 'Пурпурный текст',
      },
      {
        colorGroupName: 'green',
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
  [DataType.TornadoChart]: {
    groups: [
      {
        groupName: 'АО Мессояханефтегаз',
        values: [{ first: 10 }, { second: 6 }],
      },
      {
        groupName: 'ООО ГПН-Оренбург',
        values: [{ first: 6 }, { second: 3 }],
      },
      {
        groupName: 'ООО ГПН-Заполярьег',
        values: [{ first: 4 }, { second: 3 }],
      },
      {
        groupName: 'ООО ГПН-Ямал',
        values: [{ first: 1 }, { second: 2 }],
      },
      {
        groupName: 'ООО ГПН-Восток',
        values: [{ first: 7 }, { second: 13 }],
      },
      {
        groupName: 'ООО Газпром-инвест',
        values: [{ first: 4 }, { second: 12 }],
      },
    ],
    colorGroups: {
      first: 'var(--color-bg-normal)',
      second: 'var(--color-bg-alert)',
    },
    unit: 'млн. руб.',
  },
}

export function getWidgetMockData<T extends DataType>(dataType: T): DataMap[T] {
  return mockData[dataType]
}
