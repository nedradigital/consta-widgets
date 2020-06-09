import { ColorGroups } from '@/common/types'

const colorGroups: ColorGroups = {
  apples: 'var(--color-bg-normal)',
  bananas: 'var(--color-bg-alert)',
  cherries: 'var(--color-bg-warning)',
}

export const interactiveData = {
  colorGroups,
  groups: [
    { groupName: 'Q1-2016', values: [{ apples: 30, bananas: 20, cherries: 23 }] },
    { groupName: 'Q2-2016', values: [{ apples: 1600, bananas: 40, cherries: 45 }] },
    { groupName: 'Q3-2016', values: [{ apples: 640, bananas: 960, cherries: 73 }] },
  ],
  unit: 'тыс. м³',
}

export const withTwoColumnsData = {
  colorGroups: {
    ...colorGroups,
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
  unit: 'тыс. м³',
}
