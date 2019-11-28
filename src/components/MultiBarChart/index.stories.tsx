import React from 'react'

import { object } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { DataType } from '@/dashboard/types'
import { getWidgetMockData } from '@/utils/widget-mock-data'
import { blockCenteringDecorator } from '@/utils/Storybook'

import { MultiBarChart } from '.'

export const DataWithTwoColumnsOnDate = {
  categories: ['apples', 'bananas', 'cherries'],
  values: [
    {
      month: 'Q1-2016',
      column1: { apples: 3840, bananas: 1920, cherries: 23 },
      column2: { apples: 1840, bananas: 920, cherries: 230 },
    },
    {
      month: 'Q2-2016',
      column1: { apples: 1600, bananas: 14, cherries: 45 },
      column2: { apples: 600, bananas: 440, cherries: 450 },
    },
    {
      month: 'Q3-2016',
      column1: { apples: 640, bananas: 960, cherries: 73 },
      column2: { apples: 1640, bananas: 1960, cherries: 730 },
    },
  ],
  keyGroup: 'month',
}

storiesOf('components/MultiBarChart', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator({ width: '60vw', height: '80vh' }))
  .add('с одним столбцом', () => {
    return (
      <MultiBarChart
        orientation="vertical"
        valuesTick={4}
        hasRatio={false}
        data={object('data', getWidgetMockData(DataType.MultiBarChart).data)}
        colorGroups={object('colorGroups', getWidgetMockData(DataType.MultiBarChart).colorGroups)}
      />
    )
  })
  .add('с двумя столбцами', () => {
    return (
      <MultiBarChart
        orientation="vertical"
        valuesTick={4}
        hasRatio={false}
        data={object('data', DataWithTwoColumnsOnDate)}
        colorGroups={object('colorGroups', getWidgetMockData(DataType.MultiBarChart).colorGroups)}
      />
    )
  })
