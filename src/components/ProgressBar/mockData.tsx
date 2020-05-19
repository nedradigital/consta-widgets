import { ColorGroups } from '@/types'

const colorGroups: ColorGroups = {
  first: 'var(--color-bg-warning)',
  second: 'var(--color-bg-success)',
  third: 'var(--color-bg-normal)',
}

export const progressBarData = {
  colorGroups,
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
}

export const progressBarDataWithNullValue = {
  colorGroups: {
    first: 'var(--color-bg-warning)',
    second: 'var(--color-bg-success)',
  },
  data: [
    {
      value: null,
      valueMin: 0,
      valueMax: 120,
      summary: 70,
      colorGroupName: 'first',
      caption: 'Стратегия Ступени + УИД',
      tooltip: <p>Контент тултипа</p>,
    },
    {
      value: null,
      valueMin: 0,
      valueMax: 100,
      summary: 10,
      colorGroupName: 'second',
      ticks: [
        {
          label: '0',
          value: 0,
        },
        {
          label: '',
          value: 10,
        },
        {
          label: '',
          value: 20,
        },
        {
          label: '',
          value: 30,
        },
        {
          label: '',
          value: 40,
        },
        {
          label: '50',
          value: 50,
        },
        {
          label: '',
          value: 60,
        },
        {
          label: '',
          value: 70,
        },
        {
          label: '',
          value: 80,
        },
        {
          label: '',
          value: 90,
        },
        {
          label: '100',
          value: 100,
        },
      ],
    },
  ],
}
