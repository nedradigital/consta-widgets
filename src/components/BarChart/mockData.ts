import { ColorGroups } from '@/types'

const barChartColorGroups: ColorGroups = {
  first: 'var(--color-bg-normal)',
  second: 'var(--color-bg-alert)',
  third: 'var(--color-bg-warning)',
}

export const barChartData = {
  colorGroups: barChartColorGroups,
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
}

const multiBarChartColorGroups: ColorGroups = {
  apples: 'var(--color-bg-normal)',
  bananas: 'var(--color-bg-alert)',
  cherries: 'var(--color-bg-warning)',
}

export const multiBarChartData = {
  colorGroups: multiBarChartColorGroups,
  groups: [
    { groupName: 'Q1-2016', values: [{ apples: 30, bananas: 20, cherries: 23 }] },
    { groupName: 'Q2-2016', values: [{ apples: 1600, bananas: 40, cherries: 45 }] },
    { groupName: 'Q3-2016', values: [{ apples: 640, bananas: 960, cherries: 73 }] },
  ],
  unit: 'тыс м3',
}

export const multiBarChartDataWithTwoColumnsOnDate = {
  colorGroups: {
    ...multiBarChartColorGroups,
    melon: 'var(--color-bg-success)',
  },
  groups: [
    {
      groupName: 'Q1-2016',
      values: [
        { apples: 3840, bananas: 1920 },
        { cherries: 230, melon: 500 },
      ],
    },
    {
      groupName: 'Q2-2016',
      values: [
        { apples: 1600, bananas: 150 },
        { cherries: 450, melon: 350 },
      ],
    },
    {
      groupName: 'Q3-2016',
      values: [
        { apples: 640, bananas: 960 },
        { cherries: 730, melon: 120 },
      ],
    },
  ],
}

const tornadoChartColorGroups: ColorGroups = {
  first: 'var(--color-bg-normal)',
  second: 'var(--color-bg-alert)',
}

export const tornadoChartData = {
  colorGroups: tornadoChartColorGroups,
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
  unit: 'млн. руб.',
}
