import React from 'react'

import { object } from '@storybook/addon-knobs'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { DataType } from '@/dashboard'
import { getWidgetMockData } from '@/utils/widget-mock-data'
import { blockCenteringDecorator, createMetadata, createStory } from '@/utils/Storybook'

import { ProgressBar } from './'

const dataWithNullValue = {
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

export const Interactive = createStory(() => (
  <ProgressBar
    size="m"
    data={object('data', getWidgetMockData(DataType.ProgressBar).data)}
    colorGroups={object('colorGroups', getWidgetMockData(DataType.ProgressBar).colorGroups)}
  />
))

export const WithoutData = createStory(
  () => (
    <ProgressBar
      size="m"
      data={object('data', dataWithNullValue.data)}
      colorGroups={object('colorGroups', dataWithNullValue.colorGroups)}
    />
  ),
  {
    name: 'без данных',
  }
)

export default createMetadata({
  title: 'components/ProgressBar',
  decorators: [withSmartKnobs(), blockCenteringDecorator({ width: 300, height: 300 })],
})
