import React from 'react'

import { object } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { DataType } from '@/dashboard/types'
import { getWidgetMockData } from '@/utils/widget-mock-data'
import { blockCenteringDecorator } from '@/utils/Storybook'

import { MultiBarChart } from '.'

export const DataWithTwoColumnsOnDate = {
  categories: ['apples', 'bananas', 'cherries', 'year'],
  values: [
    { month: 'Q1-2016', apples: 3840, bananas: 1920, cherries: -23, year: 1990 },
    { month: 'Q1-2016', apples: 1840, bananas: 920, cherries: 230, year: 2000 },
    { month: 'Q2-2016', apples: 1600, bananas: 1440, cherries: 45, year: 1990 },
    { month: 'Q2-2016', apples: 600, bananas: 440, cherries: 450, year: 2000 },
    { month: 'Q3-2016', apples: 640, bananas: 960, cherries: 73, year: 1990 },
    { month: 'Q3-2016', apples: 1640, bananas: 1960, cherries: 730, year: 2000 },
  ],
  keyGroup: 'month',
  additionalKeyGroup: 'year',
}

storiesOf('components/MultiBarChart', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator({ width: '60vw', height: '80vh' }))
  .add('interactive', () => {
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
  .add('interactive/2 columns', () => {
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
