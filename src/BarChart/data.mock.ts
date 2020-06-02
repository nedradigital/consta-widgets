import { ColorGroups } from '@/common/types'

const colorGroups: ColorGroups = {
  first: 'var(--color-bg-normal)',
  second: 'var(--color-bg-alert)',
  third: 'var(--color-bg-warning)',
}

export const minimalData = {
  colorGroups: {
    first: colorGroups.first,
  },
  groups: [
    {
      groupName: 'март',
      values: [{ colorGroupName: 'first', value: 410 }],
    },
    {
      groupName: 'апрель',
      values: [{ colorGroupName: 'first', value: 670 }],
    },
    {
      groupName: 'май',
      values: [{ colorGroupName: 'first', value: 1200 }],
    },
  ],
  unit: 'тыс. м³',
}

export const withNegativeValueData = {
  colorGroups,
  groups: [
    {
      groupName: 'Q1-2016',
      values: [
        { colorGroupName: 'first', value: 1000 },
        { colorGroupName: 'second', value: -100 },
        { colorGroupName: 'third', value: 50 },
      ],
    },
    {
      groupName: 'Q2-2016',
      values: [
        { colorGroupName: 'first', value: -1000 },
        { colorGroupName: 'second', value: undefined },
        { colorGroupName: 'third', value: 127 },
      ],
    },
    {
      groupName: 'Q3-2016',
      values: [
        { colorGroupName: 'first', value: 500 },
        { colorGroupName: 'second', value: 450 },
        { colorGroupName: 'third', value: undefined },
      ],
    },
    {
      groupName: 'Q4-2016',
      values: [
        { colorGroupName: 'first', value: undefined },
        { colorGroupName: 'second', value: -300 },
        { colorGroupName: 'third', value: -200 },
      ],
    },
    {
      groupName: 'Q5-2016',
      values: [
        { colorGroupName: 'first', value: 10 },
        { colorGroupName: 'second', value: 20 },
        { colorGroupName: 'third', value: 50 },
      ],
    },
  ],
  unit: 'тыс. м³',
}

export const withThreeColumnsData = {
  colorGroups,
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
  unit: 'тыс. м³',
}
