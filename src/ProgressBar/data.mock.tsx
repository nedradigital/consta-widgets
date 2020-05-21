import { createArrayOfIndexes } from '@csssr/gpn-utils/lib/array'
import { Text } from '@gpn-design/uikit'

import { ColorGroups } from '@/common/types'

const colorGroups: ColorGroups = {
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
  <Text tag="div" view="secondary" size="xs" lineHeight="s">
    {text}
  </Text>
)

export const progressBarData = {
  colorGroups,
  data: [
    {
      value: 50,
      valueMin: 0,
      valueMax: 100,
      summary: 50,
      colorGroupName: 'first',
      caption: createCaption('Стратегия Ступени + УИД'),
    },
    {
      value: 75,
      valueMin: 0,
      valueMax: 100,
      ticks,
      summary: 75,
      colorGroupName: 'second',
    },
    {
      value: 30,
      valueMin: 0,
      valueMax: 100,
      ticks,
      summary: '30 тысяч',
      colorGroupName: 'third',
      caption: createCaption('Стратегия Ступени + УИД'),
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
      valueMax: 100,
      summary: 70,
      colorGroupName: 'first',
      caption: createCaption('Стратегия Ступени + УИД'),
    },
    {
      value: null,
      valueMin: 0,
      valueMax: 100,
      summary: 10,
      colorGroupName: 'second',
      ticks,
    },
  ],
}
