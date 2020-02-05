import React from 'react'

import { object, select } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { unitPositions } from '@/components/BarChartAxis'
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

const getUnitPosition = () => select('unitPosition', unitPositions, 'none')

const defaultProps = {
  orientation: 'vertical',
  gridTicks: 4,
  valuesTicks: 1,
  hasRatio: false,
  unit: 'тыс м3',
} as const

storiesOf('components/MultiBarChart', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator({ width: '60vw', height: '80vh' }))
  .add('с одним столбцом', () => {
    return (
      <MultiBarChart
        data={object('data', getWidgetMockData(DataType.MultiBarChart).data)}
        colorGroups={object('colorGroups', getWidgetMockData(DataType.MultiBarChart).colorGroups)}
        {...defaultProps}
        unitPosition={getUnitPosition()}
      />
    )
  })
  .add('с двумя столбцами', () => {
    return (
      <MultiBarChart
        data={object('data', DataWithTwoColumnsOnDate)}
        colorGroups={object('colorGroups', getWidgetMockData(DataType.MultiBarChart).colorGroups)}
        {...defaultProps}
        unitPosition={getUnitPosition()}
      />
    )
  })
  .add('с форматированием значений', () => {
    return (
      <MultiBarChart
        data={object('data', {
          categories: ['apples'],
          values: [
            {
              month: 'Q1-2016',
              column1: { apples: 24000000 },
            },
            {
              month: 'Q2-2016',
              column1: { apples: 30000000 },
            },
            {
              month: 'Q3-2016',
              column1: { apples: 36000000 },
            },
          ],
          keyGroup: 'month',
        })}
        colorGroups={object('colorGroups', getWidgetMockData(DataType.MultiBarChart).colorGroups)}
        {...defaultProps}
        unitPosition={getUnitPosition()}
        formatValueForLabel={value => {
          const date = new Date(value)

          return [date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()]
            .map(part => String(part).padStart(2, '0'))
            .join(':')
        }}
      />
    )
  })
  .add('минималистичный вид', () => (
    <MultiBarChart
      data={object('data', getWidgetMockData(DataType.MultiBarChart).data)}
      colorGroups={object('colorGroups', getWidgetMockData(DataType.MultiBarChart).colorGroups)}
      orientation="horizontal"
      gridTicks={0}
      valuesTicks={0}
    />
  ))
