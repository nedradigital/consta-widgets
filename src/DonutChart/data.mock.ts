import { times } from 'lodash'

import { ColorGroups } from '@/common/types'

const sectionWithOnlyZeroData = [...times(3, () => 0)] as const

const colorGroups: ColorGroups = {
  first: 'var(--color-bg-alert)',
  second: 'var(--color-bg-caution)',
  third: 'var(--color-bg-normal)',
}

export const donutData = {
  colorGroups,
  data: [
    {
      name: 'Северный бур',
      colorGroupName: 'first',
      values: [1, 2, 3],
    },
    {
      name: 'Южный бур',
      colorGroupName: 'second',
      values: [4, 5, 6],
    },
    {
      name: 'Западный бур',
      colorGroupName: 'third',
      values: [7, 8, 9],
    },
  ],
}

export const donutDataItemWithoutData = {
  colorGroup: {
    forth: '#9F0CE9',
  },
  data: {
    name: 'Неизвестный бур',
    colorGroupName: 'forth',
    values: [null, null, null],
  },
}

export const donutDataItemsWithZeroData = {
  colorGroups,
  data: [
    {
      name: 'Первый нулевой бур',
      colorGroupName: 'first',
      values: sectionWithOnlyZeroData,
    },
    {
      name: 'Второй нулевой бур',
      colorGroupName: 'second',
      values: sectionWithOnlyZeroData,
    },
    {
      name: 'Третий нулевой бур',
      colorGroupName: 'third',
      values: sectionWithOnlyZeroData,
    },
  ],
}

export const donutDataItemsWithZeroAndPositiveData = {
  colorGroups,
  data: [
    {
      ...donutDataItemsWithZeroData.data[0],
      name: 'Первый околонулевой бур',
      values: [0, 10, 0],
    },
    donutDataItemsWithZeroData.data[1],
    donutDataItemsWithZeroData.data[2],
  ],
}

export const donutProgressData = {
  colorGroups,
  data: [
    {
      name: 'Северный бур',
      colorGroupName: 'first',
      values: [60],
    },
    {
      name: 'Южный бур',
      colorGroupName: 'second',
      values: [20],
    },
    {
      name: 'Западный бур',
      colorGroupName: 'third',
      values: [10],
    },
  ],
}
