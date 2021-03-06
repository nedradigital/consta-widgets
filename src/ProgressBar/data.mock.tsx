import React from 'react'

import { Text } from '@consta/uikit/Text'
import { createArrayOfIndexes } from '@consta/widgets-utils/lib/array'

import { Data } from './'

type Item = Omit<Data, 'caption'> & {
  caption?: string
}

type MockData = {
  data: readonly Item[]
}

const colors = {
  first: 'var(--color-bg-warning)',
  second: 'var(--color-bg-success)',
  third: 'var(--color-bg-normal)',
}

const ticks = createArrayOfIndexes(5).map(index => {
  const value = index * 25

  return {
    value,
    label: index % 2 === 0 ? value : '',
  }
})

const createCaption = (text: string) => (
  <Text as="div" view="secondary" size="xs" lineHeight="s">
    {text}
  </Text>
)

export const convertItemToDataItem = (item: Item): Data => {
  if (item.caption) {
    return {
      ...item,
      caption: createCaption(item.caption),
    }
  }

  return item
}

export const progressBarData: MockData = {
  data: [
    {
      value: 50,
      valueMin: 0,
      valueMax: 100,
      summary: 50,
      color: colors.first,
      caption: 'Стратегия Ступени + УИД',
    },
    {
      value: 75,
      valueMin: 0,
      valueMax: 100,
      ticks,
      summary: 75,
      color: colors.second,
    },
    {
      value: 30,
      valueMin: 0,
      valueMax: 100,
      ticks,
      summary: '30 тысяч',
      color: colors.third,
      caption: 'Стратегия Ступени + УИД',
    },
  ],
}

export const progressBarDataWithNullValue: MockData = {
  data: [
    {
      value: null,
      valueMin: 0,
      valueMax: 100,
      summary: 70,
      color: colors.first,
      caption: 'Стратегия Ступени + УИД',
    },
    {
      value: null,
      valueMin: 0,
      valueMax: 100,
      summary: 10,
      color: colors.second,
      ticks,
    },
  ],
}

export const progressBarDataMin: MockData = {
  data: [
    {
      value: 50,
      valueMin: 0,
      valueMax: 100,
      summary: '50 штук',
      color: colors.first,
    },
  ],
}

export const progressBarDataCaption: MockData = {
  data: [
    {
      value: 30,
      valueMin: 0,
      valueMax: 100,
      summary: '30 марсиан',
      color: colors.third,
      caption: 'Прилетело с Марса',
    },
    {
      value: 50,
      valueMin: 0,
      valueMax: 100,
      summary: '50 венериан',
      color: colors.second,
      caption: 'Прилетело с Венеры',
    },
    {
      value: 70,
      valueMin: 0,
      valueMax: 100,
      summary: '70 человек',
      color: colors.first,
      caption: 'Прилетело с Земли',
    },
  ],
}

export const progressBarDataTicks: MockData = {
  data: [
    {
      value: 70,
      valueMin: 0,
      valueMax: 100,
      summary: 70,
      color: colors.first,
      caption: 'Выросло капустки',
      ticks,
    },
  ],
}
