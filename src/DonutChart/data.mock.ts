import { times } from 'lodash'

import { ColorGroups } from '@/common/types'

export const zeroValue = { value: 0 }

const sectionWithOnlyZeroData = [...times(3, () => zeroValue)] as const

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
}

export const donutDataItemWithoutData = {
  colorGroup: {
    forth: 'var(--color-bg-alert)',
  },
  data: {
    name: 'Неизвестный бур',
    colorGroupName: 'forth',
    sections: [{ value: null }, { value: null }, { value: null }],
  },
}

export const donutDataItemsWithZeroData = {
  colorGroups,
  data: [
    {
      name: 'Первый нулевой бур',
      colorGroupName: 'first',
      sections: sectionWithOnlyZeroData,
    },
    {
      name: 'Второй нулевой бур',
      colorGroupName: 'second',
      sections: sectionWithOnlyZeroData,
    },
    {
      name: 'Третий нулевой бур',
      colorGroupName: 'third',
      sections: sectionWithOnlyZeroData,
    },
  ],
}

export const donutDataItemsWithZeroAndPositiveData = {
  colorGroups,
  data: [
    {
      ...donutDataItemsWithZeroData.data[0],
      name: 'Первый околонулевой бур',
      sections: [zeroValue, { value: 10 }, zeroValue],
    },
    donutDataItemsWithZeroData.data[1],
    donutDataItemsWithZeroData.data[2],
  ],
}

const donutProgressColorGroups: ColorGroups = {
  plan: 'var(--color-bg-border)',
  fact: 'var(--color-bg-warning)',
}

export const donutProgressData = {
  colorGroups: donutProgressColorGroups,
  data: [
    {
      name: 'План',
      colorGroupName: 'plan',
      sections: [{ value: 3, showValue: 60 }],
    },
    {
      name: 'Факт',
      colorGroupName: 'fact',
      sections: [{ value: 1, showValue: 15 }],
    },
  ],
}
